import React, { PropsWithChildren, useMemo, useState } from "react";
import styles from "./HoverTooltip.module.scss";
import { uniqueId } from "lodash";
import clsx from "clsx";

export type HoverTooltipProps = {
  children: [React.ReactElement<AnchorProps>, React.ReactElement<TooltipProps>];
};

export const _HoverTooltip: React.FC<HoverTooltipProps> = ({ children }) => {
  const [AnchorChild, TooltipChild] = children;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };
  const handleMouseLeave = (e: React.MouseEvent) => {
    if (e.relatedTarget === tooltipRef.current || tooltipRef.current?.contains(e.relatedTarget as Node)) return;
    setIsTooltipVisible(false);
  };

  const anchorName = useMemo(() => `--${uniqueId("hover-tooltip-anchor-")}`, []);

  return (
    <div className={styles.HoverTooltip}>
      <div
        className={styles.anchor}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ anchorName: anchorName } as React.CSSProperties}
      >
        {AnchorChild}
      </div>
      <div
        className={clsx(styles.tooltip, { [styles.visible]: isTooltipVisible }, TooltipChild.props.className)}
        ref={tooltipRef}
        onMouseLeave={handleMouseLeave}
        style={
          {
            anchorDefault: anchorName,
            ...(TooltipChild.props.offset === undefined ? {} : { "--offset": `${TooltipChild.props.offset}px` }),
          } as React.CSSProperties
        }
      >
        {TooltipChild}
      </div>
    </div>
  );
};

export type AnchorProps = any;
export type TooltipProps = PropsWithChildren<{ className?: string; offset?: number }>;

export const HoverTooltip = Object.assign(_HoverTooltip, {
  Anchor: (({ children }) => children) as React.FC<AnchorProps>,
  Tooltip: (({ children }) => children) as React.FC<TooltipProps>,
});
