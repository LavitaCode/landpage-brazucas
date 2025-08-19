// src/app/pages/pricing/pricing.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plan {
  id: 'individual' | 'standard' | 'sos';
  order: number;
  name: string;
  description: string;
  price: string;
  period: string;
  features: ReadonlyArray<string>;
  badge?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.scss']
})
export class PricingComponent {
  readonly plans: ReadonlyArray<Plan> = [
    {
      id: 'individual',
      order: 1,
      name: 'Individual',
      description:
          'Nesse módulo você terá acesso ao curso por 5 meses, tendo aulas online e ao vivo com acesso a simulados e exercícios.',
      price: '$950',
      period: 'valor por cada mês',
      features: [
        '2 encontros na semana de 1h',
        '1 encontro de 3h no grupo geral por semana (com resolução de exercícios)',
        '3 simulados da prova',
        '1 aulão final na véspera da prova (que acontece dia antes) de 3h',
        'Suporte ilimitado via WhatsApp',
        'Material didático completo',
        'Acesso à plataforma por 5 meses'
      ],
      badge: 'MAIS POPULAR',
      featured: true
    },
    {
      id: 'standard',
      order: 2,
      name: 'Standard',
      description:
          'Em grupo: acompanhamento durante 5 meses, com aulas online e ao vivo, simulados e exercícios. Ideal para quem aprende junto e quer reduzir o investimento mensal.',
      price: '$500',
      period: 'valor individual por mês',
      features: [
        '2 encontros na semana de 1h',
        '1 encontro de 3h no grupo geral por semana (com resolução de exercícios)',
        '1 simulado por mês',
        '1 aulão final na véspera da prova (que acontece dia antes) de 3h',
        'Aulas de Monitoria'
      ]
    },
    {
      id: 'sos',
      order: 3,
      name: 'SOS',
      description:
          'Acompanhamento exclusivo e intensivo por 70 dias, com foco total na aprovação. Aulas online e ao vivo com acesso a simulados e exercícios.',
      price: '$3,000',
      period: 'valor único',
      features: [
        '5 encontros por semana de 1h',
        'Aulas de Monitoria',
        '1 encontro por semana de 3h no grupo com todos os alunos (com resolução de exercícios)',
        '1 simulado por mês',
        '1 aulão final na véspera da prova (que acontece 1/3 dia antes) de 3h'
      ]
    }
  ] as const;

  selectedIndex = 0;

  selectPlan(index: number): void {
    if (index < 0 || index >= this.plans.length) return;
    this.selectedIndex = index;
  }

  onTabsKeydown(event: KeyboardEvent): void {
    const { key } = event;
    const last = this.plans.length - 1;

    if (key === 'ArrowUp' || key === 'ArrowLeft') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex === 0 ? last : this.selectedIndex - 1;
    }
    if (key === 'ArrowDown' || key === 'ArrowRight') {
      event.preventDefault();
      this.selectedIndex = this.selectedIndex === last ? 0 : this.selectedIndex + 1;
    }
    if (key === 'Home') {
      event.preventDefault();
      this.selectedIndex = 0;
    }
    if (key === 'End') {
      event.preventDefault();
      this.selectedIndex = last;
    }
  }

  currentPlan(): Plan {
    return this.plans[this.selectedIndex];
  }

  priceSymbol(val: string | number): string {
    const s = String(val ?? '').trim();
    const m = s.match(/^[^\d]+/);
    return (m?.[0] ?? '$').trim();
  }

  priceAmount(val: string | number): string {
    const s = String(val ?? '').trim();
    return s.replace(/^[^\d]+/, '').trim();
  }

  trackByIndex(index: number): number { return index; }
  btnClass(featured?: boolean): string { return featured ? 'btn-primary' : 'btn-outline'; }
  isActive(i: number): boolean { return i === this.selectedIndex; }
  tabId(i: number): string { return `plan-tab-${i}`; }
  panelId(i: number): string { return `plan-panel-${i}`; }
}
