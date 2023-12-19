import React from "react";
import styles from "./ProvidersRoute.module.scss";
import { ReactComponent as AddIcon } from "assets/icons/streamline/bold/interface-essential/add-bold.svg";
import clsx from "clsx";

export type ProvidersRouteProps = {};

export const ProvidersRoute: React.FC<ProvidersRouteProps> = (props) => {
  // const {} = props;
  return (
    <div className={styles.ProvidersRoute}>
      <h1>Cloud Providers</h1>
      <div className={styles.connectedProvidersList}>
        <div className={clsx(styles.card, styles.addNew)}>
          <AddIcon width={32} />
        </div>
        <div className={clsx(styles.card, styles.addNew)}>
          <AddIcon width={32} />
        </div>
        <div className={clsx(styles.card, styles.addNew)}>
          <AddIcon width={32} />
        </div>
        <div className={clsx(styles.card, styles.addNew)}>
          <AddIcon width={32} />
        </div>
      </div>
    </div>
  );
};
