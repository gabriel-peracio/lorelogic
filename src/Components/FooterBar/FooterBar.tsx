import React from "react";
import styles from "./FooterBar.module.scss";
import clsx from "clsx";
import { ReactComponent as BellIcon } from "assets/icons/streamline/micro-solid/interface-essential/alarm-bell-2.svg";
import { ReactComponent as DisabledLockIcon } from "assets/icons/streamline/micro-solid/interface-essential/disabled-lock.svg";
import { ReactComponent as DollarCircleIcon } from "assets/icons/streamline/micro-solid/money-shopping/dollar-circle.svg";
import { ReactComponent as CloudTransferIcon } from "assets/icons/streamline/micro-solid/programming/cloud-data-transfer.svg";
import { Button } from "Components";
import { Telemetry } from "./Components/Telemetry/Telemetry";
import { Cloud } from "./Components/Cloud/Cloud";

export type FooterBarProps = {
  className?: string;
};

export const FooterBar: React.FC<FooterBarProps> = ({ className }) => {
  return (
    <footer className={clsx(styles.FooterBar, className)}>
      <div className={styles.start}>
        <Button size="s" variant="ghost" id="FooterBtnCredits">
          <DollarCircleIcon width={12} />
        </Button>
        <Cloud />
      </div>
      <div className={styles.end}>
        <Telemetry />
        <Button size="s" variant="ghost" id="FooterBtnEncryption">
          <DisabledLockIcon width={12} />
        </Button>
        <Button size="s" variant="ghost" id="FooterBtnNotification">
          <BellIcon width={12} />
        </Button>
      </div>
    </footer>
  );
};
