import { BuildOptions } from "./types/config";
import webpack from 'webpack';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';
import buildDevServer from "./buidDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {
	const { mode, paths, isDev } = options;

	return {
		//Тип приложения (разработка (development) или публикация (production))
		mode: mode,

		//Стартовая точка приложения
		entry: paths.entry,

		//Куда и как будет выполняться сборка нашего приложения
		output: {

			//Главный файл сборки приложения
			filename: '[name].[contenthash].js',

			//Путь куда сборка должна происходить
			path: paths.build,

			//Подключение asset-module для загрузки картинок
			assetModuleFilename: 'images/[hash][ext][query]',

			//Удаление старых версий файлов
			clean: true,
		},

		//Подключение плагинов
		plugins: buildPlugins(options),

		//Подключение лоадеров
		module: {
			rules: buildLoaders(options)
		},

		//Путь к файлам без расширения
		resolve: buildResolvers(options),

		//Опция для отслеживания где в коде произошла ошибка
		devtool: isDev ? 'inline-source-map' : undefined,

		//Настройка dev-server
		devServer: isDev ? buildDevServer(options) : undefined
	}
}