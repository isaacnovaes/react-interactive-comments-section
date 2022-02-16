import React from "react";
import styles from "./UserDescription.module.scss";

export default function UserDescription({ user, createdAt, className }) {
	const classes = `${className} ${styles.UserDescription}`;

	return (
		<div className={classes}>
			<img
				src={user.image.webp}
				alt="User avatar"
				className={styles.userAvatar}
			></img>
			<span className={styles.userName}>{user.username}</span>
			<span className={styles.commentDate}>{createdAt}</span>
		</div>
	);
}
