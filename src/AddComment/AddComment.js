import React, { useState, useRef, useContext } from "react";
import styles from "./AddComment.module.scss";
import commentsDataContext from "../context/commentsData-context";

export default function AddComment({ replyToID, type, className }) {
	const comment = useRef("");
	const [error, setError] = useState(false);

	const context = useContext(commentsDataContext);

	const showError = () => setTimeout(() => setError(false), 2500);

	const addCommentHandler = () => {
		if (comment.current.value.trim() === "") {
			setError(true);
			showError();
			return;
		}

		if (!replyToID) {
			context.addComment({
				id: Math.random() * 100,
				content: comment.current.value.trim(),
				createdAt: "1 month ago",
				score: 0,
				user: context.currentUser,
				replies: [],
			});
		}

		if (replyToID) {
			context.addReply(replyToID, {
				id: Math.random() * 100,
				content: comment.current.value.trim(),
				createdAt: "1 month ago",
				score: 0,
				replyingTo: "hello",
				user: context.currentUser,
			});
		}

		comment.current.value = "";
	};

	return (
		<div
			className={`${styles.AddComment} ${
				error && styles.AddCommentError
			} ${className}`}
		>
			<textarea
				name="comment"
				id="comment"
				cols="30"
				rows="5"
				placeholder="Add a comment..."
				ref={comment}
			></textarea>
			<img src={context.currentUser.image.webp} alt="Current user avatar" />
			<button type="button" onClick={addCommentHandler}>
				{type}
			</button>
		</div>
	);
}
