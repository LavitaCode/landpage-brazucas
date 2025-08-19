// src/app/core/i18n/language.service.ts
import { Injectable, computed, signal, inject } from '@angular/core';
import {GoogleTranslateProvider} from "../core/i18n/contracts/google-translate.provider";
import {ITranslationProvider} from "../core/i18n/contracts/translation-provider";
import {DEFAULT_LANGUAGE, Language, normalizeLang, SUPPORTED_LANGUAGES} from "../shared/models/language.model";


@Injectable({ providedIn: 'root' })
export class LanguageService {
  /**
   * Implementação concreta do provedor de tradução.
   * Mantém o contrato via interface (Strategy) para permitir troca futura sem impactar consumidores.
   */
  private readonly provider: ITranslationProvider = inject(GoogleTranslateProvider);

  /**
   * Estado reativo do idioma atual.
   * Exposto via `currentLang()` (Signal getter) e também via `currentLangReadable` (Computed) se desejar encadear.
   */
  private readonly currentLangSig = signal<Language>(DEFAULT_LANGUAGE);

  /**
   * Flag reativa para indicar que o mecanismo de idioma foi inicializado.
   */
  private readonly initializedSig = signal<boolean>(false);

  /**
   * Computed somente-leitura para consumo em componentes.
   * Alternativamente, use `currentLang()` diretamente.
   */
  readonly currentLang = computed<Language>(() => this.currentLangSig());

  /**
   * Computed somente-leitura para saber se o subsistema de idioma está pronto.
   */
  readonly isInitialized = computed<boolean>(() => this.initializedSig());

  /**
   * Inicializa o provider e alinha o estado local ao idioma efetivo.
   * Deve ser chamado no bootstrap via APP_INITIALIZER.
   */
  async init(): Promise<void> {
    await this.provider.init(DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES);
    this.currentLangSig.set(this.provider.getCurrentLanguage());
    this.initializedSig.set(true);
  }

  /**
   * Troca de idioma solicitada pela UI.
   * Aceita códigos como "pt", "en", "es" e também variantes "pt-BR", "en-US" (normalizadas).
   * Se o provider conseguir aplicar via combo do Google, não haverá reload; caso contrário, o provider fará fallback por cookie + reload.
   * Após troca sem reload, o Signal é atualizado imediatamente; com reload, a atualização ocorrerá no novo ciclo de vida.
   * @param lang Código do idioma desejado.
   */
  async setLanguage(lang: string): Promise<void> {
    const target = normalizeLang(lang);
    await this.provider.setLanguage(target);
    // Se não houve reload (troca via combo), refletimos localmente.
    this.currentLangSig.set(this.provider.getCurrentLanguage());
  }

  /**
   * Retorna o idioma atual como valor simples (útil em serviços não reativos).
   */
  getCurrentLanguage(): Language {
    return this.currentLangSig();
  }
}
