import { Reducer } from 'redux';
import { PhotoActions, PhotoActionTypes } from '../actions/photoActions';
import { Photo } from '../../domain/Photo';

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
