// src/app/pages/home/home.component.ts
import {
    AfterViewInit,
    Component,
    OnDestroy,
    signal,
    inject,
    HostListener,
    ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

import { HeaderComponent } from '../header/header';
import { HeroComponent } from '../hero/hero';
import { BenefitsComponent } from '../benefits/benefits';
import { TestimonialsComponent } from '../testimonials/testimonials';
import { PricingComponent } from '../pricing/pricing';
import { MentorComponent } from '../mentor/mentor';
import { FooterComponent } from '../footer/footer';
import { AboutComponent } from '../about/about';


import { ChatbotLauncherComponent } from '../../shared/chatbot/chatbot/chatbot-launcher/chatbot-launcher.component';
import { ChatbotWidgetComponent } from '../../shared/chatbot/chatbot/chatbot-widget/chatbot-widget.component';
import {CourseOverviewComponent} from "../course-overview/course-overview.component";

type Section =
    | 'hero'
    | 'beneficios'
    | 'sobre'
    | 'depoimentos'
    | 'equipe'
    | 'precos'
    | 'mentor';

const VALID_SECTIONS: ReadonlyArray<Section> = [
    'hero',
    'sobre',
    'beneficios',
    'depoimentos',
    'precos',
    'mentor',
    'equipe',
];

// aliases para âncoras alternativas que já existem na sua página
const SECTION_ALIASES: Readonly<Record<string, Section>> = {
    planos: 'precos',
};

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        CourseOverviewComponent,
        HeaderComponent,
        HeroComponent,
        BenefitsComponent,
        TestimonialsComponent,
        PricingComponent,
        MentorComponent,
        FooterComponent,
        AboutComponent,
        ChatbotLauncherComponent,
        ChatbotWidgetComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    private readonly cdr = inject(ChangeDetectorRef);
    private sub?: Subscription;

    // controle do chat (sem any)
    isChatOpen = signal<boolean>(false);
    private lastFocusedElement: HTMLElement | null = null;

    constructor(private route: ActivatedRoute, private router: Router) {}

    // ===== Chat =====
    openChat = (): void => {
        this.lastFocusedElement = (document.activeElement as HTMLElement) ?? null;
        this.isChatOpen.set(true);
        this.cdr.detectChanges();

        // foca no botão de fechar do painel
        const closeBtn = document.querySelector<HTMLButtonElement>(
            '.chat-topbar .chat-close'
        );
        closeBtn?.focus();
    };

    closeChat = (): void => {
        this.isChatOpen.set(false);
        this.cdr.detectChanges();
        this.lastFocusedElement?.focus?.();
    };

    @HostListener('document:keydown.escape')
    onEsc(): void {
        if (this.isChatOpen()) this.closeChat();
    }

    // ===== Navegação/rolagem =====
    ngAfterViewInit(): void {
        // 1) /home/:section
        this.scrollTo(this.route.snapshot.paramMap.get('section'));

        // 2) /home#fragment
        const fragment = this.route.snapshot.fragment;
        if (fragment) this.scrollTo(fragment);

        // 3) re-rolar ao navegar entre rotas/fragmentos
        this.sub = this.router.events
            .pipe(filter((e) => e instanceof NavigationEnd))
            .subscribe(() => {
                const sec = this.route.snapshot.paramMap.get('section');
                const frag = this.route.snapshot.fragment;
                this.scrollTo(sec ?? frag);
            });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    private scrollTo(sectionParam: string | null): void {
        if (!sectionParam) return;

        const normalizedKey = sectionParam.toLowerCase();
        const targetSection: Section | undefined =
            (SECTION_ALIASES[normalizedKey] as Section | undefined) ||
            (normalizedKey as Section);

        if (!VALID_SECTIONS.includes(targetSection as Section)) return;

        // espera o DOM estabilizar para calcular posição corretamente
        requestAnimationFrame(() => {
            const el = document.getElementById(targetSection as string);
            if (!el) return;

            // offset do header fixo (se existir). Você pode ajustar via CSS var global.
            const headerHeightPx = this.readCssVarInt('--header-height', 80);
            this.scrollIntoViewWithOffset(el, headerHeightPx + 12); // 12px de respiro
        });
    }

    private scrollIntoViewWithOffset(element: HTMLElement, offset = 0): void {
        const rect = element.getBoundingClientRect();
        const top = rect.top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }

    private readCssVarInt(varName: string, fallback: number): number {
        const raw = getComputedStyle(document.documentElement).getPropertyValue(varName);
        const parsed = parseInt(raw, 10);
        return Number.isFinite(parsed) ? parsed : fallback;
    }
}
