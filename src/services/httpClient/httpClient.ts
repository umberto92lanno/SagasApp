import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CallHttpMethod, HttpMethod, IHttpClient } from './types';
import curlirize from 'axios-curlirize';

export class HttpClient implements IHttpClient {
    public static CancelMessage = 'Call aborted by the user';
    private readonly httpClient;

    constructor(config?: AxiosRequestConfig) {
        this.httpClient = axios.create(config);
        if (__DEV__) {
            curlirize(this.httpClient);
        }
    }

    public call<T>(path: string, method: HttpMethod = HttpMethod.get, config: AxiosRequestConfig = {}): CallHttpMethod<T> {
        const cancelToken = axios.CancelToken;
        const source = cancelToken.source();
        // const headers = config.headers as Record<string, string>;
        const mergedConfig = Object.assign(config, {
            cancelToken: source.token,
        });
        const httpClientCall = this.getClientCallFromMethod<T>(method, path, mergedConfig);
        return {
            cancel: () => source.cancel(HttpClient.CancelMessage),
            call: httpClientCall,
        };
    }

    private getClientCallFromMethod<T>(method: HttpMethod, path: string, config?: AxiosRequestConfig): () => Promise<AxiosResponse<T>> {
        switch (method) {
            case HttpMethod.get:
                return () => this.httpClient.get<T>(path, config);
            case HttpMethod.post:
                return () => this.httpClient.post<T>(path, config?.data, config);
            case HttpMethod.put:
                return () => this.httpClient.put<T>(path, config?.data, config);
            case HttpMethod.delete:
                return () => this.httpClient.delete<T>(path, config);
            default:
                return () => this.httpClient.get<T>(path, config);
        }
    }

    public async get<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.httpClient.get<T>(path, config);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    public async post<T>(path: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.httpClient.post<T>(path, config?.data, config);
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}

export const httpClient: IHttpClient = new HttpClient({
    timeout: 10000,
    baseURL: 'https://api.nytimes.com/svc/books/v3/',
});
