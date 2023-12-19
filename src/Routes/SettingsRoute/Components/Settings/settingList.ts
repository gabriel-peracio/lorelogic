export enum SettingType {
  Boolean = "boolean",
  Duration = "duration",
  Number = "number",
}

export type Setting = { identifier: string; description: string } & (
  | {
      type: SettingType.Boolean;
      default: boolean;
    }
  | {
      type: SettingType.Duration;
      default: string;
    }
  | {
      type: SettingType.Number;
      default: number;
    }
);

export const settingList = [
  {
    identifier: "editor.autocomplete.enabled",
    description: "Enable autocomplete",
    type: SettingType.Boolean,
    default: true,
  },
  {
    identifier: "editor.autocomplete.delay",
    description: "Time to wait before starting an autocomplete request",
    type: SettingType.Duration,
    default: "200ms",
  },
  {
    identifier: "editor.autocomplete.contextSize",
    description: "Maximum number of tokens before the current cursor position to send to the autocomplete server",
    type: SettingType.Number,
    default: 4000,
  },
  {
    identifier: "lorelogic.telemetry.enabled",
    description: "Enable telemetry - allow us to collect anonymous usage data",
    type: SettingType.Boolean,
    default: false,
  },
] as const satisfies Setting[];

export type settingIdentifier = (typeof settingList)[number]["identifier"];

export const settingGroups: { [key: string]: Setting[] } = Object.groupBy(
  settingList,
  (setting) => setting.identifier.split(".")[0],
);
