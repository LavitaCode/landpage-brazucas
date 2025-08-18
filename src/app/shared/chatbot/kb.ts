// src/app/shared/chatbot/kb.ts
import { Resolution, Sector } from './chatbot.models';

/**
 * Links base de WhatsApp (sem ?text=).
 * Assim conseguimos personalizar a mensagem por fluxo.
 */
export const WHATSAPP: Record<Sector, string> = {
    financeiro: 'https://wa.me/5585XXXXXXXX',
    academico:  'https://wa.me/5585YYYYYYYY',
    comercial:  'https://wa.me/5585ZZZZZZZZ',
    outros:     'https://wa.me/5585WWWWWWWW',
};

/**
 * Mensagens padrão (URL-encoded) para fluxos que exigem notificação no WhatsApp.
 * Use placeholders <> para o aluno completar antes de enviar.
 */
const MSG_ACAD_SOLIC_DOC =
    'Ol%C3%A1%20Acad%C3%AAmico%2C%20acabei%20de%20realizar%20uma%20solicita%C3%A7%C3%A3o%20de%20documento%20no%20portal.%0A' +
    '-%20Nome%3A%20%3Cseu%20nome%3E%0A' +
    '-%20CPF%3A%20%3Cxxx.xxx.xxx-xx%3E%0A' +
    '-%20Matr%C3%ADcula%3A%20%3Cn%C3%BAmero%3E%0A' +
    '-%20Documento%3A%20Hist%C3%B3rico%20ou%20Declara%C3%A7%C3%A3o%0A' +
    '-%20N%C2%BA%20da%20solicita%C3%A7%C3%A3o%3A%20%3Cprotocolo%3E%0A%0A' +
    'Poderiam%20confirmar%20o%20prazo%20e%20o%20andamento%2C%20por%20favor%3F';

