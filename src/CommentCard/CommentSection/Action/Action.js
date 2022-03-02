import React from "react";
import styles from "./Action.module.scss";
import stylesCard from "../CommentSection.module.scss";
import Delete from "./Delete";
import Edit from "./Edit";
import Reply from "./Reply";
import { useSelector } from "react-redux";

export default function Action({ userID, user, replyTo, editID }) {
	const currentUser = useSelector(state => state.comment.currentUser);

	const classes = `${styles.Action} ${stylesCard.forthGridControl}`;

	const renderAction =
		currentUser.username === user.username ? (
			<>
				<Delete userID={userID} />

				<Edit userID={userID} editID={editID} />
			</>
		) : (
			<Reply userID={userID} replyTo={replyTo} />
		);

	return <div className={classes}>{renderAction}</div>;
}
