export class AssetsRetrieverError extends Error {
    details: any

    constructor(message: string, details?: any) {
        super(message)
        this.details = details
    }
}

export class CookieError extends Error {
    key: any

    constructor(message: string, key: string) {
        super(message);
        this.key = key
    }
}

export class ThemeError extends Error {
    theme: any

    constructor(message: string, theme: string) {
        super(message);
        this.theme = theme
    }
}