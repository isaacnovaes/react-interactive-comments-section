import React from "react";
import UserDescription from "./UserDescription/UserDescription";
import Comment from "./Comment/Comment";
import ShowVote from "./ShowVote/ShowVote";
import Reply from "./Reply/Reply";
import styles from "./CommentSection.module.scss";

export default function CommentSection({ user, createdAt, content, score }) {
	return (
		<div className={styles.CommentSection}>
			<UserDescription user={user} createdAt={createdAt} />
			<Comment content={content} />
			<ShowVote score={score} />
			<Reply />
		</div>
	);
}
