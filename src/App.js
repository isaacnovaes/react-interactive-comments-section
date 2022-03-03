import React, { useEffect } from "react";
import styles from "./App.module.scss";
import AppContainer from "./AppContainer/AppContainer";
import CommentCard from "./CommentCard/CommentCard";
import AddCommentSection from "./CommentCard/AddCommentSection/AddCommentSection";
import Loading from "./Loading/Loading";
import Modal from "./Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { uiSliceAction } from "./store/ui-slice";
import { commentSliceAction } from "./store/comment-slice";

let firstRender = true;

function App() {
	const isLoading = useSelector(state => state.ui.loading);
	const showModal = useSelector(state => state.ui.showModal);
	const comments = useSelector(state => state.comment.comments);
	const dispatch = useDispatch();

	const globalState = useSelector(state => state);

	useEffect(() => {
		const fetchInitialUsersData = async () => {
			const response = await fetch("./data.json");
			const data = await response.json();

			const appData = {
				currentUser: data.currentUser,
				comments: data.comments,
			};

			if (!localStorage.getItem("globalState")) {
				dispatch(commentSliceAction.updateCommentsState(appData));
				localStorage.setItem("globalState", JSON.stringify(appData));
			}

			if (localStorage.getItem("globalState")) {
				dispatch(
					commentSliceAction.updateCommentsState(
						JSON.parse(localStorage.getItem("globalState"))
					)
				);
			}

			setTimeout(() => dispatch(uiSliceAction.setLoading(false), 1000));
		};

		fetchInitialUsersData();
	}, [dispatch]);

	useEffect(() => {
		if (firstRender) {
			firstRender = false;
			return;
		}

		const { currentUser, comments } = globalState.comment;
		const appData = {
			currentUser,
			comments,
		};
		localStorage.setItem("globalState", JSON.stringify(appData));
	}, [globalState]);

	const showComments = (
		<>
			{isLoading && <Loading />}
			{!isLoading &&
				comments.length > 0 &&
				comments.map(comment => (
					<CommentCard
						key={comment.id}
						userID={comment.id}
						user={comment.user}
						content={comment.content}
						score={comment.score}
						createdAt={comment.createdAt}
						replies={comment.replies}
					/>
				))}
			{!isLoading && comments.length > 0 && (
				<AddCommentSection type="Send" replyToID={null} />
			)}
		</>
	);

	return (
		<>
			<div className={styles.app}>
				<AppContainer>{showComments}</AppContainer>
				{showModal && <Modal />}
			</div>
		</>
	);
}

export default App;
