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
				comments: [...state.comments, action.comment],
			};
		case "removeComment":
			return {
				currentUser: state.currentUser,
				comments: state.comments
					.filter(comment => comment.id !== action.commentId)
					.map(comment => {
						if (!comment.replies.length) return comment; // avoid filtering the replies if the comment doesn't have a reply
						comment.replies = comment.replies.filter(
							reply => reply.id !== action.commentId
						);
						return comment;
					})
					.map(comment => {
						if (!comment.replies.length) return comment;

						comment.replies = comment.replies.map(replies => {
							if (!replies.replies?.length) return replies;

							replies.replies = replies.replies.filter(
								reply => reply.id !== action.commentId
							);

							return replies;
						});

						return comment;
					}),
			};
		case "addReply":
			return {
				currentUser: state.currentUser,
				comments: state.comments.map(comment => {
					if (comment.id === action.replyToID) {
						return {
							...comment,
							replies: [...comment.replies, action.comment],
						};
					} else {
						return {
							...comment,
							replies: comment.replies.map(reply => {
								if (reply.id === action.replyToID)
									return {
										...reply,
										replies: [...reply.replies, action.comment],
									};
								else return reply;
							}),
						};
					}
				}),
			};

		case "editComment":
			return {
				currentUser: state.currentUser,
				comments: state.comments.map(comment => {
					if (comment.id === action.id) {
						return { ...comment, content: action.content };
					} else {
						if (!comment.replies.length > 0) return comment;

						comment.replies = comment.replies.map(reply => {
							if (reply.id === action.id)
								return { ...reply, content: action.content };
							else {
								if (!reply.replies?.length > 0) return reply;

								reply.replies = reply.replies.map(replyOfReply => {
									if (replyOfReply.id === action.id)
										return {
											...replyOfReply,
											content: action.content,
										};
									else return replyOfReply;
								});

								return reply;
							}
						});

						return comment;
					}
				}),
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
		addReply: (replyToID, comment) =>
			dispatch({ type: "addReply", replyToID, comment }),
		editID: ({ id, content }) => dispatch({ type: "editComment", id, content }),
	};

	return (
		<commentsDataContext.Provider value={data}>
			{props.children}
		</commentsDataContext.Provider>
	);
};

export default CommentsDataProvider;
