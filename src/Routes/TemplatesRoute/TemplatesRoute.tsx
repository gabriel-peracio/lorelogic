import React from "react";
import styles from "./TemplatesRoute.module.scss";

export type TemplatesRouteProps = {};

export const TemplatesRoute: React.FC<TemplatesRouteProps> = (props) => {
  // const {} = props;
  return <div className={styles.TemplatesRoute}>Hello from TemplatesRoute</div>;
};
