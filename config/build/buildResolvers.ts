import webpack from 'webpack';
import { BuildOptions } from './types/config';

export function buildResolvers(options: BuildOptions): webpack.ResolveOptions {
	return {
		//Позволяет импортировать файлы без расширения
		extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],

		//Абсолютные пути в приоритете
		preferAbsolute: true,

		//Путь к абсолютным путям
		modules: [options.paths.src, 'node_modules'],

		//Главный файл модуля
		mainFiles: ['index'],

		//Импорт без указания путей до options.paths.src
		alias: {}
	}
}