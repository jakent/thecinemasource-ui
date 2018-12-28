import { combineEpics, Epic, ofType } from 'redux-observable';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { of } from 'rxjs';
import { Photo } from '../../domain/Photo';
import { PhotoActionCreators, FetchPhotosRequest, PhotoActions, PhotoActionTypes } from '../reducers/photoReducer';

const fetchPhotosRequestEpic: Epic<PhotoActionTypes> = action$ =>
    action$.pipe(
        // @ts-ignore
        ofType<FetchPhotosRequest>(PhotoActions.FETCH_PHOTOS_REQUEST),
        mergeMap((a: FetchPhotosRequest) =>
            ajax.get(`/api/photographs?post=${a.payload}`, { 'Content-Type': 'application/json' })
                .pipe(
                    map((response: AjaxResponse) => PhotoActionCreators.fetchPhotosSuccess(response.response.results as Photo[])),
                )
        ),
        catchError(e => of(PhotoActionCreators.photosError(e)))
    );


export const photoEpic = combineEpics(
  fetchPhotosRequestEpic,
);
