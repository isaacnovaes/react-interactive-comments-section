import React from "react";

const commentsDataContext = React.createContext({
	currentUser: [],
	comments: [],
	addComment: item => {},
	removeComment: item => {},
});

export default commentsDataContext;
