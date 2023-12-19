import React, { PropsWithChildren, useState } from "react";
import styles from "./TabAccordion.module.scss";
import clsx from "clsx";

export type TabAccordionProps = {
  children: React.ReactElement<TabAccordionTabProps>[];
  tabPosition?: "right";
};
export type TabAccordionTabProps = PropsWithChildren<{
  title: any;
}>;

export const _TabAccordion: React.FC<TabAccordionProps> = ({ children, tabPosition = "right" }) => {
  const [currentTab, setCurrentTab] = useState<number | null>(null);
  const handleTabClick = (idx: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    setCurrentTab((currentTab) => (currentTab === idx ? null : idx));
  };
  return (
    <div className={clsx(styles.TabAccordion, styles[tabPosition])}>
      {React.Children.map(children, (child, idx) => {
        return (
          <div className={styles.tab} onClick={handleTabClick(idx)}>
            {child.props.title}
          </div>
        );
      })}
      {currentTab !== null && (
        <div className={styles.tabContents}>
          {(React.Children.toArray(children)[currentTab] as React.ReactElement<TabAccordionTabProps>).props.children}
        </div>
      )}
    </div>
  );
};

export const TabAccordion = Object.assign(_TabAccordion, {
  Tab: (props: TabAccordionTabProps) => null,
});
