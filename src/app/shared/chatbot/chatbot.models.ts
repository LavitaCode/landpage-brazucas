// src/app/chatbot/models.ts
export type Sector = 'financeiro' | 'academico' | 'comercial' | 'outros';

export type ActionType = 'openLink' | 'whatsapp' | 'copy' | 'download' | 'end' | 'back' | 'go';

export interface Action {
    type: ActionType;
    label: string;
    // destino da ação
    url?: string;
    phone?: string;
    text?: string;
    // navegação no fluxo
    nextNodeId?: string;
    // metadados adicionais
    meta?: Record<string, unknown>;
}

export interface ResolutionStep {
    order: number;
    text: string;        // passo descritivo
    action?: Action;     // ação concreta opcional por passo
}

export interface Resolution {   // “RSP” = Resposta Padronizada
    id: string;
    sector: Sector;
    title: string;
    summary: string;
    steps: ResolutionStep[];
    // ações finais (por ex. abrir WhatsApp, voltar ao início)
    finalActions?: Action[];
}

export interface ChatMsgTemplate {
    id: string;           // id lógico do template
    text: string;         // suporta placeholders: {{name}}
}

export interface ChatNodeOption {
    id: string;
    label: string;
    // pode apontar para um Resolution (resolver) ou para outro nó (navegar)
    resolutionId?: string;
    nextNodeId?: string;
    // atalho para atendimento humano
    whatsappSector?: Sector;
}

export interface ChatNode {
    id: string;
    sector?: Sector;
    templateId: string;       // mensagem do bot usa template
    templateParams?: Record<string, string | number>;
    options: ChatNodeOption[];
}

export interface ChatMessage {
    id: string;
    author: 'bot' | 'user';
    text: string;
    at: number;
}
