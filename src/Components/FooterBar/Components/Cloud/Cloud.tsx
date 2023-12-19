import { useRouter } from "@tanstack/react-router";
import { Button } from "Components";
import { HoverTooltip } from "Components/Tooltip/HoverTooltip";
import { ReactComponent as CloudTransferIcon } from "assets/icons/streamline/micro-solid/programming/cloud-data-transfer.svg";
import React from "react";
import styles from "./Cloud.module.scss";

export type CloudProps = {};

export const Cloud: React.FC<CloudProps> = (props) => {
  // const {} = props;
  const router = useRouter();

  return (
    <HoverTooltip>
      <HoverTooltip.Anchor>
        <Button size="s" variant="ghost" id="FooterBtnCloud" onClick={() => router.navigate({ to: "/providers" })}>
          <CloudTransferIcon width={12} />
        </Button>
      </HoverTooltip.Anchor>
      <HoverTooltip.Tooltip className={styles.tooltip}>
        <div>You are currently using one or more cloud providers to power inferencing.</div>
        <div>
          You can click on the icon to go to the providers page, where you can setup new providers or manage existing
          ones.
        </div>
      </HoverTooltip.Tooltip>
    </HoverTooltip>
  );
};
