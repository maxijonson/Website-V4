import * as React from "react";
import { Dispatch } from "redux";
import { store } from "src/app";
import { Utils } from "src/modules";

export * from "./useStyled";

// NOTE: Hard to test performance since we only have 1 state (theme)
export const useMapState = <S extends {}>(
    mapState: (state: IStoreState) => S,
) => {
    const error = React.useRef(null);
    const derivedState = React.useRef<S>(mapState(store.getState()));
    const forceUpdate = useForceUpdate();

    React.useLayoutEffect(() => {
        let hasUnsubbed = false;

        const unsubscribe = store.subscribe(() => {
            if (hasUnsubbed) {
                return;
            }
            try {
                const newState = mapState(store.getState());
                if (!Utils.shallowEqual(newState, derivedState.current)) {
                    derivedState.current = newState;
                    forceUpdate();
                }
            } catch (e) {
                error.current = e;
                forceUpdate();
            }
        });

        return () => {
            hasUnsubbed = true;
            unsubscribe();
        };
    }, []);

    if (error.current) {
        throw error.current;
    }

    return derivedState.current;
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

export const usePortal = (parent: HTMLElement, className?: string) => {
    const el = React.useRef(document.createElement("div"));
    el.current.className = className || "";
    React.useEffect(() => {
        parent.appendChild(el.current);

        return () => el.current.remove();
    }, []);
    return el.current;
};
