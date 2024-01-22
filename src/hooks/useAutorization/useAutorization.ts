import React, { useState, useContext } from 'react';
import { User as ModelUser } from 'models/User/User';
import { AuthorizationContext, LOCAL_STORAGE_AUTORIZATION_KEY } from 'context/AuthorizationContext';
import PostService from 'API/PostService';
import { useLocation, useNavigate } from 'react-router-dom';

export const useAutorization = (userName: string, email: string, password: string, users: ModelUser[], isLogin: boolean) => {

	const { user, setUser } = useContext(AuthorizationContext);
	const [errorMessage, setErrorMessage] = useState('');

	const location = useLocation();
	const router = useNavigate();
	const [changeLocation, setChangeLocation] = useState(location.pathname);

	if (location.pathname !== changeLocation) {
		setErrorMessage('');
		setChangeLocation(location.pathname);
	}

	//Регистрация нового пользователя
	const authorizationUser = () => {
		let statusAuth = true;
		for (let key in users) {
			if (users[key].userName === userName) {
				statusAuth = false;
			}
		}

		if (statusAuth) {
			let id = String(users.length + 1);
			PostService.createUser(id, userName, email, password);
			setUser(userName);
			localStorage.setItem(LOCAL_STORAGE_AUTORIZATION_KEY, userName);
			router('/');
		} else {
			setErrorMessage(`Пользователь ${userName} уже зарегистрирован`);
		}
	}

	//Вход зарегестрированного пользователя
	const entryUser = () => {
		let statusEntry = false;
		for (let key in users) {
			if (users[key].userName === userName && users[key].password === password) {
				statusEntry = true;
			}
		}

		if (statusEntry) {
			setUser(userName);
			localStorage.setItem(LOCAL_STORAGE_AUTORIZATION_KEY, userName);
			router('/');
		} else {
			setErrorMessage('Неверное имя или пароль!');
		}
	}

	//Пользователь нажал на кнопку авторизации
	const authorization = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (isLogin) {
			if (password && userName) {
				entryUser();
			} else {
				setErrorMessage('Заполните все поля входа!');
			}
		} else {
			if (email && password && userName) {
				authorizationUser();
			} else {
				setErrorMessage('Заполните все поля регистрации!');
			}
		}
	}


	return { authorization, errorMessage };
}