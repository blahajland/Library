import Cookies from 'js-cookie'
import {CookieError} from "../../shared/errors"

type CookiesJar = { [p: string]: string }

type sameSiteType = "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined

export class CookiesService {
    cookieInterface = Cookies
    sameSite: sameSiteType
    defaultExpiration: number
    private errorCodes = {
        emptyKey: 'Unable to fetch a cookie with an empty key.',
        doesntExist: `The cookie doesn't exist.`
    }

    constructor(sameSite: sameSiteType = 'Lax', defaultExpiration: number = 2) {
        this.defaultExpiration = defaultExpiration
        this.sameSite = sameSite
    }

    hasCookie(key: string): boolean {
        return this.cookieInterface.get(key) !== ''
    }

    setCookie(key: string, value: string) {
        if (key === '')
            throw new CookieError(this.errorCodes.emptyKey, key)
        this.cookieInterface.set(key, value, {sameSite: this.sameSite})
    }

    getCookie(key: string): string {
        if (key === '')
            throw new CookieError(this.errorCodes.emptyKey, key)
        let returnedValue = this.cookieInterface.get(key)
        if (returnedValue === '')
            throw new CookieError(this.errorCodes.doesntExist, key)
        return returnedValue
    }

    getCookieOrFallback(key: string, fallback: any): any {
        if (key === '')
            throw new CookieError(this.errorCodes.emptyKey, key)
        let returnedValue = this.cookieInterface.get(key)
        return returnedValue === '' ? fallback : returnedValue
    }

    getAllCookies(): CookiesJar {
        return this.cookieInterface.get()
    }

    deleteCookie(key: string) {
        if (key === '')
            throw new CookieError(this.errorCodes.emptyKey, key)
        this.cookieInterface.remove(key)
    }

    deleteAllCookies() {
        const cookies: CookiesJar = this.cookieInterface.get()
        for (let e in cookies) {
            this.cookieInterface.remove(e)
        }
    }
}

export const cookiesService = new CookiesService('Strict')