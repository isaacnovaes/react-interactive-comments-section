import React from "react";

const commentsDataContext = React.createContext({
	isLoading: true,
	currentUser: [],
	comments: [],
	addComment: item => {},
	removeComment: item => {},
	addReply: (replyToID, item) => {},
	editID: (replyToID, item) => {},
});

export default commentsDataContext;
