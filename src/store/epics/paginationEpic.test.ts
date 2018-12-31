import nock from 'nock';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { createPaginationEpic } from './paginationEpic';
import { Subject } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { createPagination, initialPaginationState } from 'src/store/reducers/paginationReducer';
import { ReduxState } from 'src/store/index';
import { ResultSet } from 'src/domain/ResultSet';

interface Fruit {
    id: number
    name: string
}

const banana: Fruit = {
    id: 1,
    name: 'banana'
};

const apple: Fruit = {
    id: 2,
    name: 'apple'
};

describe('paginationEpic', () => {
    const fruitPagination = createPagination<Fruit>();
    // @ts-ignore
    const fruitPaginationEpic = createPaginationEpic<Fruit>('fruit', fruitPagination.actionCreators);

    it('should call server on first request, maps requestPage action to receivePage action', async () => {
        const initialState = {
            fruit: {},
            pagination: {
                fruit: initialPaginationState
            },
        };

        const results: ResultSet<Fruit> = {
            count: 1,
            next: 'nextUrl',
            previous: null,
            results: [banana]
        };

        nock(/.*/)
            .log(console.log)
            .get(/api\/fruit?.*/)
            .reply(200, results);

        const action$ = ActionsObservable.of(fruitPagination.actionCreators.requestPage({ page: 0 }));
        const stateInput$ = new Subject<ReduxState>();
        // @ts-ignore
        const state$ = new StateObservable<ReduxState>(stateInput$, initialState);

        await fruitPaginationEpic(action$, state$, [])
            .pipe(toArray())
            .toPromise()
            // @ts-ignore
            .then((actions) => {
                expect(actions).toEqual([fruitPagination.actionCreators.receivePage({ ...results, page: 0 })]);
            });
    });

    it('should not call server, retrieve page from store, map requestPage to requestPageFromCache', () => {

        const state = {
            fruit: {
                2: apple
            },
            pagination: {
                fruit: {
                    1: {
                        ids: [2],
                    },
                    requestedPage: 1,
                    currentPage: 0,
                }
            }
        };

        const action$ = ActionsObservable.of(fruitPagination.actionCreators.requestPage({ page: 1 }));
        const stateInput$ = new Subject<ReduxState>();
        // @ts-ignore
        const state$ = new StateObservable<ReduxState>(stateInput$, state);

        return fruitPaginationEpic(action$, state$, [])
            .pipe(toArray())
            .toPromise()
            // @ts-ignore
            .then((actions) => {
                expect(actions).toEqual([fruitPagination.actionCreators.requestPageFromCache({ page: 1 })]);
            });
    })
});
