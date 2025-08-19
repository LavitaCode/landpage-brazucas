// src/app/components/header/header.ts
import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LangSwitcherComponent } from '../../core/i18n/components/lang-switcher/lang-switcher.component';
import { LanguageService } from '../../services/language.service';
import { Language } from '../../shared/models/language.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, LangSwitcherComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  private readonly langService = inject(LanguageService);
  readonly currentLanguage = computed<Language>(() => this.langService.currentLang());

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
