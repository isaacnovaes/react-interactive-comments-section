import React, { useContext } from "react";
import styles from "./UserDescription.module.scss";
import stylesCard from "../CommentSection.module.scss";
import commentsDataContext from "../../../context/commentsData-context";

export default function UserDescription({ user, createdAt }) {
	const { currentUser } = useContext(commentsDataContext);

	const classes = `${styles.UserDescription} ${stylesCard.firstGridControl}`;

	return (
		<div className={classes}>
			<img
				src={user.image.webp}
				alt="User avatar"
				className={styles.userAvatar}
			></img>
			<span className={styles.userName}>{user.username}</span>
			{currentUser.username === user.username && (
				<span className={styles.currentUser}>you</span>
			)}
			<span className={styles.commentDate}>{createdAt}</span>
		</div>
	);
}
