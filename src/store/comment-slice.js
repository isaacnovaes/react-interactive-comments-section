import { createSlice } from "@reduxjs/toolkit";

const initialCommentState = {
	currentUser: [],
	comments: [],
	deleteComment: null,
};

const commentSlice = createSlice({
	name: "comment",
	initialState: initialCommentState,
	reducers: {
		updateCommentsState(state, action) {
			state.currentUser = action.payload.currentUser;
			state.comments = action.payload.comments;
		},
		addComment(state, action) {
			state.comments.push(action.payload);
		},
		takeCommentID(state, action) {
			state.deleteComment = action.payload;
		},
		resetDeleteCommentID(state) {
			state.deleteComment = null;
		},
		updateVote(state, action) {
			state.comments = state.comments.map(comment => {
				if (comment.id === action.payload.id) {
					// check comments
					return {
						...comment,
						currentScore: comment.currentScore + action.payload.vote,
					};
				} else {
					if (!comment.replies.length > 0) return comment;

					comment.replies = comment.replies.map(reply => {
						if (reply.id === action.payload.id)
							// check comment replies
							return {
								...reply,
								currentScore: reply.currentScore + action.payload.vote,
							};
						else {
							if (!reply.replies?.length > 0) return reply;

							reply.replies = reply.replies.map(replyOfReply => {
								if (replyOfReply.id === action.payload.id)
									// check replies of a comment reply
									return {
										...replyOfReply,
										currentScore:
											replyOfReply.currentScore + action.payload.vote,
									};
								else return replyOfReply;
							});

							return reply;
						}
					});

					return comment;
				}
			});
		},
		removeComment(state, action) {
			state.comments = state.comments
				.filter(comment => comment.id !== action.payload)
				.map(comment => {
					if (!comment.replies.length) return comment; // avoid filtering the replies if the comment doesn't have a reply
					comment.replies = comment.replies.filter(
						reply => reply.id !== action.payload
					);
					return comment;
				})
				.map(comment => {
					if (!comment.replies.length) return comment;

					comment.replies = comment.replies.map(replies => {
						if (!replies.replies?.length) return replies;

						replies.replies = replies.replies.filter(
							reply => reply.id !== action.payload
						);

						return replies;
					});

					return comment;
				});
			state.deleteComment = null; // reset state
		},
		addReply(state, action) {
			state.comments = state.comments.map(comment => {
				if (comment.id === action.payload.replyToID) {
					return {
						...comment,
						replies: [...comment.replies, action.payload.comment],
					};
				} else {
					return {
						...comment,
						replies: comment.replies.map(reply => {
							if (reply.id === action.payload.replyToID)
								return {
									...reply,
									replies: [...reply.replies, action.payload.comment],
								};
							else return reply;
						}),
					};
				}
			});
		},
		editComment(state, action) {
			state.comments = state.comments.map(comment => {
				if (comment.id === action.payload.id) {
					// check comments
					return { ...comment, content: action.payload.content };
				} else {
					if (!comment.replies.length > 0) return comment;

					comment.replies = comment.replies.map(reply => {
						if (reply.id === action.payload.id)
							// check comment replies
							return { ...reply, content: action.payload.content };
						else {
							if (!reply.replies?.length > 0) return reply;

							reply.replies = reply.replies.map(replyOfReply => {
								if (replyOfReply.id === action.payload.id)
									// check replies of a comment reply
									return {
										...replyOfReply,
										content: action.payload.content,
									};
								else return replyOfReply;
							});

							return reply;
						}
					});

					return comment;
				}
			});
		},
	},
});

export default commentSlice;
export const commentSliceAction = commentSlice.actions;
