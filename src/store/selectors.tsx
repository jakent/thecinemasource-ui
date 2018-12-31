import { createSelector } from 'reselect'
import { ItemState, PageInfo, PageState } from './reducers/paginationReducer';
import { Post } from 'src/domain/Post';
import { ReduxState } from './index';

const pages = (state: ReduxState) => state.pagination.posts;
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

export const doesCurrentPageHaveNext = createSelector(
    [getCurrentPagedInfo, posts],
    (page: PageInfo | undefined): boolean => {
        return page ? page.hasNext : false
    }
);

export const doesCurrentPageHavePrev = createSelector(
    [getCurrentPagedInfo, posts],
    (page: PageInfo | undefined): boolean => {
        return page ? page.hasPrev : false
    }
);
