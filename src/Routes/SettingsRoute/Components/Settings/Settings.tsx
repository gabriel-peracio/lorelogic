import React from "react";
import styles from "./Settings.module.scss";
import { settingGroups, Setting } from "./settingList";
import { drop, startCase } from "lodash";
import clsx from "clsx";

export type SettingsProps = {};

export const Settings: React.FC<SettingsProps> = (props) => {
  // const {} = props;

  const renderSetting = (setting: Setting) => {
    const settingTitle = drop(setting.identifier.split("."))
      .map((word) => startCase(word))
      .map((word, idx, words) => {
        const isLastWord = idx === words.length - 1;
        if (!isLastWord) {
          return <span className={styles.category}>{word}</span>;
        } else {
          return <span className={styles.name}>{word}</span>;
        }
      });
    switch (setting.type) {
      case "boolean":
        return (
          <div className={clsx(styles.setting, styles[setting.type])}>
            <div className={styles.identifier} title={setting.identifier}>
              {settingTitle}
            </div>
            <input type="checkbox" />
            <div className={styles.description}>{setting.description}</div>
          </div>
        );
      case "duration":
        return (
          <div className={clsx(styles.setting, styles[setting.type])}>
            <div className={styles.identifier} title={setting.identifier}>
              {settingTitle}
            </div>
            <div className={styles.description}>{setting.description}</div>
            <input type="text" value={setting.default} />
          </div>
        );
      case "number":
        return (
          <div className={clsx(styles.setting, styles[setting.type])}>
            <div className={styles.identifier} title={setting.identifier}>
              {settingTitle}
            </div>
            <div className={styles.description}>{setting.description}</div>
            <input type="text" value={setting.default} />
          </div>
        );
    }
  };

  return (
    <div className={styles.Settings}>
      {Object.entries(settingGroups).map(([settingGroup, settings]) => {
        return (
          <div className={styles.group}>
            <h3 className={styles.groupTitle}>{startCase(settingGroup)}</h3>
            {settings.map((setting) => renderSetting(setting))}
          </div>
        );
      })}
    </div>
  );
};
