import React, { Fragment } from "react";
import styles from "./KeybindsRoute.module.scss";
import { keybindGroups } from "./keybindList";
import { startCase } from "lodash";
import { keybindPrompt } from "Components/Prompt/keybindPrompt";

export type KeybindsRouteProps = {};

export const KeybindsRoute: React.FC<KeybindsRouteProps> = (props) => {
  const changeKeybind = (identifier: string) => async () => {
    const newKeybind = await keybindPrompt("Enter new keybind");
  };
  return (
    <div className={styles.KeybindsRoute}>
      {Object.entries(keybindGroups).map(([keybindGroup, keybinds]) => {
        return (
          <Fragment key={keybindGroup}>
            <h3 className={styles.groupTitle}>{keybindGroup.split(".").map(startCase).join(" › ")}</h3>

            {keybinds.map((keybind) => {
              const shortcut = keybind.default.split("+").flatMap((key, idx, keyArray) => {
                if (keyArray.length === 1) return key;
                const isLast = idx === keyArray.length - 1;
                if (!isLast)
                  return [
                    <kbd key={`k-${idx}`}>{key}</kbd>,
                    <span key={`s-${idx}`} className={styles.plus}>
                      +
                    </span>,
                  ];
                return <kbd key={`k-${idx}`}>{key}</kbd>;
              });
              return (
                <div className={styles.row} key={keybind.identifier}>
                  <div className={styles.command} title={keybind.identifier}>
                    {keybind.description}
                  </div>
                  <kbd onClick={changeKeybind(keybind.identifier)}>{shortcut}</kbd>
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};
