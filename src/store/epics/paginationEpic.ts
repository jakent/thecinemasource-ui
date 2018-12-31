import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { catchError, flatMap, mergeMap, tap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { ItemsState, ReduxState } from 'src/store';
import {
    PageActions,
    PageActionTypes,
    PageInfo,
    PaginationActionCreators,
    RequestPage
} from 'src/store/reducers/paginationReducer';
import { iif, of } from 'rxjs';

export function createPaginationEpic<T extends { id: number }>(key: keyof ItemsState, actionCreators: PaginationActionCreators<T>) {

    const hasFetchedPage = (state$: StateObservable<ReduxState>): boolean => {
        console.log('state$.value.pagination', state$.value.pagination[key], state$.value.pagination[key].requestedPage)
        const pageInfo: PageInfo | undefined = state$.value.pagination[key][state$.value.pagination[key].requestedPage];

        return pageInfo ? !pageInfo.fetching : false;
    };

    const fetchPageFromServer = (action: RequestPage) =>
        ajax.get(`/api/${key}?offset=${20 * action.payload.page}`, { 'Content-Type': 'application/json' })
            .pipe(
                tap(item => console.log(action)),
                flatMap((response: AjaxResponse) => [
                    actionCreators.receivePage({ ...response.response, page: action.payload.page })
                ]),
            );

    const fetchPageFromStore = (action: RequestPage) =>
        of(actionCreators.requestPageFromCache({ page: action.payload.page }));

    const fetchPageRequestEpic: Epic<PageActionTypes<T>, PageActionTypes<T>, ReduxState> = (action$, state$) =>
        action$.pipe(
            // @ts-ignore TODO: figure out later why this isn't compiling
            ofType(PageActions.REQUEST_PAGE),
            mergeMap((action: RequestPage) =>
                iif(
                    () => hasFetchedPage(state$),
                    fetchPageFromStore(action),
                    fetchPageFromServer(action),
                )
            ),
            catchError(e => of(actionCreators.pageError(e)))
        );

    return combineEpics(
        fetchPageRequestEpic
    );

}
