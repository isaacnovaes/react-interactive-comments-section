import React from "react";

const commentsDataContext = React.createContext({
	currentUser: [],
	comments: [],
	addComment: item => {},
	removeComment: item => {},
	addReply: (replyToID, item) => {},
});

export default commentsDataContext;
