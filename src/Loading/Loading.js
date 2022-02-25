import React from "react";
import styles from "./Loading.module.scss";
import spinner from "./Eclipse-0.4s-200px.svg";

export default function Loading() {
	return (
		<div className={styles.LoadingContainer}>
			<img src={spinner} alt="Loading spinner" />
		</div>
	);
}
