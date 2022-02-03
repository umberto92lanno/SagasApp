import {retry, SagaGenerator, race, take, cancel, call} from "typed-redux-saga";
import {CallEffect, SagaReturnType} from "redux-saga/effects";

export function* callApi<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>) {
    // return yield* retry<Fn>(3, 2000, fn, ...args);
    const { response, interrupt } = yield* race({
       response:  retry<Fn>(3, 2000, fn, ...args),
       interrupt: take('INTERRUPT'),
    });
    if (!interrupt) {
        return response;
    }
    yield* cancel();
    return;
}
