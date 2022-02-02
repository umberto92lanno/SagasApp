import { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';

export interface GenericApiResponse<T = any> {
    copyright: string;
    num_results: number;
    results: T;
    status: string;
}

export interface CallHttpMethod<T = any> {
    cancel: Canceler;
    call: () => Promise<AxiosResponse<T>>;
}

export enum HttpMethod {
    get,
    post,
    put,
    delete,
}

export interface IHttpClient {
    call: <T>(path: string, method?: HttpMethod, config?: AxiosRequestConfig) => CallHttpMethod<T>;
    get: <T>(path: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    post: <T>(path: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}
