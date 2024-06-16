import {AssetsService} from "./assets.service";
import {assert, expect} from "chai";
import axios, {AxiosError, AxiosResponse} from "axios";
import sinon from "sinon";
import {AssetsRetrieverError} from "../../shared/errors";

describe('AssetsRetriever', () => {
    const testLink = "https://test-link.test"
    const testRetriever = new AssetsService(testLink)

    const type = "foo";
    const file = 'bar';
    const bucket = 'baz'

    describe('link', () => {
        it('without bucket', () => {
            const result = testRetriever.link(type, file);
            expect(result).to.equal(`${testLink}?type=${type}&file=${file}`);
        })

        it('with bucket', () => {
            const result = testRetriever.link(type, file, bucket);
            expect(result).to.equal(`${testLink}?type=${type}&bucket=${bucket}&file=${file}`);
        })
    })

    describe('get', () => {

        afterEach(() => {
            sinon.restore()
        })

        it('error status', async () => {
            const errorCode = 401;
            const stubbedResponse: AxiosResponse = {
                config: undefined,
                data: undefined,
                headers: undefined,
                statusText: "",
                status: errorCode
            }
            const error = new AxiosError(undefined, undefined, undefined, undefined, stubbedResponse)
            const stub = sinon.stub(axios, 'get').throws(error);
            try {
                await testRetriever.get(type, file, bucket);
                assert.fail('An error should have occurred')
            } catch (err: any) {
                expect(err.constructor).to.deep.equal(AssetsRetrieverError)
                expect(err.message).to.equal(`The API responded with the error code ${errorCode}`);
                expect(err.details).to.deep.equal(error);
            }
            expect(stub.calledOnce).to.equal(true, 'axios.get should have been called once')
        })

        it('success', async () => {
            const returnedData = "test";
            const returnedObject = {
                data: returnedData,
                status: 200
            }
            const stub = sinon.stub(axios, 'get').resolves(returnedObject);
            let response: string;
            try {
                response = await testRetriever.get(type, file, bucket)
            } catch (err: any) {
                assert.fail(`An error should not have occurred. ${err.message}`)
            }
            expect(response).to.equal(returnedData);
            expect(stub.calledOnce).to.equal(true, 'axios.get should have been called once')
        })
    })
})