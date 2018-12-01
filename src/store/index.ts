import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { postEpic } from '../store/epics/postEpic';
import { postReducer, PostState } from '../store/reducers/postReducer';
import { ActionCreators } from '../store/actions/postActions';
import { AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


const epicMiddleware = createEpicMiddleware();

export interface ReduxState {
    post: PostState
}

const devToolsOptions = {
    actionCreators: { ...ActionCreators},
};

export const store: Store<ReduxState, AnyAction> = createStore(
    combineReducers({
        post: postReducer,
    }),
    composeWithDevTools(devToolsOptions)(applyMiddleware(
        epicMiddleware,
    )),
);

epicMiddleware.run(combineEpics(postEpic));
