import React, { useState, useEffect } from "react";
import styles from "./App.module.scss";
import AppContainer from "./AppContainer/AppContainer";
import CommentCard from "./CommentCard/CommentCard";

function App() {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		const fetchInitialUsersData = async () => {
			const response = await fetch("./data.json");
			const data = await response.json();
			setComments(data.comments);
		};

		fetchInitialUsersData();
	}, []);

	return (
		<div className={styles.app}>
			<AppContainer>
				{comments.length &&
					comments.map(comment => (
						<CommentCard
							key={comment.id}
							user={comment.user}
							content={comment.content}
							score={comment.score}
							createdAt={comment.createdAt}
							replies={comment.replies}
						/>
					))}
			</AppContainer>
		</div>
	);
}

export default App;
