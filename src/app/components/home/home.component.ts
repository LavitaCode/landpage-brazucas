// src/app/pages/home/home.component.ts
import { AfterViewInit, Component, OnDestroy, signal, inject, HostListener } from '@angular/core';
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

import { ChangeDetectorRef } from '@angular/core';
import { ChatbotLauncherComponent } from '../../shared/chatbot/chatbot/chatbot-launcher/chatbot-launcher.component';
import { ChatbotWidgetComponent } from '../../shared/chatbot/chatbot/chatbot-widget/chatbot-widget.component';

type Section = 'hero' | 'beneficios' | 'depoimentos' | 'precos' | 'mentor';
const VALID_SECTIONS: ReadonlyArray<Section> = ['hero','beneficios','depoimentos','precos','mentor'];

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        HeroComponent,
        BenefitsComponent,
        TestimonialsComponent,
        PricingComponent,
        MentorComponent,
        FooterComponent,
        ChatbotLauncherComponent,
        ChatbotWidgetComponent,
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnDestroy {
    private sub?: Subscription;
    private cdr = inject(ChangeDetectorRef);

    isChatOpen = signal(false);

    openChat = () => {
        this.isChatOpen.set(true);
        this.cdr.detectChanges();
    };

    closeChat = () => {
        this.isChatOpen.set(false);
        this.cdr.detectChanges();
    };

    // Fecha com tecla ESC
    @HostListener('document:keydown.escape')
    onEsc() {
        if (this.isChatOpen()) this.closeChat();
    }

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngAfterViewInit(): void {
        this.scrollTo(this.route.snapshot.paramMap.get('section'));
        this.sub = this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => this.scrollTo(this.route.snapshot.paramMap.get('section')));
    }
    ngOnDestroy(): void { this.sub?.unsubscribe(); }

    private scrollTo(sectionParam: string | null): void {
        const section = sectionParam as Section | null;
        if (!section || !VALID_SECTIONS.includes(section)) return;
        setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    }
}
