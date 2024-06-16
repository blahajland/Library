import {cookiesService} from "./cookies.service";
import {assert, expect} from "chai";
import sinon from "sinon";
import {CookieError} from "../../shared/errors";

describe('CookiesService', () => {
    const defaultKey: string = 'test'
    const defaultValue: string = 'test-value'
    const defaultFallback: string = 'fallback'
    const errorCodes = {
        emptyKey: 'Unable to fetch a cookie with an empty key.',
        doesntExist: `The cookie doesn't exist.`
    }

    afterEach(() => {
        sinon.restore()
    })

    describe('hasCookie', () => {
        it('with cookie present', () => {
            const stub =
                sinon.stub(cookiesService.cookieInterface, 'get')
                    // @ts-ignore
                    .withArgs(defaultKey).returns(defaultValue)
            const result = cookiesService.hasCookie(defaultKey)
            expect(stub.calledOnce).to.equal(true)
            expect(result).to.equal(true)
        })

        it('without cookie present', () => {
            const stub =
                sinon.stub(cookiesService.cookieInterface, 'get')
                    // @ts-ignore
                    .withArgs(defaultKey).returns('')
            const result = cookiesService.hasCookie(defaultKey)
            expect(stub.calledOnce).to.equal(true)
            expect(result).to.equal(false)
        })
    })

    describe('setCookie', () => {
        it('create cookie', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'set').withArgs(defaultKey, defaultValue).returns('')
            cookiesService.setCookie(defaultKey, defaultValue)
            expect(stub.calledOnce).to.equal(true)
        })

        it('with empty key', () => {
            try {
                cookiesService.setCookie('', defaultValue);
                assert.fail('An error should have occured')
            } catch (err: any) {
                expect(err.constructor).to.equal(CookieError)
                expect(err.message).to.equal(errorCodes.emptyKey)
                expect(err.key).to.equal('')
            }
        })
    })

    describe('getCookie', () => {
        it('with cookie present', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'get')
                // @ts-ignore
                .withArgs(defaultKey).returns(defaultValue)
            const response = cookiesService.getCookie(defaultKey)
            expect(stub.calledOnce).to.equal(true)
            expect(response).to.equal(defaultValue)
        })

        it('without cookie present', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'get')
                // @ts-ignore
                .withArgs(defaultKey).returns('')
            try {
                cookiesService.getCookie(defaultKey)
                assert.fail('An error should have occured')
            } catch (err: any) {
                expect(stub.calledOnce).to.equal(true)
                expect(err.constructor).to.equal(CookieError)
                expect(err.message).to.equal(errorCodes.doesntExist)
                expect(err.key).to.equal(defaultKey)
            }
        })

        it('with empty key', () => {
            try {
                cookiesService.getCookie('')
                assert.fail('An error should have occured')
            } catch (err: any) {
                expect(err.constructor).to.equal(CookieError)
                expect(err.message).to.equal(errorCodes.emptyKey)
                expect(err.key).to.equal('')
            }
        })
    })

    describe('getCookieOrFallback', () => {
        it('with cookie present', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'get')
                // @ts-ignore
                .withArgs(defaultKey).returns(defaultValue)
            const response = cookiesService.getCookieOrFallback(defaultKey, defaultFallback)
            expect(stub.calledOnce).to.equal(true)
            expect(response).to.equal(defaultValue)
        })

        it('without cookie present', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'get')
                // @ts-ignore
                .withArgs(defaultKey).returns('')
            const response = cookiesService.getCookieOrFallback(defaultKey, defaultFallback)
            expect(stub.calledOnce).to.equal(true)
            expect(response).to.equal(defaultFallback)

        })

        it('with empty key', () => {
            try {
                cookiesService.getCookieOrFallback('', defaultFallback)
                assert.fail('An error should have occured')
            } catch (err: any) {
                expect(err.constructor).to.equal(CookieError)
                expect(err.message).to.equal(errorCodes.emptyKey)
                expect(err.key).to.equal('')
            }
        })
    })

    describe('deleteCookie', () => {
        it('delete cookie', () => {
            const stub = sinon.stub(cookiesService.cookieInterface, 'remove')
                .withArgs(defaultKey).returns()
            cookiesService.deleteCookie(defaultKey)
            expect(stub.calledOnce).to.equal(true)
        });

        it('with empty key', () => {
            try {
                cookiesService.deleteCookie('');
                assert.fail('An error should have occured')
            } catch (err: any) {
                expect(err.constructor).to.equal(CookieError)
                expect(err.message).to.equal(errorCodes.emptyKey)
                expect(err.key).to.equal('')
            }
        })
    })

})