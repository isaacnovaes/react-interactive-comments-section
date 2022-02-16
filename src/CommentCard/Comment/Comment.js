import React from "react";
import styles from "./Comment.module.scss";

export default function Comment({ content, className }) {
	const classes = `${className} ${styles.Comment}`;
	return <p className={classes}>{content}</p>;
}
