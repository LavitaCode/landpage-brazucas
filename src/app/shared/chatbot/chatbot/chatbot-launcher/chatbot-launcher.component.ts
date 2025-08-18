// src/app/shared/chatbot/chatbot-launcher.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-chatbot-launcher',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './chatbot-launcher.component.html',
    styleUrls: ['./chatbot-launcher.component.scss'],
})
export class ChatbotLauncherComponent {
    @Input() imgSrc = 'assets/dente-callcenter.png';
    @Input() imgAlt = 'Assistente virtual';
    @Input() bubbleText = 'Fale conosco';
    @Input() bottom = 24;
    @Input() right = 24;

    /** estado do chat controlado pelo pai; quando fechado (!isOpen) mostramos o balão */
    @Input() isOpen = false;

    /** evento para abrir o chat */
    @Output('launch') launch = new EventEmitter<void>();

    onOpen(): void {
        console.log('[launcher] click -> emit(launch)');
        this.launch.emit();
    }
}
