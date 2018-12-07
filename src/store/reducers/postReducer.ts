import { Reducer } from 'redux';
import { PostActions, PostActionTypes } from '../actions/postActions';
import { Post } from '../../domain/Posts';
import { Photo } from '../../domain/Photo';

export interface PostState {
    posts: Post[],
    photos: Photo[],
    loading: boolean
}

export const initialState = {
    posts: [],
    photos: [],
    loading: false,
};

export const postReducer: Reducer<PostState> = (state = initialState, action: PostActionTypes) => {
    switch (action.type) {
        case PostActions.FETCH_POST_REQUEST:
        case PostActions.FETCH_PHOTOS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PostActions.FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case PostActions.FETCH_PHOTOS_SUCCESS:
            return {
                ...state,
                photos: action.payload,
                loading: false,
            };
        case PostActions.POSTS_ERROR:
            return {
                ...state,
                error: JSON.stringify(action.error, Object.getOwnPropertyNames(action.error)),
                inFlight: false,
            };
        default:
            return state;
    }
};
