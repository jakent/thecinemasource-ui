import { combineEpics, Epic, ofType } from 'redux-observable';
import {
    PostActionCreators,
    PostActions,
    PostActionTypes
} from '../actions/postActions';
import { catchError, flatMap, map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Post } from '../../domain/Post';
import { postPaginator } from '../index';
import { PageActions, PageActionTypes } from '../actions/createPaginatorActions';
import { ResultSet } from '../../domain/ResultSet';


const fetchPostsRequestEpic: Epic<PageActionTypes<Post>, PostActionTypes & PageActionTypes<Post>> = action$ =>
    // @ts-ignore TODO: figure out later why this isnt compiling
    action$.pipe(
        ofType(PageActions.REQUEST_PAGE),
        mergeMap(() =>
            ajax.get('/api/posts', { 'Content-Type': 'application/json' })
                .pipe(
                    flatMap((response: AjaxResponse) => [
                        PostActionCreators.fetchPostsSuccess(response.response.results as Post[]),
                        postPaginator.actionCreators.receivePage({...response.response, page: 0})
                    ]),
                )
        ),
        catchError(e => of(PostActionCreators.postsError(e)))
    );

export const postEpic = combineEpics(
  fetchPostsRequestEpic
);
