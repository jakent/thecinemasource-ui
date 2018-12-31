import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createPaginationEpic } from './epics/paginationEpic';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { photoReducer, PhotoState, PhotoActionCreators } from './reducers/photoReducer';
import { photoEpic } from './epics/photoEpic';
import { createPagination, ItemState, PageState } from './reducers/paginationReducer';
import { Post } from 'src/domain/Post';

export interface ItemsState {
    posts: ItemState<Post>;
    photo: PhotoState;
}

export interface ReduxState extends ItemsState {
    pagination: {
        [P in keyof ItemsState]: PageState
    };
    router: RouterState;
}

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export const postPagination = createPagination<Post>();
const paginationEpic = createPaginationEpic<Post>('posts', postPagination.actionCreators);

const devToolsOptions = {
    actionCreators: { ...postPagination.actionCreators, ...PhotoActionCreators},
};

// @ts-ignore TODO: Do we want to paginate photos?
export const store: Store<ReduxState, AnyAction> = createStore(
    combineReducers({
        posts: postPagination.itemsReducer,
        photo: photoReducer,
        pagination: combineReducers({
            posts: postPagination.paginationReducer,
        }),
        router: connectRouter(history),
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        routerMiddleware(history),
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(paginationEpic, photoEpic));
