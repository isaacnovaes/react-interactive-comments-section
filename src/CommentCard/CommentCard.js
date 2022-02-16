import React from "react";
import CommentSection from "./CommentSection/CommentSection";
import ReplySection from "./RepliesSection/ReplySection";

export default function CommentCard({
	user,
	content,
	score,
	createdAt,
	replies,
}) {
	return (
		<React.Fragment>
			<CommentSection
				user={user}
				createdAt={createdAt}
				content={content}
				score={score}
			/>

			{replies.length > 0 && <ReplySection replies={replies} />}
		</React.Fragment>
	);
}
