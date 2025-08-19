// src/app/pages/hero/hero.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HeroStat {
    value: string;
    label: string;
}

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.html',
    styleUrls: ['./hero.scss']
})
export class HeroComponent {
    readonly badgeText: string = 'Vagas abertas para a formação';
    readonly title: string = 'O plano prático para você conquistar a sua aprovação de forma';
    readonly subtitle: string = 'simples e segura';
    readonly description: string = 'Esse é um passo a passo validado para profissionais da odontologia na América Latina terem um diploma válido nos Estados Unidos.';
    readonly applyLabel: string = 'Quero fazer minha aplicação';
    readonly learnMoreLabel: string = 'Saiba mais';

    readonly stats: ReadonlyArray<HeroStat> = [
        { value: '10+', label: 'Alunos aprovados' },
        { value: '19',  label: 'Anos de experiência' },
        { value: '100%', label: 'Método validado' }
    ] as const;

    readonly heroImageSrc: string = 'assets/img1.png';
    readonly heroImageAlt: string = 'Dentista estudando para o INBDE com materiais do curso';

    trackByIndex(index: number): number {
        return index;
    }
}
