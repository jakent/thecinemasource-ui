import { Action, ErrorAction, PayloadAction } from './ActionTypes';
import { Photo } from 'src/domain/Photo';
import { Reducer } from 'redux';

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

export interface PhotoState {
    photos: Photo[],
    loading: boolean,
    error?: string,
}

export const initialState = {
    photos: [],
    loading: false,
};

export const photoReducer: Reducer<PhotoState> = (state = initialState, action: PhotoActionTypes) => {
    switch (action.type) {
        case PhotoActions.FETCH_PHOTOS_REQUEST:
            return {
                ...state,
                asdf: action.payload,
                loading: true,
            };
        case PhotoActions.FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload,
                loading: false,
            };
        case PhotoActions.PHOTO_ERROR:
            return {
                ...state,
                error: JSON.stringify(action.error, Object.getOwnPropertyNames(action.error)),
                loading: false,
            };
        case PhotoActions.BLAH: // TODO: I dont know why I need this
        default:
            return state;
    }
};
