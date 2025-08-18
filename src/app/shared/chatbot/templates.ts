// src/app/shared/chatbot/templates.ts
import { ChatMsgTemplate } from './chatbot.models';

export const TEMPLATES: ChatMsgTemplate[] = [
    { id: 'welcome', text: 'Olá! Escolha um setor para começarmos:' },
    { id: 'fin-intro', text: 'Financeiro — como posso ajudar?' },
    { id: 'acad-intro', text: 'Acadêmico — selecione um assunto:' },
    { id: 'com-intro', text: 'Comercial — quer informações rápidas ou falar com um consultor?' },
    { id: 'out-intro', text: 'Outros — escolha uma opção:' },
    { id: 'resolution-header', text: '“{{title}}” — vou te guiar agora. Veja os passos:' },
    { id: 'done', text: 'Tudo certo? Posso ajudar com algo mais?' },
    { id: 'invalid', text: 'Opção não configurada. Retornando ao início.' },
];
