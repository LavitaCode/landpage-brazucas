// src/app/pages/pricing/pricing.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.scss']
})
export class PricingComponent implements OnInit {
  content!: LanguageContent;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.content = this.languageService.getContent();
    });
  }

  /** Extrai símbolo monetário à esquerda (ex: "$", "R$", "€") */
  priceSymbol(val: string | number): string {
    const s = String(val ?? '').trim();
    const m = s.match(/^[^\d]+/); // pega tudo até aparecer um dígito
    return (m?.[0] ?? '$').trim();
  }

  /** Extrai somente a parte numérica do preço (ex: "950") */
  priceAmount(val: string | number): string {
    const s = String(val ?? '').trim();
    return s.replace(/^[^\d]+/, '').trim(); // remove símbolo(s) iniciais
  }

  /** Classe do botão conforme destaque do plano */
  btnClass(featured?: boolean): string {
    return featured ? 'btn-primary' : 'btn-outline';
  }
}
