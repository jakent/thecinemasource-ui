import { Action, ErrorAction, PayloadAction } from './ActionTypes';
import { Post } from '../../domain/Post';

/*
 * action types
 */
export enum PostActions {
    FETCH_POST_REQUEST = 'post/fetch/REQUEST',
    FETCH_POST_SUCCESS = 'post/fetch/SUCCESS',
    POSTS_ERROR = 'post/ERROR',
}

export type FetchPostRequest = Action<PostActions.FETCH_POST_REQUEST>;
export type FetchPostsSuccess = PayloadAction<PostActions.FETCH_POST_SUCCESS, Post[]>;
export type PostsError = ErrorAction<PostActions.POSTS_ERROR>;

export type PostActionTypes = FetchPostRequest | FetchPostsSuccess | PostsError;

/*
 * action creators
 */
export const PostActionCreators = {
    fetchPostsRequest(): FetchPostRequest {
        return { type: PostActions.FETCH_POST_REQUEST };
    },
    fetchPostsSuccess(payload: Post[]): FetchPostsSuccess {
        return { type: PostActions.FETCH_POST_SUCCESS, payload };
    },
    postsError(error: Error): PostsError {
        return { type: PostActions.POSTS_ERROR, error };
    },
};
