import { Injectable, computed, signal, inject } from '@angular/core';
import {
    Action,
    ChatMessage,
    ChatNode,
    ChatNodeOption,
    ChatMsgTemplate,
    Resolution,
    Sector,
} from './chatbot.models';
import { FLOW } from './flow';
import { RESOLUTIONS, WHATSAPP } from './kb';
import { TEMPLATES } from './templates';
import {PlanSelectionService} from "../../services/plan-selection.service";


@Injectable({ providedIn: 'root' })
export class ChatEngineService {
    private readonly planSvc = inject(PlanSelectionService);

    private readonly nodes = new Map<string, ChatNode>(
        (FLOW as ChatNode[]).map((n: ChatNode) => [n.id, n] as const),
    );

    private readonly templates = new Map<string, ChatMsgTemplate>(
        (TEMPLATES as ChatMsgTemplate[]).map((t: ChatMsgTemplate) => [t.id, t] as const),
    );

    private readonly resolutions = new Map<string, Resolution>(
        (RESOLUTIONS as Resolution[]).map((r: Resolution) => [r.id, r] as const),
    );

    private currentNodeId = signal<string>('start');
    private history = signal<ChatMessage[]>([]);

    readonly messages = computed<ChatMessage[]>(() => this.history());
    readonly currentNode = computed<ChatNode>(() => {
        const node = this.nodes.get(this.currentNodeId());
        if (!node) throw new Error(`ChatNode não encontrado: ${this.currentNodeId()}`);
        return node;
    });

    constructor() {
        this.pushBot(this.renderTemplate('welcome'));
    }

    // ==========================================================
    // API pública: inicia fluxo de checkout com o plano escolhido
    // ==========================================================
    beginCheckoutFromSelectedPlan(): void {
        const plan = this.planSvc.plan() /* computed */;

        const params = {
            plan:   plan?.name ?? '—',
            price:  plan?.price ?? '—',
            period: plan?.period ?? '—',
        };

        const node: ChatNode = {
            id: 'node-checkout',
            templateId: 'checkout-intro',
            templateParams: params,
            options: [
                {
                    id: 'co-pay',
                    label: 'Pagar agora (Stripe)',
                    action: {
                        type: 'openLink',
                        label: 'Ir para Checkout',
                        // Troque por sua rota/Payment Link quando o Stripe estiver pronto:
                        url: `/inscricao?plan=${encodeURIComponent((plan?.id as string) ?? '')}`,
                    },
                },
                {
                    id: 'co-whats',
                    label: 'Falar com atendimento (WhatsApp)',
                    action: {
                        type: 'whatsapp',
                        label: 'WhatsApp Comercial',
                        url: `${WHATSAPP.comercial}?text=${this.planSvc.whatsappText()}`,
                    },
                },
                { id: 'co-more', label: 'Ver outros planos', nextNodeId: 'node-com' },
                { id: 'co-home', label: 'Início',           nextNodeId: 'start' },
            ],
        };

        this.nodes.set(node.id, node);
        this.goto(node.id, true);
    }

    // ========================== fluxo padrão ==========================
    private renderTemplate(id: string, params?: Record<string, string | number>): string {
        const tpl = this.templates.get(id);
        if (!tpl) return '[template ausente]';
        let text = tpl.text;
        if (params) {
            for (const [k, v] of Object.entries(params)) text = text.replaceAll(`{{${k}}}`, String(v));
        }
        return text;
    }

    getOptions(): ChatNodeOption[] {
        return this.currentNode().options;
    }

