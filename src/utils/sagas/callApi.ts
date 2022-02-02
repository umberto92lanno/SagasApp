import {retry, SagaGenerator} from "typed-redux-saga";
import {CallEffect, SagaReturnType} from "redux-saga/effects";

export function* callApi<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>): SagaGenerator<SagaReturnType<Fn>, CallEffect<SagaReturnType<Fn>>> {
    return yield* retry<Fn>(3, 2000, fn, ...args);
}
