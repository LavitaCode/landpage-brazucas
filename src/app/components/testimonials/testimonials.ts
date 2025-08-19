// src/app/pages/testimonials/testimonials.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  name: string;
  title: string;
  location: string;
  text: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrls: ['./testimonials.scss']
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  readonly badgeText: string = 'VALIDADO POR DENTISTAS APROVADOS';
  readonly sectionTitle: string = 'Confira o que dizem sobre o curso:';

  readonly testimonials: ReadonlyArray<Testimonial> = [
    {
      name: 'Roberta Cardoso',
      title: 'Cirurgiã Dentista',
      location: 'Miami, FL',
      text:
          'O método Brazucas foi fundamental para minha aprovação. O suporte do Rodrigo e a metodologia estruturada me deram a confiança necessária para passar no board de primeira. Hoje exerço minha profissão legalmente nos EUA!'
    },
    {
      name: 'Patricia Medrado',
      title: 'Dentista',
      location: 'Orlando, FL',
      text:
          'Depois de anos tentando entender o processo sozinha, encontrei no Brazucas a direção que precisava. As aulas são práticas e focadas no que realmente importa para a prova. Recomendo para todos os colegas!'
    },
    {
      name: 'Samantha Matos',
      title: 'Cirurgiã Dentista',
      location: 'Houston, TX',
      text:
          'O diferencial do curso é o suporte ilimitado. Sempre que tinha dúvidas, recebia respostas rápidas e detalhadas. Isso fez toda a diferença na minha preparação e aprovação no INBDE.'
    },
    {
      name: 'Aurora Rita',
      title: 'Dentista',
      location: 'Los Angeles, CA',
      text:
          'Método validado e eficiente! O Rodrigo conhece profundamente o processo e sabe exatamente o que é necessário para ser aprovado. Hoje tenho meu consultório próprio nos EUA graças ao Brazucas.'
    },
    {
      name: 'Déia Yamamoto',
      title: 'Dentista',
      location: 'New York, NY',
      text:
          'A metodologia é clara e objetiva. Não perde tempo com informações desnecessárias, foca no que realmente cai na prova. Os simulados foram essenciais para minha preparação e confiança no dia da prova.'
    }
  ] as const;

  currentSlide = 0;
  private autoSlideHandle: ReturnType<typeof setInterval> | null = null;
  private readonly SLIDE_INTERVAL_MS = 5000;

  ngOnInit(): void {
    this.startAutoSlide();
    // Pausa quando a aba está oculta (economia de CPU e UX melhor)
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  // Navegação
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    this.resetAutoSlide();
  }

  previousSlide(): void {
    this.currentSlide =
        (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetAutoSlide();
  }

  goToSlide(index: number): void {
    if (index < 0 || index >= this.testimonials.length) return;
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  // Acessibilidade via teclado
  onKeydownCarousel(event: KeyboardEvent): void {
    const { key } = event;
    if (key === 'ArrowRight') {
      event.preventDefault();
      this.nextSlide();
    }
    if (key === 'ArrowLeft') {
      event.preventDefault();
      this.previousSlide();
    }
    if (key === 'Home') {
      event.preventDefault();
      this.goToSlide(0);
    }
    if (key === 'End') {
      event.preventDefault();
      this.goToSlide(this.testimonials.length - 1);
    }
  }

  // Auto-slide
  startAutoSlide(): void {
    if (this.autoSlideHandle) return;
    this.autoSlideHandle = setInterval(() => this.nextSlide(), this.SLIDE_INTERVAL_MS);
  }

  stopAutoSlide(): void {
    if (!this.autoSlideHandle) return;
    clearInterval(this.autoSlideHandle);
    this.autoSlideHandle = null;
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  private onVisibilityChange = (): void => {
    if (document.hidden) this.stopAutoSlide();
    else this.startAutoSlide();
  };

  // Helpers de template
  trackByIndex(index: number): number { return index; }
  get transform(): string { return `translateX(-${this.currentSlide * 100}%)`; }
}
