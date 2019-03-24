import * as React from "react";
import { store } from "src/app";
import { Utils } from "src/modules";

export const useMapState = <S extends {}>(
    mapState: (state: IStoreState) => S,
) => {
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

// export const useConnect = <S extends {}, D extends {}>(
//     mapState?: (state: IStoreState) => S,
//     mapDispatch?: (dispatch: Dispatch<any>) => D,
// ) => {

// };
