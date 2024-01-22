import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import cls from './Sign.module.scss';
import { useAutorization } from 'hooks/useAutorization/useAutorization';
import { User as ModelUser } from 'models/User/User';
import { ErrorMessage } from 'components/ErrorMessage';

const Sign = () => {

	const location = useLocation();
	const isLogin = location.pathname === '/login';
	const pageTitle = isLogin ? 'Войти' : 'Зарегистрироватся';
	const descriptionLink = isLogin ? '/register' : '/login';
	const descriptionText = isLogin ? 'Создать аккаунт?' : 'Есть аккаунт?';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [userName, setUserName] = useState('');
	const [users, setUsers] = useState<ModelUser[]>([]);
	const [changeLocation, setChangeLocation] = useState(location.pathname);

	if (location.pathname !== changeLocation) {
		setUserName('');
		setEmail('');
		setPassword('');
		setChangeLocation(location.pathname);
	}

	const [fetchUser] = useFetching(async () => {
		const response = await PostService.getAllUsers();
		setUsers(response.data);
	});

	useEffect(() => {
		fetchUser();
	}, [])

	const { authorization, errorMessage } = useAutorization(userName, email, password, users, isLogin);

	return (
		<main className={cls.inner}>
			<div className={cls.content}>
				<h1 className={cls.title}>{pageTitle}</h1>
				<Link className={cls.link} to={descriptionLink}>{descriptionText}</Link>
				<form className={cls.form} onSubmit={authorization}>
					<fieldset className={cls.form_content}>
						<ErrorMessage textMessage={errorMessage} />
						<fieldset className={cls.form_item}>
							<input
								type="text"
								className={cls.form_input}
								placeholder='Имя'
								value={userName}
								onChange={e => setUserName(e.target.value)}
							/>
						</fieldset>
						{!isLogin && (
							<fieldset className={cls.form_item}>
								<input
									type="email"
									className={cls.form_input}
									placeholder='Электронная почта'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</fieldset>
						)}
						<fieldset className={cls.form_item}>
							<input
								type="password"
								className={cls.form_input}
								placeholder='Пароль'
								value={password}
								onChange={e => setPassword(e.target.value)}
							/>
						</fieldset>
						<button
							className={cls.btn}
							type='submit'
						>
							{pageTitle}
						</button>
					</fieldset>
				</form>
			</div>
		</main>
	);
};

export default Sign;