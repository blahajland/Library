class ColorsService {
    constructor() {
        this.colorChecker = new RegExp("^#(?:[0-9a-f]{6}|[0-9a-f]{8}|[0-9a-f]{3})$", "i"), 
        this.cssChecker = new RegExp("^var\\(--[a-z0-9]+\\)$", "i");
    }
    isValidHexColor(clr) {
        return this.colorChecker.test(clr);
    }
    isValidCssVariable(clr) {
        return this.cssChecker.test(clr);
    }
    isValidColor(clr) {
        return this.isValidHexColor(clr) || this.isValidCssVariable(clr);
    }
}

const colorsService = new ColorsService;

class CookieError extends Error {
    constructor(message, key) {
        super(message), this.key = key;
    }
}

class ThemeError extends Error {
    constructor(message, theme) {
        super(message), this.theme = theme;
    }
}

class CookiesService {
    constructor(sameSite = "Lax", defaultExpiration = 2) {
        this.errorCodes = {
            emptyKey: "Unable to fetch a cookie with an empty key.",
            doesntExist: "The cookie doesn't exist."
        }, this.defaultExpiration = defaultExpiration, this.sameSite = sameSite;
    }
    hasCookie(key) {
        try {
            return this.getCookie(key), !0;
        } catch (_) {
            return !1;
        }
    }
    setCookie(key, value, days = this.defaultExpiration) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        let date = new Date;
        date.setTime(date.getTime() + 86400 * days * 1e3), document.cookie = `${key}=${value}; expires=${date.toUTCString()}; SameSite=${this.sameSite}`;
    }
    getCookie(key) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        const cookies = decodeURIComponent(document.cookie).split(new RegExp("; ?"));
        for (let cookie of cookies) {
            let pair = cookie.split("=");
            if (pair[0].trim() === key.trim()) return pair[1];
        }
        throw new CookieError(this.errorCodes.doesntExist, key);
    }
    getCookieOrFallback(key, fallback) {
        try {
            return this.getCookie(key);
        } catch (_) {
            return fallback;
        }
    }
    getAllCookies() {
        let map = new Map;
        const cookies = decodeURIComponent(document.cookie).split(new RegExp("; ?"));
        for (let cookie of cookies) {
            let pair = cookie.split("=");
            map.set(pair[0], pair[1]);
        }
        return map;
    }
    deleteCookie(key) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        this.setCookie(key, "; expires=-1");
    }
    deleteAllCookies() {
        const cookies = this.getAllCookies();
        for (let [e, _] of cookies) this.deleteCookie(e);
    }
}

const cookiesService = new CookiesService("Strict");

class ThemeService {
    constructor(names, cookieName = "theme") {
        this.names = names, this.cookieName = cookieName, this.currentTheme = names.light;
    }
    setTheme(theme) {
        if (!Object.values(this.names).includes(theme)) throw new ThemeError("This theme tag doesn't exist", theme);
        const head = this.getHead();
        head && (head.dataset.theme = theme, cookiesService.setCookie(this.cookieName, theme), 
        this.currentTheme = theme);
    }
    setThemeFromCookie() {
        const cookie = cookiesService.getCookieOrFallback(this.cookieName, "err");
        this.setTheme(cookie === this.names.dark ? cookie : this.names.light);
    }
    switchTheme() {
        this.setTheme(this.currentTheme === this.names.dark ? this.names.light : this.names.dark);
    }
    getTheme() {
        return this.currentTheme;
    }
    getHead() {
        const head = document.querySelector("html");
        if (!head) throw new Error("html element doesn't exist.");
        return head;
    }
}

const themeService = new ThemeService({
    light: "light",
    dark: "dark"
}, "blahaj-theme"), changeLoc = (href, newTab = !0) => {
    if (!document) return;
    const a = document.createElement("a");
    a.href = href, newTab && (a.target = "_blank", a.rel = "noopener noreferrer"), a.click();
}, goToTop = () => changeLoc("#", !1), getEventValue = event => event.target ? event.target.value : "", getAsset = (file = "") => `https://assets.blahaj.land/${file}`;

var VALIDATOR_STATE, LoadingState;

!function(VALIDATOR_STATE) {
    VALIDATOR_STATE[VALIDATOR_STATE.NONE = 0] = "NONE", VALIDATOR_STATE[VALIDATOR_STATE.VALID = 1] = "VALID", 
    VALIDATOR_STATE[VALIDATOR_STATE.INVALID = 2] = "INVALID";
}(VALIDATOR_STATE || (VALIDATOR_STATE = {})), function(LoadingState) {
    LoadingState[LoadingState.IDLE = 0] = "IDLE", LoadingState[LoadingState.LOADING = 1] = "LOADING", 
    LoadingState[LoadingState.RESOLVED = 2] = "RESOLVED", LoadingState[LoadingState.ERROR = 3] = "ERROR";
}(LoadingState || (LoadingState = {}));

export { ColorsService, CookiesService, LoadingState, ThemeService, VALIDATOR_STATE, changeLoc, colorsService, cookiesService, getAsset, getEventValue, goToTop, themeService };
