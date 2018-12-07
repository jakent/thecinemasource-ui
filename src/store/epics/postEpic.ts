import { combineEpics, Epic, ofType } from 'redux-observable';
import {
    ActionCreators,
    FetchPhotosRequest,
    FetchPhotosSuccess,
    PostActions,
    PostActionTypes
} from '../actions/postActions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Post } from '../../domain/Posts';
import { Photo } from '../../domain/Photo';


const fetchPostsRequestEpic: Epic<PostActionTypes> = action$ =>
    action$.pipe(
        ofType(PostActions.FETCH_POST_REQUEST),
        mergeMap(() =>
            ajax.get('/api/posts', { 'Content-Type': 'application/json' })
                .pipe(
                    map((response: AjaxResponse) => ActionCreators.fetchPostsSuccess(response.response.results as Post[])),
                )
        ),
        catchError(e => of(ActionCreators.postsError(e)))
    );

const fetchPhotosRequestEpic: Epic<PostActionTypes> = action$ =>
    action$.pipe(
        // @ts-ignore
        ofType<FetchPhotosRequest>(PostActions.FETCH_PHOTOS_REQUEST),
        mergeMap((a: FetchPhotosRequest) =>
            ajax.get(`/api/photographs?post=${a.payload}`, { 'Content-Type': 'application/json' })
                .pipe(
                    map((response: AjaxResponse) => ActionCreators.fetchPhotosSuccess(response.response.results as Photo[])),
                )
        ),
        catchError(e => of(ActionCreators.postsError(e)))
    );


export const postEpic = combineEpics(
  fetchPostsRequestEpic, fetchPhotosRequestEpic,
);
