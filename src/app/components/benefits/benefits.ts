// src/app/pages/benefits/benefits.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './benefits.html',
  styleUrls: ['./benefits.scss']
})
export class BenefitsComponent implements OnInit {
  content!: LanguageContent;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.content = this.languageService.getContent();
    });
  }

  trackByIdx = (_: number, __: unknown) => _;

  /** Escolhe o ícone do Bootstrap Icons com base no texto (pt/es/en) ou posição */
  iconFor(text: string, index: number): string {
    const t = (text || '').toLowerCase();

    // Aprovação / Board / INBDE
    if (/(board|inbde|aprov|aprob|approval|aprobación)/.test(t)) return 'bi-patch-check';

    // Exercer legalmente / Legal / Reconhecido
    if (/(legal|legalmente|reconhecid|reconocid|recognized|recognised)/.test(t)) return 'bi-shield-check';

    // Dinheiro / Dólar / Salário
    if (/(d[oó]lar|dolar|dollars|sal[aá]ri|salary|paga)/.test(t)) return 'bi-cash-coin';

    // Nome / Reputação / Mercado / Destaque
    if (/(nome|nombre|reputa|mercad|market|stand\s*out|destaque)/.test(t)) return 'bi-award';

    // Burocracia / Processo / Documentos
    if (/(burocrac|bureaucr|process|processo|document)/.test(t)) return 'bi-signpost-2';

    // Reconhecimento / Referência / Sucesso
    if (/(reconhec|reconoc|refer[êe]nci|reference|sucesso|éxito|success)/.test(t)) return 'bi-trophy';

    // Fallback por posição (mantém variedade agradável)
    const fallback: string[] = ['bi-patch-check','bi-shield-check','bi-cash-coin','bi-award','bi-signpost-2','bi-trophy'];
    return fallback[index % fallback.length];
  }
}
