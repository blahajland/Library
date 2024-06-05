import axios, {type AxiosResponse} from 'axios'
import {AssetsRetrieverError} from "../../shared/errors";

const staticLink = 'https://blahaj.land/static/api/'

interface AssetsGetter {
    get: (file: string) => any
}

interface ImageBuckets {
    'icons': AssetsGetter,
    'apps': AssetsGetter,
    'pictures': AssetsGetter,
    'gifs': AssetsGetter
}

interface RequestTypes {
    images: ImageBuckets,
    json: AssetsGetter
}

export class AssetsService {
    api: string

    constructor(apiLink: string) {
        this.api = apiLink
    }

    link(type: string, file: string, bucket?: string): string {
        return `${this.api}?type=${type}${bucket ? '&bucket=' + bucket : ''}&file=${file}`
    }

    async get(type: string, file: string, bucket?: string): Promise<any> {
        let res: AxiosResponse<any, any>
        try {
            res = await axios.get(this.link(type, file, bucket))
        } catch (err: any) {
            throw new AssetsRetrieverError(`The API responded with the error code ${err.response.status}`, err)
        }
        if (res.status !== 200)
            throw new AssetsRetrieverError(`The API responded with the error code ${res.status}`, res)
        return res.data
    }
}

export const assetsService = new AssetsService(staticLink)

export const assets: RequestTypes = {
    json: {
        get: async (file: string) => assetsService.get('json', file)
    },
    images: {
        icons: {
            get: (file: string) => assetsService.link('image', file, 'icons')
        },
        apps: {
            get: (file: string) => assetsService.link('image', file, 'apps')
        },
        pictures: {
            get: (file: string) => assetsService.link('image', file, 'pictures')
        },
        gifs: {
            get: (file: string) => assetsService.link('image', file, 'gifs')
        }
    }
}