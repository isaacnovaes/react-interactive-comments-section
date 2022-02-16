import React from "react";
import styles from "./AddComment.module.scss";

export default function AddComment({ user, type }) {
	return (
		<div className={styles.AddComment}>
			<textarea
				name="comment"
				id="comment"
				cols="30"
				rows="5"
				placeholder="Add a comment..."
			></textarea>
			<img src={user.image.webp} alt="Current user avatar" />
			<button type="button">{type}</button>
		</div>
	);
}
