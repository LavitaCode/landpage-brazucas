// src/app/pages/hero/hero.ts (ou src/app/components/hero/hero.ts)
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.html',
    styleUrls: ['./hero.scss'] // <- corrige styleUrl -> styleUrls
})
export class HeroComponent implements OnInit {
    content!: LanguageContent;

    constructor(private languageService: LanguageService) {}

    ngOnInit(): void {
        this.languageService.currentLanguage$.subscribe(() => {
            this.content = this.languageService.getContent();
        });
    }
}
