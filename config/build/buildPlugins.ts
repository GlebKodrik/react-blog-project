import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  WebpackPluginInstance,
  DefinePlugin,
  HotModuleReplacementPlugin,
} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from './types/types';

const WebpackBar = require('webpackbar');

const buildPlugins = (
  { paths, isDev }: BuildOptions,
): WebpackPluginInstance[] => [
  new HtmlWebpackPlugin({
    template: paths.HTML,
  }),
  new WebpackBar(),
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
  }),
  new DefinePlugin({
    __IS_DEV__: JSON.stringify(isDev),
  }),
  new HotModuleReplacementPlugin(),
  new ReactRefreshWebpackPlugin(),
  new BundleAnalyzerPlugin(),
];
export default buildPlugins;
