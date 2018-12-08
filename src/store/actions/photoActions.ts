import { Action, ErrorAction, PayloadAction } from './ActionTypes';
import { Photo } from '../../domain/Photo';

/*
 * action types
 */
export enum PhotoActions {
    BLAH = 'photos/blah',
    FETCH_PHOTOS_REQUEST = 'photos/fetch/REQUEST',
    FETCH_PHOTOS_SUCCESS = 'photos/fetch/SUCCESS',
    PHOTO_ERROR = 'photo/ERROR',
}

export type Blah = Action<PhotoActions.BLAH>;
export type FetchPhotosRequest = PayloadAction<PhotoActions.FETCH_PHOTOS_REQUEST, string>;
export type FetchPhotosSuccess = PayloadAction<PhotoActions.FETCH_PHOTOS_SUCCESS, Photo[]>;
export type PhotosError = ErrorAction<PhotoActions.PHOTO_ERROR>;

export type PhotoActionTypes = FetchPhotosRequest | FetchPhotosSuccess | PhotosError | Blah;

/*
 * action creators
 */
export const PhotoActionCreators = {
    fetchPhotosRequest(postId: string): FetchPhotosRequest {
        return { type: PhotoActions.FETCH_PHOTOS_REQUEST, payload: postId };
    },
    fetchPhotosSuccess(payload: Photo[]): FetchPhotosSuccess {
        return { type: PhotoActions.FETCH_PHOTOS_SUCCESS, payload };
    },
    photosError(error: Error): PhotosError {
        return { type: PhotoActions.PHOTO_ERROR, error };
    },
};
