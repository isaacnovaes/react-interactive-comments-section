import React, { useState, useRef, useContext } from "react";
import styles from "./AddCommentSection.module.scss";
import commentsDataContext from "../../context/commentsData-context";

export default function AddCommentSection({
	replyToID,
	editID,
	type,
	className,
	onShowTestArea,
	onShowEditArea,
}) {
	const comment = useRef("");
	const [error, setError] = useState(false);

	const context = useContext(commentsDataContext);

	const showError = () => setTimeout(() => setError(false), 2500);

	const cancelReplyHandler = () => onShowTestArea(false);
	const cancelEditHandler = () => onShowEditArea(false);

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

			onShowTestArea(false);
		}

		comment.current.value = "";
	};

	const updateCommentHandler = () => {
		if (comment.current.value.trim() === "") {
			setError(true);
			showError();
			return;
		}

		if (editID) {
			context.editID({ id: editID, content: comment.current.value.trim() });

			onShowEditArea(false);
		}

		comment.current.value = "";
	};

	const reply = () => (
		<>
			<button
				type="button"
				onClick={addCommentHandler}
				className={styles.ReplyButton}
			>
				{type}
			</button>

			<button
				type="button"
				onClick={cancelReplyHandler}
				className={styles.AdditionalButton}
			>
				Cancel
			</button>
		</>
	);

	const update = () => (
		<>
			<button
				type="button"
				onClick={updateCommentHandler}
				className={styles.ReplyButton}
			>
				{type}
			</button>

			<button
				type="button"
				onClick={cancelEditHandler}
				className={styles.AdditionalButton}
			>
				Cancel
			</button>
		</>
	);

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
			{type === "Send" && (
				<button
					type="button"
					onClick={addCommentHandler}
					className={styles.ReplyButton}
				>
					{type}
				</button>
			)}
			{type === "Reply" && reply()}
			{type === "Update" && update()}
		</div>
	);
}
