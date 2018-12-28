import { createSelector } from 'reselect'
import { ItemState, PageInfo, PageState } from './reducers/createPaginatorActions';
import { Post } from '../domain/Post';
import { ReduxState } from './index';

const pages = (state: ReduxState) => state.pagination.post;
const posts = (state: ReduxState) => state.posts;

export const getCurrentPagedInfo = createSelector(
    [pages, posts],
    (pages: PageState): PageInfo | undefined => {
        return pages[pages.currentPage]
    }
);

export const getCurrentPagePosts = createSelector(
    [getCurrentPagedInfo, posts],
    (page: PageInfo | undefined, posts: ItemState<Post>): Post[] => {
        return page ? page.ids.map(id => posts[id]) : []
    }
);
