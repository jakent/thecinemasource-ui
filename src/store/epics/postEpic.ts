import { combineEpics, Epic, ofType } from 'redux-observable';
import {
    PostActionCreators,
    PostActions,
    PostActionTypes
} from '../actions/postActions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Post } from '../../domain/Post';


const fetchPostsRequestEpic: Epic<PostActionTypes> = action$ =>
    action$.pipe(
        ofType(PostActions.FETCH_POST_REQUEST),
        mergeMap(() =>
            ajax.get('/api/posts', { 'Content-Type': 'application/json' })
                .pipe(
                    map((response: AjaxResponse) => PostActionCreators.fetchPostsSuccess(response.response.results as Post[])),
                )
        ),
        catchError(e => of(PostActionCreators.postsError(e)))
    );

export const postEpic = combineEpics(
  fetchPostsRequestEpic
);
