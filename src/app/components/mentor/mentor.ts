// src/app/pages/mentor/mentor.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MentorStat {
  icon: string;   // classe Font Awesome (ex.: "fa-graduation-cap")
  label: string;  // texto exibido
}

interface JourneyStep {
  title: string;
  description: string;
}

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentor.html',
  styleUrls: ['./mentor.scss']
})
export class MentorComponent {
  readonly badgeText: string = 'UM POUCO SOBRE...';
  readonly sectionTitle: string = 'Quem será o seu mentor?';

  readonly name: string = 'Rodrigo Fernandes';
  readonly role: string = 'CEO • Mentor • Cirurgião-Dentista';

  readonly description: string =
      'CEO do Brazucas, formado em odontologia há 19 anos e mentor de dentistas. ' +
      'Vou te acompanhar nesta jornada de estudos para validar seu diploma nos Estados Unidos, ' +
      'com foco em estratégia, constância e clareza do que realmente cai no exame.';

  readonly highlight: string =
      'Esse é apenas o passo que falta para mudar sua vida profissional — o método já ajudou ' +
      'diversos brasileiros a conquistarem o PASS no board. Agora é a sua vez.';

  readonly stats: ReadonlyArray<MentorStat> = [
    { icon: 'fa-graduation-cap', label: '19 anos de experiência' },
    { icon: 'fa-users',         label: '10+ alunos aprovados' },
    { icon: 'fa-briefcase',     label: 'CEO Brazucas no Board' }
  ] as const;

  readonly journeyTitle: string = 'Minha Jornada';
  readonly journeySteps: ReadonlyArray<JourneyStep> = [
    {
      title: 'Chegada aos EUA',
      description:
          'Como muitos, comecei em trabalhos fora da odontologia para me manter. ' +
          'Aprendi, na prática, como planejar a transição sem abrir mão do sonho.'
    },
    {
      title: 'Descoberta do Processo',
      description:
          'Tracei um roteiro direto ao ponto para o <span class="notranslate">INBDE</span>: conteúdos essenciais, ' +
          'simulados e rotinas reais que cabem na agenda de quem trabalha.'
    },
    {
      title: 'Aprovação e Mentoria',
      description:
          'Depois de aprovado, estruturei a preparação que hoje acelera a aprovação de outros brasileiros — ' +
          'com suporte humano e estratégia de prova.'
    }
  ] as const;

  readonly photoSrc: string = 'assets/img/mentor.png'; // substitua pela foto real (ex.: assets/img/rodrigo.png)
  readonly photoAlt: string = 'Foto do mentor Rodrigo Fernandes';

  trackByIndex(index: number): number {
    return index;
  }
}
