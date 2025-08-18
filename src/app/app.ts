import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { HeroComponent } from './components/hero/hero';
import { BenefitsComponent } from './components/benefits/benefits';
import { TestimonialsComponent } from './components/testimonials/testimonials';
import { PricingComponent } from './components/pricing/pricing';
import { MentorComponent } from './components/mentor/mentor';
import { FooterComponent } from './components/footer/footer';
import {AboutComponent} from "./components/about/about";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        HeroComponent,
        BenefitsComponent,
        TestimonialsComponent,
        PricingComponent,
        MentorComponent,
        FooterComponent,
        AboutComponent
    ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'brazucas-inbde-improved';
}

