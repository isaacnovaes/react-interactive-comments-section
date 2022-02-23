import React, { useState } from "react";
import UserDescription from "./UserDescription/UserDescription";
import Comment from "./Comment/Comment";
import ShowVote from "./ShowVote/ShowVote";
import Action from "./Action/Action";
import styles from "./CommentSection.module.scss";
import AddCommentSection from "../AddCommentSection/AddCommentSection.js";

export default function CommentSection({
	userID,
	user,
	createdAt,
	content,
	score,
}) {
	const [showTextArea, setShowTextArea] = useState(false);
	const [replyToID, setReplyToID] = useState(null);

	const replyTo = ID => {
		setReplyToID(ID);
		setShowTextArea(true);
	};

	return (
		<div className={styles.CommentSection}>
			<UserDescription user={user} createdAt={createdAt} />
			<Comment content={content} />
			<ShowVote score={score} />
			<Action userID={userID} user={user} replyTo={replyTo} />
			{showTextArea && (
				<AddCommentSection
					replyToID={replyToID}
					type={"Reply"}
					className={styles.fifthGridControl}
					onShowTestArea={setShowTextArea}
				/>
			)}
		</div>
	);
}
