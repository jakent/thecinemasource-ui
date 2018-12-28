import { combineEpics, Epic, ofType, StateObservable } from 'redux-observable';
import { catchError, flatMap, mergeMap, tap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Post } from '../../domain/Post';
import { postPaginator, ReduxState } from '../index';
import { PageActions, PageActionTypes, PageInfo, RequestPage } from '../reducers/createPaginatorActions';
import { EMPTY, iif, of } from 'rxjs';

const hasFetchedPage = (state$: StateObservable<ReduxState>): boolean => {
    const pageInfo: PageInfo | undefined = state$.value.pagination.post[state$.value.pagination.post.currentPage];

    console.log(pageInfo, pageInfo ? !pageInfo.fetching : false)
    return pageInfo ? !pageInfo.fetching : false;
};

const fetchPostsFromServer = (action: RequestPage) =>
    ajax.get(`/api/posts?offset=${20 * action.payload.page}`, { 'Content-Type': 'application/json' })
        .pipe(
            tap(item => console.log(action)),
            flatMap((response: AjaxResponse) => [
                postPaginator.actionCreators.receivePage({ ...response.response, page: action.payload.page })
            ]),
        );

const fetchPostsFromStore = () => EMPTY;

const fetchPostsRequestEpic: Epic<PageActionTypes<Post>, PageActionTypes<Post>, ReduxState> = (action$, state$) =>
    action$.pipe(
        // @ts-ignore TODO: figure out later why this isn't compiling
        ofType(PageActions.REQUEST_PAGE),
        mergeMap((action: RequestPage) =>
            iif(
                () => hasFetchedPage(state$),
                fetchPostsFromStore(),
                fetchPostsFromServer(action),
            )
        ),
        catchError(e => of(postPaginator.actionCreators.pageError(e)))
    );

export const postEpic = combineEpics(
    fetchPostsRequestEpic
);
