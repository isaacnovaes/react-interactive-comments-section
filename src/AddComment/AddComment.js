import React, { useState, useRef } from "react";
import styles from "./AddComment.module.scss";

export default function AddComment({ user, type }) {
	const comment = useRef("");
	const [error, setError] = useState(false);

	const showError = () => setTimeout(() => setError(false), 2500);

	const showComment = () => {
		if (comment.current.value.trim() === "") {
			setError(true);
			showError();
			return;
		}
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
