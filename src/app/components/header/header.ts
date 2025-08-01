import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  content!: LanguageContent;
  currentLanguage: string = 'pt';

  availableLanguages = [
    { code: 'pt', name: 'Português', emoji: '🇧🇷' },
    { code: 'es', name: 'Español', emoji: '🇪🇸' },
    { code: 'en', name: 'English', emoji: '🇺🇸' },
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
      this.content = this.languageService.getContent();
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.languageService.setLanguage(selectElement.value);
  }
}


