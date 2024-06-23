declare class ColorsService {
    colorChecker: RegExp;
    cssChecker: RegExp;
    isValidHexColor(clr: string): boolean;
    isValidCssVariable(clr: string): boolean;
    isValidColor(clr: string): boolean;
}
declare const colorsService: ColorsService;

type sameSiteType = "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
declare class CookiesService {
    sameSite: sameSiteType;
    defaultExpiration: number;
    private errorCodes;
    constructor(sameSite?: sameSiteType, defaultExpiration?: number);
    hasCookie(key: string): boolean;
    setCookie(key: string, value: string, days?: number): void;
    getCookie(key: string): string;
    getCookieOrFallback(key: string, fallback: any): any;
    getAllCookies(): Map<string, any>;
    deleteCookie(key: string): void;
    deleteAllCookies(): void;
}
declare const cookiesService: CookiesService;

interface ThemeNames {
    light: string;
    dark: string;
}
declare class ThemeService {
    names: ThemeNames;
    cookieName: string;
    currentTheme: string;
    constructor(names: ThemeNames, cookieName?: string);
    setTheme(theme: string): void;
    setThemeFromCookie(): void;
    switchTheme(): void;
    getTheme(): string;
    private getHead;
}
declare const themeService: ThemeService;

declare const changeLoc: (href: string, newTab?: boolean) => void;
declare const goToTop: () => void;
declare const getEventValue: (event: any) => string;
declare const getAsset: (file?: string) => string;

type PixelSize = `${number}px`;
declare enum VALIDATOR_STATE {
    NONE = 0,
    VALID = 1,
    INVALID = 2
}
type Validator = (input: string) => VALIDATOR_STATE;
declare enum LoadingState {
    IDLE = 0,
    LOADING = 1,
    RESOLVED = 2,
    ERROR = 3
}

export { ColorsService, CookiesService, LoadingState, type PixelSize, ThemeService, VALIDATOR_STATE, type Validator, changeLoc, colorsService, cookiesService, getAsset, getEventValue, goToTop, themeService };
