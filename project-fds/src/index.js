import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import ScrollFix from "./components/ScrollFix/ScrollFix";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./reducers";
import { AUTH_USER } from "./actions/types";

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(reduxThunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

const token = localStorage.getItem("token");
// if we have a token, consiger the user to be signed in
if (token) {
	// we need to update application state
	store.dispatch({ type: AUTH_USER });
}
const app = (
	<Provider store={store}>
		<BrowserRouter>
			<ScrollFix>
				<App />
			</ScrollFix>
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
