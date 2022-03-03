import React from "react";
import CommentSection from "./CommentSection/CommentSection";
import ReplySection from "./RepliesSection/ReplySection";

export default function CommentCard({
	userID,
	user,
	content,
	score,
	currentScore,
	createdAt,
	replies,
}) {
	return (
		<React.Fragment>
			<CommentSection
				userID={userID}
				user={user}
				createdAt={createdAt}
				content={content}
				score={score}
				currentScore={currentScore}
			/>

			{replies.length > 0 && (
				<ReplySection replies={replies} isReplyOfReply={false} />
			)}
		</React.Fragment>
	);
}
