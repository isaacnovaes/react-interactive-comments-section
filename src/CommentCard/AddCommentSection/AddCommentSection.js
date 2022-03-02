import React, { useState, useRef } from "react";
import styles from "./AddCommentSection.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { commentAction } from "../../store/comment-slice";

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

	const showError = () => setTimeout(() => setError(false), 2500);

	const cancelReplyHandler = () => onShowTestArea(false);
	const cancelEditHandler = () => onShowEditArea(false);

	const currentUser = useSelector(state => state.comment.currentUser);
	const dispatch = useDispatch();

	const addCommentHandler = () => {
		if (comment.current.value.trim() === "") {
			setError(true);
			showError();
			return;
		}

		if (!replyToID) {
			dispatch(
				commentAction.addComment({
					id: Math.random() * 100,
					content: comment.current.value.trim(),
					createdAt: "now",
					score: 0,
					user: currentUser,
					replies: [],
				})
			);
		}

		if (replyToID) {
			dispatch(
				commentAction.addReply({
					replyToID,
					comment: {
						id: Math.random() * 100,
						content: comment.current.value.trim(),
						createdAt: "now",
						score: 0,
						replyingTo: "hello",
						user: currentUser,
					},
				})
			);
			// CHECK THIS ONE
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
			dispatch(
				commentAction.editComment({
					id: editID,
					content: comment.current.value.trim(),
				})
			);
			onShowEditArea(false);
		}
		comment.current.value = "";
	};

	const reply = (
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

	const update = (
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
			<img src={currentUser.image.webp} alt="Current user avatar" />
			{type === "Send" && (
				<button
					type="button"
					onClick={addCommentHandler}
					className={styles.ReplyButton}
				>
					{type}
				</button>
			)}
			{type === "Reply" && reply}
			{type === "Update" && update}
		</div>
	);
}
