import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cls from './Settings.module.scss';
import { AuthorizationContext, LOCAL_STORAGE_AUTORIZATION_KEY } from 'context/AuthorizationContext';
import PostService from 'API/PostService';
import { useFetching } from 'hooks/useFetching/useFetching';
import { User as UserModel } from 'models/User/User';
import { ErrorMessage } from 'components/ErrorMessage';
import { Loader } from 'components/Loader';

export const Settings = () => {

	const [id, setId] = useState('');
	const [description, setDescription] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userInfo, setUserInfo] = useState<UserModel[]>([]);
	const { user, setUser } = useContext(AuthorizationContext);
	const router = useNavigate();

	const [fetchUserInfo, isUserInfoLoading, userInfoError] = useFetching(async () => {
		const response = await PostService.getUserInfo(user)
		setUserInfo(response.data);
	})

	useEffect(() => {
		fetchUserInfo();
	}, []);


	useEffect(() => {
		if (userInfo.length !== 0) {
			setId(userInfo[0].id)
			setDescription(userInfo[0].description);
			setEmail(userInfo[0].email);
			setPassword(userInfo[0].password);
		}
	}, [userInfo]);

	const changeUserInfo = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (user && description && email && password) {
			PostService.changeUserInfo(id, user, description, email, password);
		}
	}

	const changeUser = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setUser('');
		localStorage.setItem(LOCAL_STORAGE_AUTORIZATION_KEY, "");
		router('/');
	}

	if (userInfoError && !isUserInfoLoading) {
		return (
			<main>
				<ErrorMessage textMessage='Ошибка загрузки информации о пользователе!' />
			</main>

		);
	}

	return (
		<main className='container'>
			{!isUserInfoLoading && userInfo.length !== 0 ?
				<form>
					<fieldset className={cls.form_content}>
						<fieldset className={cls.form_group}>
							<input
								type="text"
								className={cls.form_control}
								placeholder='Имя'
								value={user}
								disabled={true}
							/>
						</fieldset>

						<fieldset className={cls.form_group}>
							<textarea
								name=""
								className={`${cls.form_control} ${cls.form_area}`}
								placeholder='Описание'
								value={description ?? ""}
								onChange={e => setDescription(e.target.value)}
							>
							</textarea>
						</fieldset>

						<fieldset className={cls.form_group}>
							<input
								type="email"
								className={cls.form_control}
								placeholder='Емаил'
								value={email ?? ""}
								onChange={e => setEmail(e.target.value)}
							/>
						</fieldset>

						<fieldset className={cls.form_group}>
							<input
								type="password"
								name="password"
								autoComplete="on"
								className={cls.form_control}
								placeholder='Пароль'
								value={password ?? ""}
								onChange={e => setPassword(e.target.value)}
							/>
						</fieldset>

						<fieldset className={cls.form_button}>
							<button type='button' onClick={changeUserInfo}>
								Изменить
							</button>
							<button className={cls.btn_exit} type='button' onClick={changeUser}>
								Выйти
							</button>
						</fieldset>
					</fieldset>
				</form>
				:
				<Loader />
			}
		</main >
	);
};
