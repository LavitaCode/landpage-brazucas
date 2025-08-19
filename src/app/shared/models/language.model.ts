// src/app/core/i18n/models/language.model.ts
/**
 * Define o conjunto de idiomas suportados pela aplicação e utilitários de normalização.
 * Não utiliza "any" e é compatível com TypeScript em modo estrito.
 */

export type Language = 'pt' | 'en' | 'es';

/**
 * Idioma padrão do conteúdo fonte (SSoT).
 */
export const DEFAULT_LANGUAGE: Language = 'pt';

/**
 * Lista imutável dos idiomas aceitos pela aplicação.
 */
export const SUPPORTED_LANGUAGES: ReadonlyArray<Language> = ['pt', 'en', 'es'] as const;

/**
 * Normaliza um código de idioma arbitrário (ex.: "pt-BR", "EN-us", "es").
 * - Reduz para minúsculas;
 * - Remove a região (mantém apenas o prefixo antes de "-");
 * - Valida contra SUPPORTED_LANGUAGES;
 * - Retorna DEFAULT_LANGUAGE se o código não for suportado.
 *
 * @param input Código de idioma fornecido.
 * @returns Idioma normalizado e suportado.
 */
export function normalizeLang(input: string | null | undefined): Language {
    const raw: string = (input ?? DEFAULT_LANGUAGE).toLowerCase().trim();
    const base: string = (raw.split('-')[0] || raw);
    const candidate = base as Language;

    return (SUPPORTED_LANGUAGES as ReadonlyArray<string>).includes(candidate)
        ? candidate
        : DEFAULT_LANGUAGE;
}
