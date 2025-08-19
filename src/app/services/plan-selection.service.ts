import { Injectable, computed, signal } from '@angular/core';

export type PlanId = 'individual' | 'standard' | 'sos';

export interface SelectedPlan {
    id: PlanId;
    name: string;
    price: string;
    period: string;
    pickedAt: number;
}

@Injectable({ providedIn: 'root' })
export class PlanSelectionService {
    private readonly STORAGE_KEY = 'bnboard:selected-plan:v1';

    private readonly _plan = signal<SelectedPlan | null>(this.read());
    /** pedido para abrir o chat com o contexto do plano */
    private readonly _openChatReq = signal<boolean>(false);

    /** leitura reativa do plano */
    readonly plan = computed(() => this._plan());
    /** leitura reativa do “quero abrir o chat” */
    readonly openChatRequested = computed(() => this._openChatReq());

    select(plan: Omit<SelectedPlan, 'pickedAt'>): void {
        const value: SelectedPlan = { ...plan, pickedAt: Date.now() };
        this._plan.set(value);
        this.write(value);
    }

    /** utilitário: seleciona e dispara abertura do chat */
    selectAndRequestChat(plan: Omit<SelectedPlan, 'pickedAt'>): void {
        this.select(plan);
        this._openChatReq.set(true);
    }

    /** o Home consome esse “pedido” e reseta o gatilho */
    consumeChatRequest(): void {
        this._openChatReq.set(false);
    }

    clear(): void {
        this._plan.set(null);
        try { localStorage.removeItem(this.STORAGE_KEY); } catch {}
    }

    /** mensagem pronta pro WhatsApp com os dados do plano */
    whatsappText(): string {
        const p = this._plan();
        const msg = p
            ? `Olá! Quero me inscrever no plano ${p.name} (${p.price} ${p.period}). Podem me orientar?`
            : 'Olá! Preciso de ajuda com os planos.';
        return encodeURIComponent(msg);
    }

    // ----------------- storage helpers -----------------
    private read(): SelectedPlan | null {
        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            return raw ? (JSON.parse(raw) as SelectedPlan) : null;
        } catch { return null; }
    }
    private write(v: SelectedPlan): void {
        try { localStorage.setItem(this.STORAGE_KEY, JSON.stringify(v)); } catch {}
    }
}
