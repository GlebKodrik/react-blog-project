import { TThemes } from 'types/themes';

export type TUseTheme = {
  toggleTheme?: () => void,
  theme?: TThemes,
  changeTheme?: (themeName: TThemes) => void
};
