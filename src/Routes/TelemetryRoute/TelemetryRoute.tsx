import React from "react";
import styles from "./TelemetryRoute.module.scss";

export type TelemetryRouteProps = {};

export const TelemetryRoute: React.FC<TelemetryRouteProps> = (props) => {
  // const {} = props;
  return <div className={styles.TelemetryRoute}>Hello from TelemetryRoute</div>;
};
