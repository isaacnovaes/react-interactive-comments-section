import React from "react";
import styles from "./CommentCard.module.scss";
import ShowVote from "./ShowVote/ShowVote";
import UserDescription from "./UserDescription/UserDescription";
import Comment from "./Comment/Comment";
import Reply from "./Reply/Reply";

export default function CommentCard({ user, content, score, createdAt }) {
	return (
		<div className={styles.CommentCard}>
			<UserDescription
				user={user}
				createdAt={createdAt}
				className={styles.firstGridControl}
			/>
			<Comment content={content} className={styles.secondGridControl} />
			<ShowVote score={score} className={styles.thirdGridControl} />
			<Reply className={styles.forthGridControl} />
		</div>
	);
}
