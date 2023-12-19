import { Button, HoverTooltip } from "Components";
import { ReactComponent as SatelliteIcon } from "assets/icons/streamline/micro-solid/interface-essential/satellite.svg";
import React from "react";
import { settings } from "state/settings";
import styles from "./Telemetry.module.scss";
import { Link, useRouter } from "@tanstack/react-router";
import clsx from "clsx";

export type TelemetryProps = {};

export const Telemetry: React.FC<TelemetryProps> = (props) => {
  const router = useRouter();
  const isTelemetryEnabled = settings.value["lorelogic.telemetry.enabled"];

  return (
    <HoverTooltip>
      <HoverTooltip.Anchor>
        <Button size="s" variant="ghost" id="FooterBtnTelemetry" onClick={() => router.navigate({ to: "/telemetry" })}>
          <SatelliteIcon width={12} color={isTelemetryEnabled ? "currentColor" : "red"} />
        </Button>
      </HoverTooltip.Anchor>
      <HoverTooltip.Tooltip className={styles.tooltip}>
        {isTelemetryEnabled ? (
          <div className={clsx(styles.statusBox, styles.telemetryEnabled)}>
            We are collecting anonymous usage data to improve the app.
            <br />
            Thank you for opting in!
          </div>
        ) : (
          <div className={clsx(styles.statusBox, styles.telemetryDisabled)}>
            We are not sending any telemetry (not even anonymous usage data).
            <br />
            We get it!
          </div>
        )}

        <div>
          You can disable this in the{" "}
          <Link to={"/settings"} search={{ identifier: "lorelogic.telemetry.enabled" }}>
            settings
          </Link>
          .
        </div>
        <div>
          You can also click on the icon itself to go to the telemetry page, where you can see what data we sent so far.
        </div>
      </HoverTooltip.Tooltip>
    </HoverTooltip>
  );
};
