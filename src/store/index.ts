import { createBrowserHistory } from 'history';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { postEpic } from '../store/epics/postEpic';
import { postReducer, PostState } from '../store/reducers/postReducer';
import { ActionCreators } from '../store/actions/postActions';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

export interface ReduxState {
    post: PostState;
    router: RouterState;
}

const devToolsOptions = {
    actionCreators: { ...ActionCreators},
};

export const store: Store<ReduxState, AnyAction> = createStore(
    combineReducers({
        post: postReducer,
        router: connectRouter(history),
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        routerMiddleware(history),
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(postEpic));
