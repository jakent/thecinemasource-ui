import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { postEpic } from './epics/postEpic';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { photoReducer, PhotoState, PhotoActionCreators } from './reducers/photoReducer';
import { photoEpic } from './epics/photoEpic';
import { createPaginator, ItemState, PageState } from './reducers/createPaginatorActions';
import { Post } from '../domain/Post';




export const postPaginator = createPaginator<Post>();



export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export interface ReduxState {
    posts: ItemState<Post>;
    photo: PhotoState;
    pagination: {
        post: PageState
    };
    router: RouterState;
}

const devToolsOptions = {
    actionCreators: { ...postPaginator.actionCreators, ...PhotoActionCreators},
};

export const store: Store<ReduxState, AnyAction> = createStore(
    combineReducers({
        posts: postPaginator.itemsReducer,
        photo: photoReducer,
        pagination: combineReducers({
            post: postPaginator.reducer,
        }),
        router: connectRouter(history),
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        routerMiddleware(history),
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(postEpic, photoEpic));
