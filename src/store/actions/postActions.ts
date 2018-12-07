import { Action } from 'redux';
import { ErrorAction, PayloadAction } from '../actions/ActionTypes';
import { Post } from '../../domain/Posts';
import { Photo } from '../../domain/Photo';

/*
 * action types
 */
export enum PostActions {
    FETCH_POST_REQUEST = 'post/fetch/REQUEST',
    FETCH_POST_SUCCESS = 'post/fetch/SUCCESS',
    FETCH_PHOTOS_REQUEST = 'photos/fetch/REQUEST',
    FETCH_PHOTOS_SUCCESS = 'photos/fetch/SUCCESS',
    POSTS_ERROR = 'post/ERROR',
}

export type FetchPostRequest = Action<PostActions.FETCH_POST_REQUEST>;
export type FetchPostsSuccess = PayloadAction<PostActions.FETCH_POST_SUCCESS, Post[]>;
export type FetchPhotosRequest = PayloadAction<PostActions.FETCH_PHOTOS_REQUEST, string>;
export type FetchPhotosSuccess = PayloadAction<PostActions.FETCH_PHOTOS_SUCCESS, Photo[]>;
export type PostsError = ErrorAction<PostActions.POSTS_ERROR>;

export type PostActionTypes = FetchPostRequest | FetchPostsSuccess |
    FetchPhotosRequest | FetchPhotosSuccess | PostsError;

/*
 * action creators
 */
export const ActionCreators = {
    fetchPostsRequest(): FetchPostRequest {
        return { type: PostActions.FETCH_POST_REQUEST };
    },
    fetchPostsSuccess(payload: Post[]): FetchPostsSuccess {
        return { type: PostActions.FETCH_POST_SUCCESS, payload };
    },
    fetchPhotosRequest(postId: string): FetchPhotosRequest {
        return { type: PostActions.FETCH_PHOTOS_REQUEST, payload: postId };
    },
    fetchPhotosSuccess(payload: Photo[]): FetchPhotosSuccess {
        return { type: PostActions.FETCH_PHOTOS_SUCCESS, payload };
    },
    postsError(error: Error): PostsError {
        return { type: PostActions.POSTS_ERROR, error };
    },
};
