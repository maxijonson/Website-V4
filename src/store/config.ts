import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { ITheme } from "src/modules/CSS/themes";
import { themesReducer } from "../reducers";

declare global {
    // tslint:disable-next-line: interface-name
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IStoreState {
    theme: ITheme;
}

export default () => {
    const store = createStore(
        combineReducers<IStoreState>({
            theme: themesReducer,
        }),
        composeEnhancers(applyMiddleware(thunk)),
    );
    return store;
};
