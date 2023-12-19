import React, { PropsWithChildren, useMemo } from "react";
import { isElement, isValidElementType } from "react-is";
import { AtLeast } from "ts-toolbelt/out/Object/AtLeast";
import styles from "./Prompt.module.scss";
import { useClickOutside, useKeyboardEvent } from "@react-hookz/web";
import { Button } from "Components";
import { ReactComponent as CloseIcon } from "assets/icons/streamline/bold/interface-essential/close.svg";
import clsx from "clsx";

export type PromptProps = {
  className?: string;
  children?: React.ReactNode;
  blurBackground?: boolean;
  transparentBackground?: boolean;
} & (
  | {
      dismissable?: false;
      onDismiss?: never;
    }
  | {
      dismissable: ("closeButton" | "clickOutside" | "escKey")[];
      onDismiss: () => void;
    }
);

type childSlots = {
  Header: null | React.ReactNode;
  Footer:
    | null
    | React.ReactNode
    | AtLeast<{
        left: null | React.ReactNode;
        right: null | React.ReactNode;
      }>;
};

export const _Prompt: React.FC<PromptProps> = ({
  children,
  className,
  blurBackground = true,
  transparentBackground = false,
  dismissable,
  onDismiss,
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const childSlots = useMemo(() => {
    const childSlots: childSlots = {
      Header: null,
      Footer: null,
    };
    React.Children.forEach(children, (child) => {
      const childName = isElement(child) && typeof child.type === "function" ? child.type.name : null;
      console.log(`childName: "${childName}"`);
      switch (childName) {
        case "Header": {
          const _child = child as React.ReactElement<HeaderProps>;
          if (childSlots.Header) throw new Error("Prompt can only have one Header");
          childSlots.Header = _child.props.children;
          break;
        }
        case "Content":
          break;
        case "Footer": {
          const _child = child as React.ReactElement<FooterProps>;
          if (_child.props.slot) {
            childSlots.Footer = {
              ...((typeof childSlots.Footer === "object" ? childSlots.Footer : {}) as {
                left: React.ReactNode;
                right: React.ReactNode;
              }),
              [_child.props.slot]: _child.props.children,
            };
          } else {
            childSlots.Footer = _child.props.children;
          }

          break;
        }
        default:
          break;
      }
    });
    return childSlots;
  }, [children]);

  useKeyboardEvent(dismissable && dismissable.includes("escKey") ? "Escape" : null, () => {
    onDismiss?.();
  });

  useClickOutside(containerRef, () => {
    if (dismissable && dismissable.includes("clickOutside")) onDismiss?.();
  });

  return (
    <div
      className={clsx(
        styles.Prompt,
        { [styles.blurBackground]: blurBackground, [styles.transparentBackground]: transparentBackground },
        className,
      )}
    >
      <div className={styles.container} ref={containerRef}>
        {dismissable && dismissable.includes("closeButton") && (
          <Button size="s" variant="ghost" className={styles.closeBtn} onClick={() => onDismiss?.()}>
            <CloseIcon width={12} height={12} />
          </Button>
        )}
        {childSlots.Header && <div className={styles.header}>{childSlots.Header}</div>}
        <div className={styles.content}>{children}</div>
        {childSlots.Footer && isValidElementType(childSlots.Footer) && (
          <div className={styles.footer}>{childSlots.Footer}</div>
        )}
        {childSlots.Footer &&
          typeof childSlots.Footer === "object" &&
          ("left" in childSlots.Footer || "right" in childSlots.Footer) && (
            <>
              {"left" in childSlots.Footer && <div className={styles.footerLeft}>{childSlots.Footer.left}</div>}
              {"right" in childSlots.Footer && <div className={styles.footerRight}>{childSlots.Footer.right}</div>}
            </>
          )}
      </div>
    </div>
  );
};

type HeaderProps = PropsWithChildren;
type FooterProps = PropsWithChildren<{ slot?: "left" | "right" }>;

export const Prompt: React.FC<PromptProps> & {
  Header: React.FC<HeaderProps>;
  Footer: React.FC<FooterProps>;
} = Object.assign(_Prompt, {
  Header: () => null,
  Footer: () => null,
});
