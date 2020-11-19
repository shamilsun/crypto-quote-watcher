import axios from 'axios';
import {EBackendUrls} from "./backendProps";
import {IPoloniexPublicPairData} from "../../integration/poloniex/poloniexProps";

export const backend = axios.create({
    baseURL: '/'
});

axios.defaults.withCredentials = true;

export class BackendClass {
    static async getPoloniexTickers(): Promise<IPoloniexPublicPairData> {
        return backend.get(`${EBackendUrls.PoloniexPairs}`).then((response: any) => {
            return response.data as IPoloniexPublicPairData
        });
    }
}