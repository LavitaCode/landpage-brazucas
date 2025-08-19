// src/app/pages/benefits/benefits.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BenefitItem {
  title: string;
  description: string;
  icon: string; // classe do Bootstrap Icons (ex.: "bi-patch-check")
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss']
})
export class BenefitsComponent {
  /**
   * Conteúdo base em Português (SSoT).
   * O Website Translator do Google fará a tradução automática no DOM quando o usuário trocar o idioma.
   */
  readonly benefits: ReadonlyArray<BenefitItem> = [
    {
      title: 'Conseguir ser aprovado no Board de primeira',
      description: 'Método validado que aumenta suas chances de aprovação logo na primeira tentativa.',
      icon: 'bi-patch-check'
    },
    {
      title: 'Exercer a odontologia de forma legal nos EUA',
      description: 'Tenha seu diploma reconhecido e pratique sua profissão legalmente nos Estados Unidos.',
      icon: 'bi-shield-check'
    },
    {
      title: 'Voltar a viver com qualidade e recebendo o quanto merece',
      description: 'Receba em dólar um salário compatível com a valorização que sua profissão merece.',
      icon: 'bi-cash-coin'
    },
    {
      title: 'Criar um nome para você no mercado da saúde nos EUA',
      description: 'Construa uma reputação sólida e se destaque no mercado odontológico americano.',
      icon: 'bi-award'
    },
    {
      title: 'Superar as burocracias para ser um profissional de saúde na América',
      description: 'Navegue com segurança por todos os processos burocráticos necessários.',
      icon: 'bi-signpost-2'
    },
    {
      title: 'Ser reconhecido no Brasil e fora dele como um profissional fora da curva',
      description: 'Ganhe reconhecimento internacional e se torne referência em sua área.',
      icon: 'bi-trophy'
    }
  ] as const;

  readonly ctaTitle: string = 'Garanta a sua aprovação e exerça a sua odontologia para receber em dólar nos Estados Unidos!';
  readonly ctaDescription: string = 'Esse é o treinamento preparatório que vai te ajudar a ingressar no mercado norte-americano, com capacidade de exercer a sua profissão com segurança e confiança para criar um negócio de saúde muito rentável.';
  readonly ctaButton: string = 'É isso mesmo que eu quero';

  trackByIdx(index: number): number {
    return index;
  }
}
