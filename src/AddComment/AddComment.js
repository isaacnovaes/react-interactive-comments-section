import React, { useState, useRef, useContext } from "react";
import styles from "./AddComment.module.scss";
import commentsDataContext from "../context/commentsData-context";

export default function AddComment({ user, type }) {
	const comment = useRef("");
	const [error, setError] = useState(false);

	const context = useContext(commentsDataContext);

	const showError = () => setTimeout(() => setError(false), 2500);

	const showComment = () => {
		if (comment.current.value.trim() === "") {
			setError(true);
			showError();
			return;
		}

		context.addComment({
			id: Math.random(),
			content: comment.current.value.trim(),
			createdAt: "1 month ago",
			score: 0,
			user: context.currentUser,
			replies: [],
		});

		comment.current.value = "";
	};

	return (
		<div className={`${styles.AddComment} ${error && styles.AddCommentError}`}>
			<textarea
				name="comment"
				id="comment"
				cols="30"
				rows="5"
				placeholder="Add a comment..."
				ref={comment}
			></textarea>
			<img src={user.image.webp} alt="Current user avatar" />
			<button type="button" onClick={showComment}>
				{type}
			</button>
		</div>
	);
}
