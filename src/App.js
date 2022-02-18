import React, { useContext } from "react";
import styles from "./App.module.scss";
import AppContainer from "./AppContainer/AppContainer";
import CommentCard from "./CommentCard/CommentCard";
import AddComment from "./AddComment/AddComment";
import commentsDataContext from "./context/commentsData-context";

function App() {
	const { comments } = useContext(commentsDataContext);

	const showComments = () => (
		<>
			{comments.map(comment => (
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
			<AddComment type="Send" replyToID={null} />
		</>
	);

	return (
		<div className={styles.app}>
			<AppContainer>{comments?.length && showComments()}</AppContainer>
		</div>
	);
}

export default App;
