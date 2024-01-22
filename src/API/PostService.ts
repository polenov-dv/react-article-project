import axios from 'axios';

export default class PostService {

	static async getArticles(limit: number = 5, page: number = 1, sort?: string) {
		const response = await axios.get('http://localhost:8000/articles', {
			params: {
				_limit: limit,
				_page: page,
				_sort: sort,
				_order: 'desc'
			}
		});
		return response;
	}

	static async getArticlesTag(limit: number = 5, page: number = 1, search: string) {
		const response = await axios.get('http://localhost:8000/articles', {
			params: {
				_limit: limit,
				_page: page,
				tagList_like: search
			}
		});
		return response;
	}

	static async getUserTag(limit: number = 5, page: number = 1, search: string) {
		const response = await axios.get('http://localhost:8000/articles', {
			params: {
				_limit: limit,
				_page: page,
				autor_like: search
			}
		});
		return response;
	}

	static async getFavoriteTag(limit: number = 5, page: number = 1, search: string) {
		const response = await axios.get('http://localhost:8000/articles', {
			params: {
				_limit: limit,
				_page: page,
				favorite_like: search
			}
		});
		return response;
	}

	static async createUser(id: string, name: string, email: string, password: string) {
		try {
			axios.post(`http://localhost:8000/users`, {
				id: id,
				userName: name,
				description: `Описание пользователя ${name}`,
				email: email,
				password: password
			});
		} catch (err) { }
	}

	static async createTags(id: string, name: string) {
		try {
			axios.post(`http://localhost:8000/tags`, {
				id: id,
				name: name
			});
		} catch (err) { }
	}

	static async getAllUsers() {
		const response = await axios.get('http://localhost:8000/users');
		return response;
	}

	static async getAllArticles() {
		const response = await axios.get('http://localhost:8000/articles');
		return response;
	}

	static async getTags() {
		const response = await axios.get('http://localhost:8000/tags');
		return response;
	}

	static async getById(id: string) {
		const response = await axios.get(`http://localhost:8000/articles/${id}`);
		return response;
	}

	static async createArticle(id: string, title: string, description: string, autor: string, autorIcon: string, created: string, tagList: string) {
		try {
			axios.post('http://localhost:8000/articles', {
				id: id,
				title: title,
				description: description,
				autor: autor,
				autorIcon: autorIcon,
				created: created,
				tagList: tagList,
				likes: "0",
				favorite: []
			});
		} catch (err) { }
	}

	static async changeArticle(id: string, title: string, description: string, autor: string, autorIcon: string, created: string, tagList: string, likes: string, favorite: string[]) {
		try {
			axios.put(`http://localhost:8000/articles/${id}`, {
				id: id,
				title: title,
				description: description,
				autor: autor,
				autorIcon: autorIcon,
				created: created,
				tagList: tagList,
				likes: likes,
				favorite: favorite
			});
		} catch (err) { }
	}

	static async deleteArticle(id: string) {
		try {
			axios.delete(`http://localhost:8000/articles/${id}`);
		} catch (err) { }
	}

	static async getUserInfo(search: string) {
		const response = await axios.get('http://localhost:8000/users', {
			params: {
				userName_like: search
			}
		});
		return response;
	}

	static async changeUserInfo(id: string, userName: string, description: string, email: string, password: string) {
		try {
			axios.put(`http://localhost:8000/users/${id}`, {
				id: id,
				userName: userName,
				description: description,
				email: email,
				password: password
			});
		} catch (err) { }
	}
}