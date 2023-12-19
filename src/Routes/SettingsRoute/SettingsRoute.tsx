import React, { useState } from "react";
import styles from "./SettingsRoute.module.scss";
import { Tabs } from "Components";
import { Settings } from "./Components/Settings/Settings";

export type SettingsRouteProps = {};

export const SettingsRoute: React.FC<SettingsRouteProps> = (props) => {
  const [searchSettingsInput, setSearchSettingsInput] = useState("");
  return (
    <div className={styles.SettingsRoute}>
      <div className={styles.searchSettings}>
        <input
          type="search"
          name="search settings"
          id=""
          className={styles.settingsSearchInput}
          placeholder="Search Settings"
          value={searchSettingsInput}
          onChange={(e) => setSearchSettingsInput(e.target.value)}
        />
      </div>
      <Tabs>
        <Tabs.Tab title="User">
          <Settings />
        </Tabs.Tab>
        <Tabs.Tab title="Workspace"></Tabs.Tab>
      </Tabs>
    </div>
  );
};
