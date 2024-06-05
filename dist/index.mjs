import axios from "axios";

import Cookies from "js-cookie";

class AssetsRetrieverError extends Error {
    constructor(message, details) {
        super(message), this.details = details;
    }
}

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

class AssetsService {
    constructor(apiLink) {
        this.api = apiLink;
    }
    link(type, file, bucket) {
        return `${this.api}?type=${type}${bucket ? "&bucket=" + bucket : ""}&file=${file}`;
    }
    async get(type, file, bucket) {
        let res;
        try {
            res = await axios.get(this.link(type, file, bucket));
        } catch (err) {
            throw new AssetsRetrieverError(`The API responded with the error code ${err.response.status}`, err);
        }
        if (200 !== res.status) throw new AssetsRetrieverError(`The API responded with the error code ${res.status}`, res);
        return res.data;
    }
}

const assetsService = new AssetsService("https://blahaj.land/static/api/"), assets = {
    json: {
        get: async file => assetsService.get("json", file)
    },
    images: {
        icons: {
            get: file => assetsService.link("image", file, "icons")
        },
        apps: {
            get: file => assetsService.link("image", file, "apps")
        },
        pictures: {
            get: file => assetsService.link("image", file, "pictures")
        },
        gifs: {
            get: file => assetsService.link("image", file, "gifs")
        }
    }
};

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

class CookiesService {
    constructor(sameSite = "Lax", defaultExpiration = 2) {
        this.cookieInterface = Cookies, this.errorCodes = {
            emptyKey: "Unable to fetch a cookie with an empty key.",
            doesntExist: "The cookie doesn't exist."
        }, this.defaultExpiration = defaultExpiration, this.sameSite = sameSite;
    }
    hasCookie(key) {
        return "" !== this.cookieInterface.get(key);
    }
    setCookie(key, value) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        this.cookieInterface.set(key, value, {
            sameSite: this.sameSite
        });
    }
    getCookie(key) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        let returnedValue = this.cookieInterface.get(key);
        if (!returnedValue || "" === returnedValue) throw new CookieError(this.errorCodes.doesntExist, key);
        return returnedValue;
    }
    getCookieOrFallback(key, fallback) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        let returnedValue = this.cookieInterface.get(key);
        return "" === returnedValue ? fallback : returnedValue;
    }
    getAllCookies() {
        return this.cookieInterface.get();
    }
    deleteCookie(key) {
        if ("" === key) throw new CookieError(this.errorCodes.emptyKey, key);
        this.cookieInterface.remove(key);
    }
    deleteAllCookies() {
        const cookies = this.cookieInterface.get();
        for (let e in cookies) this.cookieInterface.remove(e);
    }
}

const cookiesService = new CookiesService("Strict");

class ThemeService {
    constructor(names, cookieName = "theme") {
        this.names = names, this.cookieName = cookieName, this.currentTheme = names.light, 
        this.setTheme(names.light);
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
}, "theme"), changeLoc = (href, newTab = !0) => {
    if (!document) return;
    const a = document.createElement("a");
    a.href = href, newTab && (a.target = "_blank", a.rel = "noopener noreferrer"), a.click();
}, goToTop = () => changeLoc("#", !1), getEventValue = event => event.target ? event.target.value : "";

var VALIDATOR_STATE, LoadingState;

!function(VALIDATOR_STATE) {
    VALIDATOR_STATE[VALIDATOR_STATE.NONE = 0] = "NONE", VALIDATOR_STATE[VALIDATOR_STATE.VALID = 1] = "VALID", 
    VALIDATOR_STATE[VALIDATOR_STATE.INVALID = 2] = "INVALID";
}(VALIDATOR_STATE || (VALIDATOR_STATE = {})), function(LoadingState) {
    LoadingState[LoadingState.IDLE = 0] = "IDLE", LoadingState[LoadingState.LOADING = 1] = "LOADING", 
    LoadingState[LoadingState.RESOLVED = 2] = "RESOLVED", LoadingState[LoadingState.ERROR = 3] = "ERROR";
}(LoadingState || (LoadingState = {}));

export { AssetsService, ColorsService, CookiesService, LoadingState, ThemeService, VALIDATOR_STATE, assets, assetsService, changeLoc, colorsService, cookiesService, getEventValue, goToTop, themeService };
