import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({ paths }: BuildOptions): webpack.WebpackPluginInstance[] {

	return [
		//Плагин формирования index.html
		new HTMLWebpackPlugin({
			template: paths.html,
			publicPath: '/'
		}),

		//Плагин отображения процентной сборки проекта
		new webpack.ProgressPlugin(),

		//Плагин формирования отдельных css файлов
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		})
	]
}