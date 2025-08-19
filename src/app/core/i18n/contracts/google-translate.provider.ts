// src/app/core/i18n/google-translate.provider.ts
import { Injectable, inject } from '@angular/core';
import {ITranslationProvider} from "./translation-provider";
import {CookieService} from "../../../services/cookie.service";
import {DEFAULT_LANGUAGE, Language, normalizeLang, SUPPORTED_LANGUAGES} from "../../../shared/models/language.model";


/**
 * Adapter para o Google Website Translator.
 * Encapsula o uso da combo interna (.goog-te-combo) e o cookie "googtrans".
 * Não utiliza "any" e respeita o contrato ITranslationProvider (Strategy).
 */
@Injectable({ providedIn: 'root' })
export class GoogleTranslateProvider implements ITranslationProvider {
    private readonly cookie = inject(CookieService);

    private readonly COOKIE_NAME = 'googtrans' as const;
    private readonly COOKIE_DAYS = 365 as const;

    private baseLang: Language = DEFAULT_LANGUAGE;
    private supported: ReadonlyArray<Language> = SUPPORTED_LANGUAGES;

    /**
     * Prepara o provedor: aguarda o script do Google, aplica idioma inicial coerente
     * entre storage → cookie → navegador, e tenta troca sem reload quando possível.
     */
    async init(baseLanguage: Language, supported: ReadonlyArray<Language>): Promise<void> {
        this.baseLang = baseLanguage;
        this.supported = supported;

        // Aguarda a flag de pronto com timeout de segurança
        await this.waitForScriptReady(3000);

        const target: Language = this.pickInitialLang();
        const cookieLang: Language = this.readCookieLang();

        if (cookieLang !== target) {
            const applied: boolean = await this.applyViaCombo(target, 2000);
            if (!applied) {
                this.setCookieForAllDomains(target);
                // não forçamos reload aqui; quem chamar init pode preferir controlar o fluxo.
                // Contudo, o idioma só ficará 100% aplicado após um reload quando a combo não estiver disponível.
            }
        }
    }

    getCurrentLanguage(): Language {
        return this.readCookieLang();
    }

    /**
     * Tenta a troca sem reload via combo interna; caso a combo não exista a tempo,
     * grava o cookie corretamente (em subdomínio e domínio raiz) e faz reload para garantir tradução.
     */
    async setLanguage(target: Language): Promise<void> {
        const lang: Language = this.ensureSupported(target);
        const applied: boolean = await this.applyViaCombo(lang, 2000);
        if (applied) return;

        this.setCookieForAllDomains(lang);
        location.reload();
    }

    // =========================
    // ======= Helpers =========
    // =========================

    private ensureSupported(input: Language): Language {
        const normalized: Language = normalizeLang(input);
        return (this.supported as ReadonlyArray<string>).includes(normalized) ? normalized : this.baseLang;
    }

    private pickInitialLang(): Language {
        const stored: string | null = this.safeGetStorage('lang');
        if (stored) return this.ensureSupported(normalizeLang(stored));

        const browser: Language = normalizeLang(navigator.language || this.baseLang);
        return this.ensureSupported(browser);
    }

    private readCookieLang(): Language {
        const raw: string | null = this.cookie.get(this.COOKIE_NAME);
        if (!raw) return this.baseLang;

        const parts: string[] = raw.split('/');
        const last: string = parts[parts.length - 1] ?? this.baseLang;
        return this.ensureSupported(normalizeLang(last));
    }

    /**
     * Usa a <select class="goog-te-combo"> para trocar idioma sem reload.
     * Retorna true se conseguiu aplicar; false caso a combo não esteja disponível.
     */
    private async applyViaCombo(lang: Language, waitMs: number): Promise<boolean> {
        const select: HTMLSelectElement | null = await this.waitForCombo(waitMs);
        if (!select) return false;

        if (select.value !== lang) {
            select.value = lang;
            const evt: Event = new Event('change', { bubbles: true });
            select.dispatchEvent(evt);
        }

        this.safeSetStorage('lang', lang);
        return true;
    }

    /**
     * Aguarda a existência da combo injetada pelo Website Translator.
     */
    private waitForCombo(timeoutMs: number): Promise<HTMLSelectElement | null> {
        const start: number = Date.now();
        return new Promise((resolve) => {
            const tick = (): void => {
                const el = document.querySelector<HTMLSelectElement>('.goog-te-combo');
                if (el) { resolve(el); return; }
                if (Date.now() - start > timeoutMs) { resolve(null); return; }
                requestAnimationFrame(tick);
            };
            tick();
        });
    }

    /**
     * Checa de forma tipada se o script do Google marcou a flag global.
     * Evita a necessidade de declaração global de tipos para Window.
     */
    private isScriptReady(): boolean {
        const w = window as Window & { __googleTranslateReady__?: boolean };
        return w.__googleTranslateReady__ === true;
    }

    /**
     * Aguarda uma flag global definida em index.html quando o script do Google termina de carregar.
     * Se a flag não aparecer dentro do timeout, prossegue mesmo assim (o fallback via cookie cobre o caso).
     */
    private waitForScriptReady(timeoutMs: number): Promise<void> {
        const start: number = Date.now();
        return new Promise((resolve) => {
            const tick = (): void => {
                if (this.isScriptReady()) { resolve(); return; }
                if (Date.now() - start > timeoutMs) { resolve(); return; }
                requestAnimationFrame(tick);
            };
            tick();
        });
    }

    /**
     * Define o cookie googtrans no domínio atual e no domínio raiz (quando aplicável),
     * garantindo que o Google consiga ler em cenários de subdomínios.
     */
    private setCookieForAllDomains(target: Language): void {
        const value: string = `/${this.baseLang}/${target}`;
        const hostname: string = window.location.hostname;
        const root: string | null = this.cookie.getRootDomain(hostname);

        // Domínio atual (com e sem path explícito)
        this.cookie.set(this.COOKIE_NAME, value, this.COOKIE_DAYS, '/');
        this.cookie.set(this.COOKIE_NAME, value, this.COOKIE_DAYS, '/', hostname);

        // Domínio raiz (caso exista e seja diferente)
        if (root && root !== hostname) {
            this.cookie.set(this.COOKIE_NAME, value, this.COOKIE_DAYS, '/', `.${root}`);
        }

        this.safeSetStorage('lang', target);
    }

    private safeSetStorage(key: string, value: string): void {
        try { localStorage.setItem(key, value); } catch { /* quota/privacidade */ }
    }

    private safeGetStorage(key: string): string | null {
        try { return localStorage.getItem(key); } catch { return null; }
    }
}
