import clsx from "clsx";
import { forwardRef, PropsWithChildren } from "react";
import styles from "./Button.module.scss";

export type ButtonProps = PropsWithChildren<{
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  // size: 'xs'| 's' | 'm' | 'l' | 'xl';
  size?: "s" | "m";
  variant?: "none" | "primary" | "secondary" | "ghost";
  className?: string;
  id?: string;
}>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  const { onClick, disabled, children, size = "m", variant = "primary", className, id } = props;
  // useImperativeHandle(ref, () => ({

  // }));
  return (
    <button
      id={id}
      ref={ref}
      className={clsx(styles.Button, styles[`sz-${size}`], styles[`v-${variant}`], className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});
Button.displayName = "Button";