    choose(option: ChatNodeOption): void {
        this.pushUser(option.label);

        // 0) ação direta (ex.: Stripe / WhatsApp)
        if (option.action) {
            this.exec(option.action, true);
            return;
        }

        // 1) atendimento humano por setor
        if (option.whatsappSector) {
            const url = this.whatsappFor(option.whatsappSector);
            if (url) window.open(url, '_blank', 'noopener');
            this.pushBot('Abri o WhatsApp do setor. Se precisar, posso te guiar em outro assunto.');
            this.goto('start', true);
            return;
        }

        // 2) resolução (RSP)
        if (option.resolutionId) {
            const rsp = this.resolutions.get(option.resolutionId);
            if (!rsp) {
                this.pushBot(this.renderTemplate('invalid'));
                this.goto('start', true);
                return;
            }

            this.pushBot(this.renderTemplate('resolution-header', { title: rsp.title }));

            for (const step of [...rsp.steps].sort((a: { order: number }, b: { order: number }) => a.order - b.order)) {
                const prefix = `Passo ${step.order}: `;
                this.pushBot(prefix + step.text);
                if (step.action) this.exec(step.action, false);
            }

            if (rsp.finalActions?.length) {
                const hints = rsp.finalActions.map((a) => `• ${a.label}`).join('\n');
                this.pushBot('Ações finais disponíveis:\n' + hints);

                const virtual: ChatNode = {
                    id: 'done',
                    templateId: 'done',
                    options: rsp.finalActions.map((a, i): ChatNodeOption => ({
                        id: `final-${i}`,
                        label: a.label,
                        action: a, // agora usamos ação direta
                    })),
                };

                this.nodes.set('done', virtual);
                this.goto('done', true);
                return;
            }

            this.goto(this.nodeForSector(rsp.sector), true);
            return;
        }

        // 3) navegação
        if (option.nextNodeId) {
            this.goto(option.nextNodeId, true);
            return;
        }

        this.pushBot(this.renderTemplate('invalid'));
        this.goto('start', true);
    }

    // (mantido para compatibilidade com flows legados que usem "::final::")
    handleFinalAction(option: ChatNodeOption): boolean {
        if (!option.resolutionId?.includes('::final::')) return false;
        const [rspId, , idxStr] = option.resolutionId.split('::');
        const rsp = this.resolutions.get(rspId);
        if (!rsp) return false;

        const action = rsp.finalActions?.[Number(idxStr)];
        if (!action) return false;

        this.pushUser(option.label);
        this.exec(action, true);
        return true;
    }

    private exec(action: Action, postClick: boolean): void {
        switch (action.type) {
            case 'openLink':
            case 'download':
                if (action.url) window.open(action.url, '_blank', 'noopener');
                if (postClick) this.pushBot(`Ok, abri: ${action.label}.`);
                break;

            case 'whatsapp':
                if (action.url) window.open(action.url, '_blank', 'noopener');
                if (postClick) this.pushBot('WhatsApp aberto. Posso ajudar com algo mais?');
                this.goto('start', true);
                break;

            case 'copy':
                if (action.text) void navigator.clipboard?.writeText(action.text);
                if (postClick) this.pushBot('Conteúdo copiado para a área de transferência.');
                break;

            case 'back':
            case 'go':
                if (action.nextNodeId) this.goto(action.nextNodeId, true);
                break;

            case 'end':
                this.pushBot('Encerrando atendimento. Obrigado!');
                this.reset();
                break;
        }
    }

    private nodeForSector(s: Sector): string {
        switch (s) {
            case 'financeiro': return 'node-fin';
            case 'academico':  return 'node-acad';
            case 'comercial':  return 'node-com';
            default:           return 'node-out';
        }
    }

    private whatsappFor(s: Sector): string {
        return WHATSAPP[s];
    }

    private goto(nodeId: string, echo: boolean): void {
        const node = this.nodes.get(nodeId);
        if (!node) {
            this.pushBot(this.renderTemplate('invalid'));
            this.currentNodeId.set('start');
            return;
        }
        this.currentNodeId.set(node.id);
        if (echo) this.pushBot(this.renderTemplate(node.templateId, node.templateParams));
    }

    reset(): void {
        this.currentNodeId.set('start');
        this.history.set([]);
        this.pushBot(this.renderTemplate('welcome'));
    }

    private pushUser(text: string): void {
        this.history.update((h) => [
            ...h,
            { id: crypto.randomUUID(), author: 'user', text, at: Date.now() },
        ]);
    }

    private pushBot(text: string): void {
        this.history.update((h) => [
            ...h,
            { id: crypto.randomUUID(), author: 'bot', text, at: Date.now() },
        ]);
    }
}
