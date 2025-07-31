import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  isMenuOpen = false;
  content!: LanguageContent;
  currentLanguage: string = 'pt';
  availableLanguages: Array<{code: string, name: string}> = [];

  constructor(private languageService: LanguageService) {}

   ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.content = this.languageService.getContent();
    });
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.languageService.setLanguage(selectElement.value);
  }
}

