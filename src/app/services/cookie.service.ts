// src/app/core/http/cookies/cookie.service.ts
/**
 * Serviço utilitário para operações com cookies no browser.
 * - Não utiliza "any";
 * - Seguro contra exceções comuns;
 * - Fornece utilitário para derivar domínio raiz (subdomínios → domínio base).
 */

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieService {
    /**
     * Define um cookie com nome, valor, dias de expiração e escopo de path/domínio.
     * Usa SameSite=Lax por padrão para reduzir risco de CSRF.
     *
     * @param name Nome do cookie.
     * @param value Valor do cookie.
     * @param days Dias até expirar.
     * @param path Caminho aplicável (default '/').
     * @param domain Domínio opcional (ex.: ".seu-dominio.com").
     */
    set(name: string, value: string, days: number, path: string = '/', domain?: string): void {
        if (typeof document === 'undefined') return;

        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const domainPart = domain ? `;domain=${domain}` : '';
        const securePart = window.location.protocol === 'https:' ? ';secure' : '';

        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)};expires=${expires};path=${path}${domainPart};samesite=lax${securePart}`;
    }

    /**
     * Obtém o valor de um cookie pelo nome, ou null se não existir.
     *
     * @param name Nome do cookie.
     * @returns Valor decodificado ou null.
     */
    get(name: string): string | null {
        if (typeof document === 'undefined') return null;

        const pattern = new RegExp('(?:^|; )' + encodeURIComponent(name).replace(/[-.+*]/g, '\\$&') + '=([^;]*)');
        const match = document.cookie.match(pattern);
        return match ? decodeURIComponent(match[1]) : null;
    }

    /**
     * Remove um cookie definindo uma data de expiração no passado.
     * Observação: para apagar cookies definidos em domínios específicos,
     * chame esta função repetindo com o `domain`/`path` corretos.
     *
     * @param name Nome do cookie.
     * @param path Caminho aplicável (default '/').
     * @param domain Domínio opcional (ex.: ".seu-dominio.com").
     */
    delete(name: string, path: string = '/', domain?: string): void {
        if (typeof document === 'undefined') return;

        const expired = 'Thu, 01 Jan 1970 00:00:01 GMT';
        const domainPart = domain ? `;domain=${domain}` : '';
        const securePart = window.location.protocol === 'https:' ? ';secure' : '';
        document.cookie = `${encodeURIComponent(name)}=;expires=${expired};path=${path}${domainPart};samesite=lax${securePart}`;
    }

    /**
     * Retorna o domínio raiz para um hostname, removendo o primeiro rótulo
     * (ex.: "app.exemplo.com" → "exemplo.com").
     * Observação: esta heurística é suficiente para a maioria dos TLDs comuns.
     * Para TLDs compostos (ex.: ".co.uk"), um mapa público de TLDs seria necessário.
     *
     * @param hostname Host atual (ex.: "app.seu-dominio.com").
     * @returns Domínio raiz (ex.: "seu-dominio.com") ou o próprio hostname se não houver subdomínio.
     */
    getRootDomain(hostname: string): string | null {
        const parts: string[] = hostname.split('.').filter(Boolean);
        if (parts.length <= 2) return hostname;
        return parts.slice(-2).join('.');
    }
}
