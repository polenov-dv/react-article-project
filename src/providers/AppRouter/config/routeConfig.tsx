import { About } from "pages/About"
import { Article } from "pages/Article"
import { EditArticle } from "pages/EditArticle"
import { Home } from "pages/Home"
import { NewArticle } from "pages/NewArticle"
import { NotFound } from "pages/NotFound"
import { Settings } from "pages/Settings"
import { Sign } from "pages/Sign"
import { User } from "pages/User"
import { RouteProps } from "react-router-dom"

export enum AppRoutes {
	HOME = 'home',
	REGISTER = 'register',
	LOGIN = 'login',
	SETTINGS = 'settings',
	USER = 'user',
	USER_INFO = 'user_info',
	ABOUT = 'about',
	ARTICLE = 'articles',
	EDIT_ARTICLE = 'edit_article',
	NEW_ARTICLE = 'new_article',
	NOT_FOUND = 'not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
	[AppRoutes.HOME]: '',
	[AppRoutes.REGISTER]: 'register',
	[AppRoutes.LOGIN]: 'login',
	[AppRoutes.SETTINGS]: 'settings',
	[AppRoutes.USER]: 'user',
	[AppRoutes.USER_INFO]: 'user/:autor',
	[AppRoutes.ABOUT]: 'about',
	[AppRoutes.ARTICLE]: '/:id',
	[AppRoutes.NEW_ARTICLE]: 'new',
	[AppRoutes.EDIT_ARTICLE]: '/:id/edit',
	[AppRoutes.NOT_FOUND]: '*'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
	[AppRoutes.HOME]: {
		path: RoutePath.home,
		element: <Home />
	},
	[AppRoutes.REGISTER]: {
		path: RoutePath.register,
		element: <Sign />
	},
	[AppRoutes.LOGIN]: {
		path: RoutePath.login,
		element: <Sign />
	},
	[AppRoutes.SETTINGS]: {
		path: RoutePath.settings,
		element: <Settings />
	},
	[AppRoutes.USER]: {
		path: RoutePath.user,
		element: <User />
	},
	[AppRoutes.USER_INFO]: {
		path: RoutePath.user_info,
		element: <User />
	},
	[AppRoutes.ABOUT]: {
		path: RoutePath.about,
		element: <About />
	},
	[AppRoutes.ARTICLE]: {
		path: RoutePath.articles,
		element: <Article />
	},
	[AppRoutes.NEW_ARTICLE]: {
		path: RoutePath.new_article,
		element: <NewArticle />
	},
	[AppRoutes.EDIT_ARTICLE]: {
		path: RoutePath.edit_article,
		element: <EditArticle />
	},
	[AppRoutes.NOT_FOUND]: {
		path: RoutePath.not_found,
		element: <NotFound />
	}
}