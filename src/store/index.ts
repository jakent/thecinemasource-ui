import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { postEpic } from './epics/postEpic';
import { postReducer, PostState } from './reducers/postReducer';
import { PostActionCreators } from './actions/postActions';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';
import { photoReducer, PhotoState } from './reducers/photoReducer';
import { photoEpic } from './epics/photoEpic';
import { PhotoActionCreators } from './actions/photoActions';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export interface ReduxState {
    post: PostState;
    photo: PhotoState;
    router: RouterState;
}

const devToolsOptions = {
    actionCreators: { ...PostActionCreators, ...PhotoActionCreators},
};

export const store: Store<ReduxState, AnyAction> = createStore(
    combineReducers({
        post: postReducer,
        photo: photoReducer,
        router: connectRouter(history),
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        routerMiddleware(history),
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(postEpic, photoEpic));
