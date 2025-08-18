// src/app/shared/chatbot/chatbot.models.ts
export type Sector = 'financeiro' | 'academico' | 'comercial' | 'outros';

export type ActionType =
    | 'openLink'
    | 'whatsapp'
    | 'copy'
    | 'download'
    | 'end'
    | 'back'
    | 'go';

export interface Action {
    type: ActionType;
    label: string;
    url?: string;
    phone?: string;
    text?: string;
    nextNodeId?: string;
    meta?: Record<string, unknown>;
}

export interface ResolutionStep {
    order: number;
    text: string;
    action?: Action;
}

export interface Resolution {
    id: string;
    sector: Sector;
    title: string;
    summary: string;
    steps: ResolutionStep[];
    finalActions?: Action[];
}

export interface ChatMsgTemplate {
    id: string;
    text: string; // suporta {{placeholders}}
}

export interface ChatNodeOption {
    id: string;
    label: string;
    resolutionId?: string;
    nextNodeId?: string;
    whatsappSector?: Sector;
}

export interface ChatNode {
    id: string;
    sector?: Sector;
    templateId: string;
    templateParams?: Record<string, string | number>;
    options: ChatNodeOption[];
}

export interface ChatMessage {
    id: string;
    author: 'bot' | 'user';
    text: string;
    at: number;
}
