import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

interface FooterLinksGroup {
  title: string;
  items: LinkItem[];
}

interface FooterContactItem {
  icon: string;         // classe Font Awesome
  text: string;
  ariaLabel: string;
  href?: string;        // link clickable (tel:, mailto:, maps, whatsapp etc.)
  notranslate?: boolean;
}

interface SocialLink {
  icon: string;         // classe Font Awesome
  href: string;
  ariaLabel: string;
}

interface FooterSecurityBadge {
  icon: string;         // classe Font Awesome
  text: string;
}

interface FooterContent {
  brand: {
    name: string;
    description: string;
    logoSrc: string;
  };
  nav: {
    course: FooterLinksGroup;
    support: FooterLinksGroup;
  };
  contact: {
    title: string;
    items: FooterContactItem[];
  };
  social: SocialLink[];
  security: FooterSecurityBadge[];
  legal: {
    company: string;
    year: number;
    rights: string;
  };
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  private readonly currentYear = new Date().getFullYear();

  readonly content: FooterContent = {
    brand: {
      name: 'Brazucas no Board',
      description:
          'Preparamos dentistas da América Latina para a aprovação no INBDE e para exercer a odontologia legalmente nos EUA, com metodologia prática e suporte dedicado.',
      logoSrc:
          'assets/images/logos/logoprincipal_v2/Logo principal/logo-principal-branco-negativo.png',
    },
    nav: {
      course: {
        title: 'Curso',
        items: [
          { label: 'Sobre o curso', href: '#sobre' },
          { label: 'Benefícios', href: '#beneficios' },
          { label: 'Planos', href: '#precos' },
          { label: 'Depoimentos', href: '#depoimentos' },
          { label: 'Mentor', href: '#mentor' },
        ],
      },
      support: {
        title: 'Suporte',
        items: [
          { label: 'Perguntas frequentes', href: '#faq' },
          { label: 'Suporte técnico', href: '#suporte' },
          { label: 'Comunidade', href: '#comunidade' },
          { label: 'Recursos', href: '#recursos' },
          // Exemplos externos (se tiver páginas legais depois, ative):
          // { label: 'Termos de uso', href: '/termos', external: false },
          // { label: 'Privacidade', href: '/privacidade', external: false },
        ],
      },
    },
    contact: {
      title: 'Contato',
      items: [
        {
          icon: 'fa-brands fa-whatsapp',
          text: '+1 (555) 123-4567',
          ariaLabel: 'Conversar no WhatsApp',
          href: 'https://wa.me/15551234567',
          notranslate: true,
        },
        {
          icon: 'fa-solid fa-envelope',
          text: 'contato@brazucasnoboard.com',
          ariaLabel: 'Enviar e-mail',
          href: 'mailto:contato@brazucasnoboard.com',
          notranslate: true,
        },
        {
          icon: 'fa-solid fa-location-dot',
          text: 'Estados Unidos',
          ariaLabel: 'Localização',
        },
      ],
    },
    social: [
      { icon: 'fa-brands fa-instagram', href: '#', ariaLabel: 'Instagram' },
      { icon: 'fa-brands fa-linkedin-in', href: '#', ariaLabel: 'LinkedIn' },
      { icon: 'fa-brands fa-youtube', href: '#', ariaLabel: 'YouTube' },
    ],
    security: [
      { icon: 'fa-solid fa-shield-halved', text: 'SSL seguro' },
      { icon: 'fa-solid fa-lock', text: 'Pagamento protegido' },
    ],
    legal: {
      company: 'Brazucas no Board',
      year: this.currentYear,
      rights: 'Todos os direitos reservados.',
    },
  };
}
