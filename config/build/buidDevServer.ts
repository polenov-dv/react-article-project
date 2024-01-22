import { BuildOptions } from "./types/config";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export default function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		//Локальный порт открытия страницы
		port: options.port,

		//Автоматически открывает в браузере страницу с приложением
		open: true,

		//Позволяет проксировать запросы через корневую страницу (так как один файл index.html)
		historyApiFallback: true,
	}
}