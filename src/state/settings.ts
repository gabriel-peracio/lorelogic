import { signal } from "@preact/signals-react";
import { settingIdentifier, settingList } from "Routes/SettingsRoute/Components/Settings/settingList";

export const settings = signal(
  Object.fromEntries(settingList.map(({ identifier, default: value }) => [identifier, value])) as Record<
    settingIdentifier,
    any
  >,
);
