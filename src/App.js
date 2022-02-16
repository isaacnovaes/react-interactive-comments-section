import styles from "./App.module.scss";
import AppContainer from "./AppContainer/AppContainer";
import CommentCard from "./CommentCard/CommentCard";

function App() {
	const obj = {
		id: 1,
		content:
			"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
		createdAt: "1 month ago",
		score: 12,
		user: {
			image: {
				png: "./images/avatars/image-amyrobson.png",
				webp: "./images/avatars/image-amyrobson.webp",
			},
			username: "amyrobson",
		},
		replies: [],
	};

	return (
		<div className={styles.app}>
			<AppContainer>
				<CommentCard
					user={obj.user}
					content={obj.content}
					score={obj.score}
					createdAt={obj.createdAt}
				/>
			</AppContainer>
		</div>
	);
}

export default App;
