import { combineEpics, Epic, ofType } from 'redux-observable';
import { flatMap, mergeMap, tap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { Post } from '../../domain/Post';
import { postPaginator } from '../index';
import { PageActions, PageActionTypes, RequestPage } from '../reducers/createPaginatorActions';


const fetchPostsRequestEpic: Epic<PageActionTypes<Post>, PageActionTypes<Post>> = action$ =>
    action$.pipe(
    // @ts-ignore TODO: figure out later why this isnt compiling
        ofType(PageActions.REQUEST_PAGE),
        mergeMap((action: RequestPage) =>
            ajax.get(`/api/posts?offset=${20 * action.payload.page}`, { 'Content-Type': 'application/json' })
                .pipe(
                    tap(item => console.log(action)),
                    flatMap((response: AjaxResponse) => [
                        postPaginator.actionCreators.receivePage({...response.response, page: action.payload.page})
                    ]),
                )
        ),
        // catchError(e => of(PostActionCreators.postsError(e)))
    );

export const postEpic = combineEpics(
  fetchPostsRequestEpic
);
