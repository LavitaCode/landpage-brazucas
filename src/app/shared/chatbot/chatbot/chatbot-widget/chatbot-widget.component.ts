// src/app/shared/chatbot/chatbot-widget/chatbot-widget.component.ts
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatEngineService} from "../../engine.service";
import {ChatNodeOption} from "../../chatbot.models";


@Component({
    selector: 'app-chatbot-widget',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chatbot-widget.component.html',
    styleUrls: ['./chatbot-widget.component.scss'],
})
export class ChatbotWidgetComponent {
    private engine = inject(ChatEngineService);

    messages = this.engine.messages;                             // signal (computed)
    options = signal<ChatNodeOption[]>(this.engine.getOptions()); // signal local

    constructor() {
        effect(() => {
            this.engine.currentNode();                 // mantém reatividade
            this.options.set(this.engine.getOptions());
            queueMicrotask(() => this.scrollBottom());
        });
    }

    choose(op: ChatNodeOption): void {
        if (this.engine.handleFinalAction(op)) {
            this.options.set(this.engine.getOptions());
            queueMicrotask(() => this.scrollBottom());
            return;
        }
        this.engine.choose(op);
        this.options.set(this.engine.getOptions());
        queueMicrotask(() => this.scrollBottom());
    }

    reset(): void {
        this.engine.reset();
        this.options.set(this.engine.getOptions());
        queueMicrotask(() => this.scrollBottom());
    }

    private scrollBottom(): void {
        const el = document.querySelector('.cbt-body');
        if (el) el.scrollTop = el.scrollHeight;
    }

    trackByMsgId = (_: number, m: { id: string }) => m.id;
    trackByOptionId = (_: number, o: { id: string }) => o.id;
}
