import Cookies from 'js-cookie';

interface AssetsGetter {
    get: (file: string) => any;
}
interface ImageBuckets {
    'icons': AssetsGetter;
    'apps': AssetsGetter;
    'pictures': AssetsGetter;
    'gifs': AssetsGetter;
}
interface RequestTypes {
    images: ImageBuckets;
    json: AssetsGetter;
}
declare class AssetsService {
    api: string;
    constructor(apiLink: string);
    link(type: string, file: string, bucket?: string): string;
    get(type: string, file: string, bucket?: string): Promise<any>;
}
declare const assetsService: AssetsService;
declare const assets: RequestTypes;

declare class ColorsService {
    colorChecker: RegExp;
    cssChecker: RegExp;
    isValidHexColor(clr: string): boolean;
    isValidCssVariable(clr: string): boolean;
    isValidColor(clr: string): boolean;
}
declare const colorsService: ColorsService;

type CookiesJar = {
    [p: string]: string;
};
type sameSiteType = "strict" | "Strict" | "lax" | "Lax" | "none" | "None" | undefined;
declare class CookiesService {
    cookieInterface: Cookies.CookiesStatic<string> & {
        noConflict?(): Cookies.CookiesStatic<string>;
    };
    sameSite: sameSiteType;
    defaultExpiration: number;
    private errorCodes;
    constructor(sameSite?: sameSiteType, defaultExpiration?: number);
    hasCookie(key: string): boolean;
    setCookie(key: string, value: string): void;
    getCookie(key: string): string;
    getCookieOrFallback(key: string, fallback: any): any;
    getAllCookies(): CookiesJar;
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

export { AssetsService, ColorsService, CookiesService, LoadingState, type PixelSize, ThemeService, VALIDATOR_STATE, type Validator, assets, assetsService, changeLoc, colorsService, cookiesService, getEventValue, goToTop, themeService };
