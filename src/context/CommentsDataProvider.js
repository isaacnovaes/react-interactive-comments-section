import React, { useEffect, useReducer } from "react";
import commentsDataContext from "./commentsData-context";

const reducer = (state, action) => {
	switch (action.type) {
		case "fetch initial data":
			return {
				currentUser: action.currentUser,
				comments: action.comments,
			};
		case "addComment":
			return {
				currentUser: state.currentUser,
				comments: state.comments.push(action.comment),
			};
		case "removeComment":
			return {
				currentUser: state.currentUser,
				comments: state.comments.filter(
					comment => comment.id !== action.commentId
				),
			};
		default:
			return new Error("Something went wrong");
	}
};

const CommentsDataProvider = props => {
	const [state, dispatch] = useReducer(reducer, {});

	useEffect(() => {
		const fetchInitialUsersData = async () => {
			const response = await fetch("./data.json");
			const data = await response.json();
			dispatch({
				type: "fetch initial data",
				currentUser: data.currentUser,
				comments: data.comments,
			});
		};

		fetchInitialUsersData();
	}, []);

	const data = {
		currentUser: state.currentUser,
		comments: state.comments,
		addComment: comment => dispatch({ type: "addComment", comment }),
		removeComment: commentId => dispatch({ type: "removeComment", commentId }),
	};

	return (
		<commentsDataContext.Provider value={data}>
			{props.children}
		</commentsDataContext.Provider>
	);
};

export default CommentsDataProvider;
