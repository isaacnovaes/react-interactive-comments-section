import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./reset.module.scss";
import CommentsDataProvider from "./context/CommentsDataProvider.js";

ReactDOM.render(
	<React.StrictMode>
		<CommentsDataProvider>
			<App />
		</CommentsDataProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
