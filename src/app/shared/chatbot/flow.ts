// src/app/chatbot/flow.ts


import {ChatNode} from "./chatbot.models";

export const FLOW: ChatNode[] = [
    {
        id: 'start',
        templateId: 'welcome',
        options: [
            { id: 'o-fin', label: 'Financeiro', nextNodeId: 'node-fin' },
            { id: 'o-acad', label: 'Acadêmico', nextNodeId: 'node-acad' },
            { id: 'o-com', label: 'Comercial', nextNodeId: 'node-com' },
            { id: 'o-out', label: 'Outros', nextNodeId: 'node-out' },
        ],
    },

    // ——— FINANCEIRO
    {
        id: 'node-fin',
        sector: 'financeiro',
        templateId: 'fin-intro',
        options: [
            { id: 'fin-2via',  label: '2ª via de boleto',        resolutionId: 'fin-2via-boleto' },
            { id: 'fin-neg',   label: 'Negociação de débitos',   resolutionId: 'fin-negociacao' },
            { id: 'fin-human', label: 'WhatsApp Financeiro',     whatsappSector: 'financeiro' },
            { id: 'fin-home',  label: 'Início',                  nextNodeId: 'start' },
        ],
    },

    // ——— ACADÊMICO
    {
        id: 'node-acad',
        sector: 'academico',
        templateId: 'acad-intro',
        options: [
            { id: 'acad-doc',  label: 'Histórico/Declaração',   resolutionId: 'acad-historico' },
            { id: 'acad-tr',   label: 'Trancamento de matrícula', resolutionId: 'acad-trancamento' },
            { id: 'acad-human',label: 'WhatsApp Acadêmico',     whatsappSector: 'academico' },
            { id: 'acad-home', label: 'Início',                  nextNodeId: 'start' },
        ],
    },

    // ——— COMERCIAL
    {
        id: 'node-com',
        sector: 'comercial',
        templateId: 'com-intro',
        options: [
            { id: 'com-plan',  label: 'Planos e preços',        resolutionId: 'com-planos' },
            { id: 'com-apl',   label: 'Inscrição/Aplicação',    resolutionId: 'com-inscricao' },
            { id: 'com-human', label: 'WhatsApp Comercial',     whatsappSector: 'comercial' },
            { id: 'com-home',  label: 'Início',                  nextNodeId: 'start' },
        ],
    },

    // ——— OUTROS
    {
        id: 'node-out',
        sector: 'outros',
        templateId: 'out-intro',
        options: [
            { id: 'out-faq',   label: 'Dúvida geral (FAQ)',     resolutionId: 'out-faq' },
            { id: 'out-human', label: 'WhatsApp Geral',         whatsappSector: 'outros' },
            { id: 'out-home',  label: 'Início',                  nextNodeId: 'start' },
        ],
    },
];
