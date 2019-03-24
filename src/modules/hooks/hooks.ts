import * as React from "react";
import { Dispatch } from "redux";
import { store } from "src/app";
import { Utils } from "src/modules";

// NOTE: Hard to test performance since we only have 1 state (theme)
export const useMapState = <S>(mapState: (state: IStoreState) => S) => {
    const initialState = React.useRef(mapState(store.getState()));
    const stateProps = React.useRef(initialState.current);
    React.useEffect(() => {
        let didUnsubscribe = false;
        const unsubscribe = store.subscribe(() => {
            if (didUnsubscribe) {
                return;
            }
            const newState = mapState(store.getState());
            if (!Utils.shallowEqual(stateProps.current, newState)) {
                stateProps.current = newState;
            }
        });
        return () => {
            didUnsubscribe = true;
            unsubscribe();
        };
    }, [store, mapState]);
    return stateProps.current;
};

export const useMapDispatch = <D>(
    mapDispatch: (dispatch: Dispatch<any>) => D,
) => {
    const initialDispatch = React.useRef(mapDispatch(store.dispatch));
    const dispatchProps = React.useRef(initialDispatch.current);

    return dispatchProps.current;
};

export const useConnect = <S extends {}, D extends {}>(
    mapState?: (state: IStoreState) => S,
    mapDispatch?: (dispatch: Dispatch<any>) => D,
) => {
    const stateProps = mapState ? useMapState(mapState) : {};
    const dispatchProps = mapDispatch ? useMapDispatch(mapDispatch) : {};
    return {
        ...stateProps,
        ...dispatchProps,
    } as S & D;
};

export const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return () => forceUpdate({});
};

export const usePortal = (parent: HTMLElement) => {
    const el = React.useRef(document.createElement("div"));
    React.useEffect(() => {
        parent.appendChild(el.current);

        return () => el.current.remove();
    }, []);
    return el.current;
};
