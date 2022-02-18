import React from "react";
import CommentSection from "../CommentSection/CommentSection";
import styles from "./ReplySection.module.scss";

export default function ReplySection({ replies }) {
	return (
		<div className={styles.ReplyCard}>
			<div className={styles.replyBar}></div>
			<div className={styles.replies}>
				{replies.map(reply => (
					<CommentSection
						key={reply.id}
						userID={reply.id}
						user={reply.user}
						createdAt={reply.createdAt}
						content={reply.content}
						score={reply.score}
					/>
				))}
			</div>
		</div>
	);
}
