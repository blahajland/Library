import {cookiesService} from "../cookies/cookies.service";
import {ThemeError} from "../../shared/errors";

interface ThemeNames {
    light: string,
    dark: string
}

export class ThemeService {
    names: ThemeNames
    cookieName: string
    currentTheme: string

    constructor(names: ThemeNames, cookieName = 'theme') {
        this.names = names
        this.cookieName = cookieName
        this.currentTheme = names.light
    }

    setTheme(theme: string) {
        if (!(Object.values(this.names).includes(theme)))
            throw new ThemeError(`This theme tag doesn't exist`, theme)
        const head = this.getHead()
        if (!head) return
        head.dataset.theme = theme
        cookiesService.setCookie(this.cookieName, theme)
        this.currentTheme = theme
    }

    setThemeFromCookie() {
        const cookie = cookiesService.getCookieOrFallback(this.cookieName, 'err')
        this.setTheme(cookie === this.names.dark ? cookie : this.names.light)
    }

    switchTheme() {
        this.setTheme(this.currentTheme === this.names.dark ? this.names.light : this.names.dark)
    }

    getTheme() {
        return this.currentTheme
    }

    private getHead(): HTMLHtmlElement {
        const head = document.querySelector('html')
        if (!head)
            throw new Error(`html element doesn't exist.`)
        return head
    }
}

const defaultThemes: ThemeNames = {
    light: 'light',
    dark: 'dark'
}

export const themeService = new ThemeService(defaultThemes, 'blahaj-theme')