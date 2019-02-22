import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/styles.scss";

import AppRouter from "./routers/AppRouter";
import configureStore from "./store/config";

library.add(faMoon, faSun, faCopyright);

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById("app"),
);
