import React from "react";
import styles from "./Comment.module.scss";
import stylesCard from "../CommentSection.module.scss";

export default function Comment({ content }) {
	const classes = `${styles.Comment} ${stylesCard.secondGridControl}`;
	return <p className={classes}>{content}</p>;
}
