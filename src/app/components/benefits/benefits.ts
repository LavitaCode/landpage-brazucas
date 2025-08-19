import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Benefit {
  icon: string;     // classe Bootstrap Icons (ex.: 'bi-patch-check-fill')
  title: string;
  description: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss'],
})
export class BenefitsComponent {
  // 12 benefícios (sem reduzir oferta)
  readonly benefits: ReadonlyArray<Benefit> = [
    { icon: 'bi-flag-fill',               title: 'Roteiro claro para o INBDE',              description: 'Passo a passo objetivo para avançar com segurança.' },
    { icon: 'bi-ui-checks-grid',          title: 'Simulados no formato da prova',           description: 'Questões comentadas + métricas para ajustar estudos.' },
    { icon: 'bi-rocket-takeoff-fill',     title: 'Revisões de alta retenção',               description: 'Revisões dirigidas e mapas mentais para fixação.' },
    { icon: 'bi-collection-play-fill',    title: 'Banco curado de questões',                 description: 'Foco no que cai de verdade. Sem ruído.' },
    { icon: 'bi-person-video3',           title: 'Mentoria individual e em grupo',           description: 'Feedback direto de quem já passou pelo processo.' },
    { icon: 'bi-calendar2-check-fill',    title: 'Plano semanal de estudos',                 description: 'Metas claras, checkpoints e correções de rota.' },
    { icon: 'bi-journal-richtext',        title: 'Material didático completo',               description: 'Resumos, exercícios e trilhas por tema.' },
    { icon: 'bi-whatsapp',                title: 'Suporte ágil por WhatsApp',                description: 'Dúvidas respondidas rápido para manter o ritmo.' },
    { icon: 'bi-translate',               title: 'Inglês técnico aplicado',                  description: 'Vocabulário e leitura no contexto do exame.' },
    { icon: 'bi-person-gear',             title: 'Preparação para entrevistas',              description: 'Respostas, postura e diferenciais competitivos.' },
    { icon: 'bi-diagram-3-fill',          title: 'Estratégia de application',                description: 'Orientação prática para candidaturas e docs.' },
    { icon: 'bi-building-check',          title: 'Rota para prática legal nos EUA',          description: 'Caminho para exercer e planejar seu consultório.' },
  ] as const;

  readonly ctaTitle = 'Pronto(a) para transformar seus estudos em aprovação?';
  readonly ctaDescription = 'Comece hoje com garantia de 7 dias.';
  readonly ctaButton = 'Ver planos e vagas';

  trackByIdx = (i: number) => i;
}
