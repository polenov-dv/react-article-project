import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';
export function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {

	//Loader TypeScript
	//Для React без TypeScript нужно добавлять babel-loader
	const typescriptLoader = {
		test: /\.tsx?$/,
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	//Loader CSS
	const cssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			isDev ? "style-loader" : MiniCssExtractPlugin.loader,
			{
				loader: "css-loader",
				options: {
					modules: {
						auto: (resPath: string) => Boolean(resPath.includes('.module.')),			//Случайные имена генерятся только для файлов *.module.scss
						localIdentName: isDev																									//Правила формирования имен классов
							? '[path][name]__[local]--[hash:base64:5]'
							: '[hash:base64:8]'
					}
				}
			},
			"sass-loader",
		]
	}

	//Loader SVG
	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	}

	//Loader jpg, png ....
	const fileLoader = {
		test: /\.(png|jpe?g|gif|css)$/i,
		type: 'asset/resource'
	}

	return [
		fileLoader,
		svgLoader,
		typescriptLoader,
		cssLoader
	]
}