import { Action, PayloadAction } from './ActionTypes';
import { ResultSet } from '../../domain/ResultSet';
import { Reducer } from 'redux';

/*
 * action types
 */
export enum PageActions {
    REQUEST_PAGE = 'page/fetch/REQUEST',
    RECEIVE_PAGE = 'page/fetch/SUCCESS',
    BLAH = 'blah',
}

export type Blah = Action<PageActions.BLAH>;
export type RequestPage = PayloadAction<PageActions.REQUEST_PAGE, { page: number }>;
export type ReceivePage<T extends { id: number }> = PayloadAction<PageActions.RECEIVE_PAGE, ResultSet<T> & { page: number }>;

export type PageActionTypes<T extends { id: number }> = RequestPage | ReceivePage<T> | Blah;

export interface ItemState<T extends { id: number }> {
    [key: number]: T
}

export interface PageInfo {
    ids: number[],
    fetching: boolean
}

export interface PageState {
    [key: number]: PageInfo
    currentPage: number
}

const initialState: PageState = {
    currentPage: 0
};

export function createPaginator<T extends { id: number }>() {

    /*
     * action creators
     */
    const PageActionCreators = {
        requestPage(payload: { page: number }): RequestPage {
            return { type: PageActions.REQUEST_PAGE, payload };
        },
        receivePage(payload: ResultSet<T> & { page: number }): ReceivePage<T> {
            return { type: PageActions.RECEIVE_PAGE, payload };
        },
    };


    const pageReducer: Reducer<PageState> = (state = initialState, action: PageActionTypes<T>) => {

        switch (action.type) {
            case PageActions.REQUEST_PAGE:
                return {
                    ...state,
                    [action.payload.page]: {
                        ids: [],
                        fetching: true
                    }
                };
            case PageActions.RECEIVE_PAGE:
                return {
                    ...state,
                    [action.payload.page]: {
                        ids: action.payload.results.map(item => item.id),
                        fetching: false
                    },
                    currentPage: action.payload.page
                };
            case PageActions.BLAH:
            default:
                return state
        }

    };

    const itemsReducer: Reducer<ItemState<T>> = (items = {}, action: PageActionTypes<T>) => {
        switch (action.type) {
            case PageActions.RECEIVE_PAGE:
                let _items = {}
                for (let item of action.payload.results) {
                    _items = {
                        ..._items,
                        [item.id]: item
                    }
                }
                return {
                    ...items,
                    ..._items
                }
            default:
                return items
        }
    };

    return {
        reducer: pageReducer,
        itemsReducer: itemsReducer,
        actionCreators: PageActionCreators
    };

}
