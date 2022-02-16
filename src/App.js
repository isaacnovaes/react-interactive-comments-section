import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import AppContainer from "./AppContainer/AppContainer";
import CommentCard from "./CommentCard/CommentCard";
import AddComment from "./AddComment/AddComment";

function App() {
	const [allComments, setAllComments] = useState(null);

	useEffect(() => {
		const fetchInitialUsersData = async () => {
			const response = await fetch("./data.json");
			const data = await response.json();
			setAllComments(data);
		};

		fetchInitialUsersData();
	}, []);

	return (
		allComments && (
			<div className={styles.app}>
				<AppContainer>
					{allComments.comments.length &&
						allComments.comments.map(comment => (
							<CommentCard
								key={comment.id}
								user={comment.user}
								content={comment.content}
								score={comment.score}
								createdAt={comment.createdAt}
								replies={comment.replies}
							/>
						))}
					<AddComment user={allComments.currentUser} type="Send" />
				</AppContainer>
			</div>
		)
	);
}

export default App;
