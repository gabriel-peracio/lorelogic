import React, { PropsWithChildren, useState } from "react";
import styles from "./Tabs.module.scss";
import clsx from "clsx";
import { Direction, directionMap } from "types/Direction";
import { extractClassName } from "utils/className";
import { AtLeast } from "ts-toolbelt/out/Object/AtLeast";

export type TabsProps = {
  children: Array<React.ReactElement<TabProps> | Array<React.ReactElement<TabProps>>>;
  position?: Direction;
  className?: string | AtLeast<{ main: string; tabs: string }>;
  onTabChange?: (tabIndex: number) => void;
};

export const _Tabs: React.FC<TabsProps> = (props) => {
  const { children, position = Direction.TOP, className: _className, onTabChange } = props;
  const [currentTab, setCurrentTab] = useState(0);

  const currentTabChildren = (() => {
    const _children = children.flat()[currentTab];
    return Array.isArray(_children) ? _children[0] : _children;
  })();

  const handleTabClick = (idx: number) => () => {
    if (idx === currentTab) return;
    onTabChange?.(idx);
    setCurrentTab(idx);
  };

  const { main: mainClassName, tabs: tabsClassName } = extractClassName(_className);

  const tabClasses = children.flat().map((child) => {
    const { tab: tabClassName, content: contentClassName } = extractClassName(child.props.className);
    return { tab: tabClassName, content: contentClassName };
  });
  return (
    <div className={clsx(styles.Tabs, styles[directionMap[position]], mainClassName)}>
      <div className={clsx(styles.content, tabClasses[currentTab].content)}>{currentTabChildren.props.children}</div>
      <div className={clsx(styles.tabs, tabsClassName)}>
        {React.Children.map(children, (_tab, idx) => {
          const tab = Array.isArray(_tab) ? _tab[0] : _tab;
          return (
            <div
              className={clsx(styles.tab, tabClasses[idx].tab)}
              aria-current={currentTab === idx}
              onClick={handleTabClick(idx)}
            >
              {tab.props.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type TabProps = PropsWithChildren<{
  className?: string | AtLeast<{ tab: string; content: string }>;
  title: string | React.ReactElement;
}>;

export const Tabs = Object.assign(_Tabs, {
  Tab: (props: TabProps) => null,
});
