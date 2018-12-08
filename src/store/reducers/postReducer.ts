import { Reducer } from 'redux';
import { PostActions, PostActionTypes } from '../actions/postActions';
import { Post } from '../../domain/Post';

export interface PostState {
    posts: Post[],
    loading: boolean,
    error?: string,
}

export const initialState = {
    posts: [],
    loading: false,
};

export const postReducer: Reducer<PostState> = (state = initialState, action: PostActionTypes) => {
    switch (action.type) {
        case PostActions.FETCH_POST_REQUEST:
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
        case PostActions.POSTS_ERROR:
            return {
                ...state,
                error: JSON.stringify(action.error, Object.getOwnPropertyNames(action.error)),
                loading: false,
            };
        default:
            return state;
    }
};
