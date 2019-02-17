import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/styles.scss";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/config";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById("app"),
);
