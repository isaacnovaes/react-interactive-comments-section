import React, { useState, useContext } from "react";
import UserDescription from "./UserDescription/UserDescription";
import Comment from "./Comment/Comment";
import ShowVote from "./ShowVote/ShowVote";
import Action from "./Action/Action";
import styles from "./CommentSection.module.scss";
import AddCommentSection from "../AddCommentSection/AddCommentSection.js";
import commentsDataContext from "../../context/commentsData-context";

export default function CommentSection({
	userID,
	user,
	createdAt,
	content,
	score,
	isReplyOfReply,
}) {
	const [showTextArea, setShowTextArea] = useState(false);
	const [showEditArea, setShowEditArea] = useState(false);

	const [replyToID, setReplyToID] = useState(null);
	const [editIDOf, setEditIDOf] = useState(null);

	const context = useContext(commentsDataContext);

	const replyTo = ID => {
		setReplyToID(ID);
		setShowTextArea(true);
	};

	const editID = ID => {
		setEditIDOf(ID);
		setShowEditArea(true);
	};

	const replyOfReply = isReplyOfReply => {
		if (!isReplyOfReply) {
			return (
				<>
					<Action
						userID={userID}
						user={user}
						replyTo={replyTo}
						editID={editID}
					/>
					{showTextArea && (
						<AddCommentSection
							replyToID={replyToID}
							type={"Reply"}
							className={styles.fifthGridControl}
							onShowTestArea={setShowTextArea}
						/>
					)}
					{showEditArea && (
						<AddCommentSection
							editID={editIDOf}
							type={"Update"}
							className={styles.fifthGridControl}
							onShowEditArea={setShowEditArea}
						/>
					)}
				</>
			);
		}

		if (context.currentUser.username === user.username) {
			return (
				<Action userID={userID} user={user} replyTo={replyTo} editID={editID} />
			);
		}
	};

	return (
		<div className={styles.CommentSection}>
			<UserDescription user={user} createdAt={createdAt} />
			<Comment content={content} />
			<ShowVote score={score} />
			{replyOfReply(isReplyOfReply)}
		</div>
	);
}
