import { useLocalStorage } from 'react-use';

/**
 * ///////////////////////////////////////
 * // Configure local settings options. //
 * ///////////////////////////////////////
 */
export interface LocalSettingsConfig {
  HAS_VIEWED_HOW_IT_WORKS: boolean;
  UPDATE_LATER_ON_VERSION: string;
  COLOR_SCHEME: 'auto' | 'light' | 'dark';
}

/** /////////// end config //////////// */

export type LocalSettingName = keyof LocalSettingsConfig;

/**
 * Retrieve a stored setting.
 */
export function getSetting<K extends LocalSettingName>(name: K): LocalSettingsConfig[K] | null {
  const [rawValue] = useLocalStorage<LocalSettingsConfig[K]>(name);
  return rawValue ?? null;
}

/**
 * Save a setting value.
 */
export function saveSetting<K extends LocalSettingName>(
  name: K,
  rawValue: LocalSettingsConfig[K],
): void {
  const [, setValue] = useLocalStorage<LocalSettingsConfig[K]>(name);
  setValue(rawValue);
}

/**
 * Clear a setting value and returns the value that was removed.
 */
export async function clearSetting<K extends LocalSettingName>(
  name: K,
): Promise<LocalSettingsConfig[K] | null> {
  const [value, , remove] = useLocalStorage<LocalSettingsConfig[K]>(name);
  remove();
  return value ?? null;
}

export default { getSetting, saveSetting, clearSetting };
