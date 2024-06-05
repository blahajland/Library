import {expect} from "chai";
import {colorsService} from "./colors.service";

describe('isValidHexColor', () => {

    it('with valid color', () => {
        const validHexColors = [
            "#123",
            "#abc",
            "#1ab",
            "#1AB",
            "#ABCDEF",
            "#AABBCCDD"
        ]
        for (let e of validHexColors) {
            let response = colorsService.isValidHexColor(e)
            expect(response).to.equal(true)
        }
    })

    it('with invalid color', () => {
        const invalidHexColors = [
            "123",
            "#1234",
            "#12345",
            "#ABCDGG",
            "#A-B-C-",
            "#ABCDEFG",
            "#AABBCCDDE"
        ]
        for (let e of invalidHexColors) {
            let response = colorsService.isValidHexColor(e)
            expect(response).to.equal(false)
        }
    })
});

describe('isValidCssVariable', () => {

    it('with valid css variables', () => {
        const validCssVars = [
            'var(--a)',
            'var(--color)',
            'var(--color1)'
        ]

        for (let e of validCssVars) {
            let response = colorsService.isValidCssVariable(e);
            expect(response).to.equal(true)
        }
    })

    it('with invalid css variables', () => {
        const invalidCssVars = [
            'va(--a)',
            'var--a)',
            'var(--a',
            'ver(--a)',
            'var(--)',
            'var(foo)',
            'var(-foo)',
            'var(--foo_bar)',
            'var(--foo-bar)'
        ]

        for (let e of invalidCssVars) {
            let response = colorsService.isValidCssVariable(e);
            expect(response).to.equal(false)
        }
    })
})