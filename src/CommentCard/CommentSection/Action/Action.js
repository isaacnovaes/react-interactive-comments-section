import React, { useContext } from "react";
import styles from "./Action.module.scss";
import stylesCard from "../CommentSection.module.scss";
import Delete from "./Delete";
import Edit from "./Edit";
import Reply from "./Reply";
import commentsDataContext from "../../../context/commentsData-context";

export default function Action({ userID, user }) {
	const { currentUser } = useContext(commentsDataContext);

	const classes = `${styles.Action} ${stylesCard.forthGridControl}`;

	const renderAction =
		currentUser.username === user.username ? (
			<>
				<Delete userID={userID} />

				<Edit userID={userID} />
			</>
		) : (
			<Reply />
		);

	return <div className={classes}>{renderAction}</div>;
}