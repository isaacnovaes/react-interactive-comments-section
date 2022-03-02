import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { commentSliceAction } from "../store/comment-slice";
import { uiSliceAction } from "../store/ui-slice";
import styles from "./Modal.module.scss";

export default function Modal() {
	const dispatch = useDispatch();

	const deleteCommentID = useSelector(state => state.comment.deleteComment);

	const scrollModalIntoView = element => {
		element.scrollIntoView({
			behavior: "smooth",
			block: "center",
			inline: "center",
		});
	};

	// If you want to run some code when React attaches or detaches a ref to a DOM node, you may want to use a callback ref instead.
	// callback ref
	const modalRef = useCallback(section => {
		if (section !== null) {
			scrollModalIntoView(section);
		}
	}, []);

	const cancelHandler = () => {
		dispatch(uiSliceAction.setShowModal(false));
		dispatch(commentSliceAction.resetDeleteCommentID());
	};

	const deleteHandler = () => {
		dispatch(commentSliceAction.removeComment(deleteCommentID));
		dispatch(uiSliceAction.setShowModal(false));
	};

	return (
		<div className={styles.ModalBackDrop}>
			<section className={styles.Modal} ref={modalRef}>
				<h1>Delete comment</h1>
				<p>
					Are sure you want to delete this comment? This will remove the comment
					and can't be undone
				</p>
				<div className={styles.ModalButtonsContainer}>
					<button
						type="button"
						className={styles.Cancel}
						onClick={cancelHandler}
					>
						No, cancel
					</button>
					<button
						type="button"
						className={styles.Delete}
						onClick={deleteHandler}
					>
						Yes, delete
					</button>
				</div>
			</section>
		</div>
	);
}
