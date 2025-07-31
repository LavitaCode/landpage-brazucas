import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, LanguageContent } from '../../services/language.service';

@Component({
  selector: 'app-mentor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentor.html',
  styleUrl: './mentor.scss'
})
export class MentorComponent implements OnInit {
  content!: LanguageContent;

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.currentLanguage$.subscribe(() => {
      this.content = this.languageService.getContent();
    });
  }
}