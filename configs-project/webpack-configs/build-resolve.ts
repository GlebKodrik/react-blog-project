import { scriptExtensions } from './constants/variables';
import { PATHS } from './constants/path';

export const buildResolve = () => ({
  extensions: scriptExtensions,
  alias: {},
  preferAbsolute: true,
  modules: [PATHS.SRC_FOLDER, 'node_modules'],
  mainFiles: ['index'],
});
