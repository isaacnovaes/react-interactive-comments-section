import React from "react";
import CommentSection from "../CommentSection/CommentSection";
import styles from "./ReplySection.module.scss";

export default function ReplySection({ replies, isReplyOfReply }) {
	return (
		<div className={styles.ReplyCard}>
			<div className={styles.replyBar}></div>
			<div className={styles.replies}>
				<>
					{replies.map(reply => {
						return (
							<React.Fragment key={reply.id}>
								<CommentSection
									userID={reply.id}
									user={reply.user}
									createdAt={reply.createdAt}
									content={reply.content}
									score={reply.score}
									currentScore={reply.currentScore}
									isReplyOfReply={isReplyOfReply}
								/>
								{reply.replies?.length > 0 && (
									<ReplySection
										replies={reply.replies}
										isReplyOfReply={false}
									/>
								)}
							</React.Fragment>
						);
					})}
				</>
			</div>
		</div>
	);
}
