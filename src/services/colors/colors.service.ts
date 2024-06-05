export class ColorsService {
    colorChecker: RegExp = new RegExp('^#(?:[0-9a-f]{6}|[0-9a-f]{8}|[0-9a-f]{3})$', 'i')
    cssChecker: RegExp = new RegExp('^var\\(--[a-z0-9]+\\)$', 'i')

    isValidHexColor(clr: string) {
        return this.colorChecker.test(clr)
    }

    isValidCssVariable(clr: string) {
        return this.cssChecker.test(clr)
    }

    isValidColor(clr: string) {
        return this.isValidHexColor(clr) || this.isValidCssVariable(clr)
    }
}

export const colorsService = new ColorsService()