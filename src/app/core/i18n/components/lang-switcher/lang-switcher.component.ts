// src/app/shared/i18n/lang-switcher.component.ts
import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LanguageService} from "../../../../services/language.service";
import {Language} from "../../../../shared/models/language.model";


type LanguageOption = { code: Language; label: string; emoji: string; aria: string };

@Component({
    selector: 'app-lang-switcher',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './lang-switcher.component.html',
    styleUrls: ['./lang-switcher.component.scss']
})
export class LangSwitcherComponent {
    private readonly langService = inject(LanguageService);

    readonly current = signal<Language>('pt');

    readonly languages: ReadonlyArray<LanguageOption> = [
        { code: 'pt', label: 'Português', emoji: '🇧🇷', aria: 'Português' },
        { code: 'en', label: 'English',  emoji: '🇺🇸', aria: 'English' },
        { code: 'es', label: 'Español',  emoji: '🇪🇸', aria: 'Español' }
    ] as const;

    constructor() {
        effect(() => {
            this.current.set(this.langService.currentLang());
        });
    }

    async set(lang: Language): Promise<void> {
        await this.langService.setLanguage(lang);
    }
}
