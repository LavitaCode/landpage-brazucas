// src/app/core/i18n/contracts/translation-provider.ts


import {Language} from "../../../shared/models/language.model";

/**
 * Contrato para provedores de tradução (Strategy).
 * Implementações concretas (ex.: GoogleTranslateProvider) devem obedecer este contrato.
 */
export interface ITranslationProvider {
    /**
     * Inicializa o provedor com o idioma base e a lista de idiomas suportados.
     * @param baseLanguage Idioma original do conteúdo (ex.: 'pt').
     * @param supported Lista de idiomas aceitos pela aplicação (ex.: ['pt','en','es']).
     */
    init(baseLanguage: Language, supported: ReadonlyArray<Language>): Promise<void>;

    /**
     * Retorna o idioma atualmente aplicado ao documento.
     */
    getCurrentLanguage(): Language;

    /**
     * Solicita a troca de idioma. Implementações podem tentar uma troca sem reload;
     * caso não seja possível, devem acionar fallback (ex.: cookie + reload) para garantir a tradução.
     * @param target Idioma de destino.
     */
    setLanguage(target: Language): Promise<void>;
}
