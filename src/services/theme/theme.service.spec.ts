import {themeService} from "./theme.service";
import JSDOM from 'jsdom-global'
import {assert, expect} from "chai";
import {cookiesService} from "../cookies/cookies.service";
import sinon from "sinon";
import {ThemeError} from "../../shared/errors";

JSDOM()

describe('ThemeService', () => {

    afterEach(() => {
        sinon.restore()
    })

    const getThemeValueFromHtml = () => document.querySelector('html').dataset.theme

    describe('setTheme', () => {
        it('set themes', () => {
            let testThemes = ['light', 'dark', 'dark', 'light', 'dark']
            for (let e of testThemes) {
                const stub = sinon.stub(cookiesService, 'setCookie')
                    .withArgs(themeService.cookieName, e).returns()
                themeService.setTheme(e)
                expect(getThemeValueFromHtml()).to.equal(e)
                expect(themeService.currentTheme).to.equal(e)
                expect(stub.calledOnce).to.equal(true)
                sinon.restore()
            }
        })

        it('unknown theme', () => {
            const invalidTheme = "test"
            try {
                themeService.setTheme(invalidTheme)
                assert.fail('An error should have occurred')
            } catch (err: any) {
                expect(err.constructor).to.equal(ThemeError)
                expect(err.message).to.equal(`This theme tag doesn't exist`)
                expect(err.theme).to.equal(invalidTheme)
            }
        })
    })

    describe('setThemeFromCookie', () => {
        it('set theme', () => {
            const defaultTheme = 'dark'
            const stub = sinon.stub(cookiesService, 'getCookieOrFallback')
                .withArgs(themeService.cookieName, 'err').returns(defaultTheme)
            themeService.setThemeFromCookie()
            expect(getThemeValueFromHtml()).to.equal(defaultTheme)
            expect(themeService.currentTheme).to.equal(defaultTheme)
            expect(stub.calledOnce).to.equal(true)
        })

        it('set theme without cookie', () => {
            const stub = sinon.stub(cookiesService, 'getCookieOrFallback')
                .withArgs(themeService.cookieName, 'err').returns('err')
            themeService.setThemeFromCookie()
            expect(getThemeValueFromHtml()).to.equal('light')
            expect(themeService.currentTheme).to.equal('light')
            expect(stub.calledOnce).to.equal(true)
        })
    })

    describe('switchTheme', () => {
        it('switch theme', () => {
            const stub = sinon.stub(cookiesService, 'setCookie')
                .returns()
            themeService.setTheme('light')
            themeService.switchTheme()
            expect(getThemeValueFromHtml()).to.equal('dark')
            expect(themeService.currentTheme).to.equal('dark')
            themeService.switchTheme()
            expect(getThemeValueFromHtml()).to.equal('light')
            expect(themeService.currentTheme).to.equal('light')
            expect(stub.called).to.equal(true)
        })
    })

    describe('getTheme', () => {
        it('get theme', () => {
            //const stub = sinon.stub(cookiesService, 'setCookie').returns()
            const defaultTheme = 'light'
            themeService.setTheme(defaultTheme)
            let response = themeService.getTheme()
            expect(response).to.equal(defaultTheme)
            themeService.switchTheme()
            response = themeService.getTheme()
            expect(response).to.equal('dark')
        })
    })
})