export const RESOLUTIONS: Resolution[] = [
    // ——— FINANCEIRO
    {
        id: 'fin-2via-boleto',
        sector: 'financeiro',
        title: 'Emitir 2ª via de boleto',
        summary: 'Emissão pelo Portal do Aluno com autenticação.',
        steps: [
            { order: 1, text: 'Acesse o Portal do Aluno.', action: { type: 'openLink', label: 'Abrir Portal', url: 'https://portal.exemplo.edu/financeiro' } },
            { order: 2, text: 'Menu “Financeiro” → “Boletos e Faturas”.' },
            { order: 3, text: 'Selecione a mensalidade desejada e clique em “Gerar 2ª via”.' },
            { order: 4, text: 'Confirme a data de vencimento e salve/baixe o PDF.' },
        ],
        finalActions: [
            { type: 'download', label: 'Baixar último boleto', url: 'https://portal.exemplo.edu/financeiro/boletos/last.pdf' },
            { type: 'whatsapp', label: 'WhatsApp Financeiro', url: `${WHATSAPP.financeiro}?text=Ol%C3%A1%20Finan%C3%A7as%2C%20preciso%20de%20ajuda%20com%20a%202%C2%AA%20via%20do%20boleto.` },
            { type: 'back', label: 'Voltar ao Financeiro', nextNodeId: 'node-fin' },
            { type: 'go', label: 'Início', nextNodeId: 'start' },
        ],
    },
    {
        id: 'fin-negociacao',
        sector: 'financeiro',
        title: 'Negociação de débitos',
        summary: 'Encaminhamento direto ao time financeiro.',
        steps: [
            { order: 1, text: 'Negociação é feita pelo time humano para simular descontos e prazos.' },
            { order: 2, text: 'Tenha em mãos: CPF, curso, parcelas em atraso e proposta de pagamento.' },
        ],
        finalActions: [
            { type: 'whatsapp', label: 'Abrir WhatsApp Financeiro', url: `${WHATSAPP.financeiro}?text=Ol%C3%A1%20Finan%C3%A7as%2C%20gostaria%20de%20negociar%20meus%20d%C3%A9bitos.` },
            { type: 'back', label: 'Voltar ao Financeiro', nextNodeId: 'node-fin' },
        ],
    },

    // ——— ACADÊMICO
    {
        id: 'acad-historico',
        sector: 'academico',
        title: 'Solicitar Histórico/Declaração',
        summary: 'Pedido online com geração em PDF + notificação ao setor.',
        steps: [
            { order: 1, text: 'Acesse o Sistema Acadêmico.', action: { type: 'openLink', label: 'Abrir Sistema', url: 'https://academico.exemplo.edu' } },
            { order: 2, text: 'Menu “Documentos” → “Solicitar” → escolha “Histórico” ou “Declaração”.' },
            { order: 3, text: 'Informe a finalidade, confirme dados e finalize a solicitação.' },
            { order: 4, text: 'Acompanhe em “Minhas Solicitações”. Quando pronto, baixe o PDF.' },
            {
                order: 5,
                text: 'Envie a confirmação ao setor acadêmico via WhatsApp (inclui mensagem padrão com seus dados e nº de protocolo).',
                action: { type: 'whatsapp', label: 'Notificar Acadêmico no WhatsApp', url: `${WHATSAPP.academico}?text=${MSG_ACAD_SOLIC_DOC}` },
            },
        ],
        finalActions: [
            { type: 'openLink', label: 'Minhas Solicitações', url: 'https://academico.exemplo.edu/solicitacoes' },
            { type: 'back', label: 'Voltar ao Acadêmico', nextNodeId: 'node-acad' },
            { type: 'go', label: 'Início', nextNodeId: 'start' },
        ],
    },
    {
        id: 'acad-trancamento',
        sector: 'academico',
        title: 'Trancamento de matrícula',
        summary: 'Fluxo orientado e confirmação pelo setor.',
        steps: [
            { order: 1, text: 'Leia as regras de trancamento.', action: { type: 'openLink', label: 'Regras de Trancamento', url: 'https://academico.exemplo.edu/regras-trancamento' } },
            { order: 2, text: 'Solicite o trancamento no sistema.', action: { type: 'openLink', label: 'Abrir Solicitação', url: 'https://academico.exemplo.edu/trancamento' } },
            { order: 3, text: 'Anexe documentos (se necessário) e confirme.' },
            { order: 4, text: 'Aguarde a confirmação por e-mail. Consulte o status no portal.' },
            {
                order: 5,
                text: 'Avise o setor acadêmico no WhatsApp para agilizar a conferência.',
                action: { type: 'whatsapp', label: 'Avisar Acadêmico no WhatsApp', url: `${WHATSAPP.academico}?text=Ol%C3%A1%20Acad%C3%AAmico%2C%20solicitei%20TRANCAMENTO%20agora%20no%20portal.%20Poderiam%20confirmar%20o%20andamento%3F` },
            },
        ],
        finalActions: [
            { type: 'back', label: 'Voltar ao Acadêmico', nextNodeId: 'node-acad' },
        ],
    },

    // ——— COMERCIAL
    {
        id: 'com-planos',
        sector: 'comercial',
        title: 'Planos e preços',
        summary: 'Tabela de planos atualizada e contato com consultor.',
        steps: [
            { order: 1, text: 'Veja a tabela de planos.', action: { type: 'openLink', label: 'Ver Planos', url: 'https://site.exemplo.edu/planos' } },
            { order: 2, text: 'Dúvidas sobre bolsas/descontos? Fale com um consultor.' },
        ],
        finalActions: [
            { type: 'whatsapp', label: 'WhatsApp Comercial', url: `${WHATSAPP.comercial}?text=Ol%C3%A1%20Comercial%2C%20quero%20saber%20mais%20sobre%20planos%20e%20bolsas.` },
            { type: 'back', label: 'Voltar ao Comercial', nextNodeId: 'node-com' },
            { type: 'go', label: 'Início', nextNodeId: 'start' },
        ],
    },
    {
        id: 'com-inscricao',
        sector: 'comercial',
        title: 'Inscrição/Aplicação',
        summary: 'Formulário online com validação de dados.',
        steps: [
            { order: 1, text: 'Abra o formulário de aplicação.', action: { type: 'openLink', label: 'Abrir Aplicação', url: 'https://site.exemplo.edu/aplicacao' } },
            { order: 2, text: 'Preencha seus dados e anexe documentos.' },
            { order: 3, text: 'Finalize e acompanhe por e-mail.' },
            {
                order: 4,
                text: 'Se desejar, avise o Comercial no WhatsApp para acelerar o contato.',
                action: { type: 'whatsapp', label: 'Avisar Comercial', url: `${WHATSAPP.comercial}?text=Ol%C3%A1%20Comercial%2C%20acabei%20de%20enviar%20minha%20aplica%C3%A7%C3%A3o.%20Poderiam%20confirmar%3F` },
            },
        ],
        finalActions: [
            { type: 'whatsapp', label: 'Falar com o Comercial', url: `${WHATSAPP.comercial}?text=Ol%C3%A1%20Comercial%2C%20preciso%20de%20ajuda%20na%20aplica%C3%A7%C3%A3o.` },
            { type: 'back', label: 'Voltar ao Comercial', nextNodeId: 'node-com' },
        ],
    },

    // ——— OUTROS
    {
        id: 'out-faq',
        sector: 'outros',
        title: 'Dúvida geral (FAQ)',
        summary: 'Base de conhecimento com respostas rápidas.',
        steps: [
            { order: 1, text: 'Consulte a FAQ oficial.', action: { type: 'openLink', label: 'Abrir FAQ', url: 'https://site.exemplo.edu/faq' } },
            { order: 2, text: 'Não encontrou? Acione o suporte via WhatsApp.' },
        ],
        finalActions: [
            { type: 'whatsapp', label: 'WhatsApp Geral', url: `${WHATSAPP.outros}?text=Ol%C3%A1%2C%20tenho%20uma%20d%C3%BAvida%20geral%20sobre%20o%20servi%C3%A7o.` },
            { type: 'go', label: 'Início', nextNodeId: 'start' },
        ],
    },
];
