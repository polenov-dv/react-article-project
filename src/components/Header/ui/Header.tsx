import { Link, useLocation } from 'react-router-dom';
import cls from './Header.module.scss';
import { useContext, useState } from 'react';
import { AuthorizationContext } from 'context/AuthorizationContext';
import new_post_img from 'shared/assets/images/new_post.png';
import profile_img from 'shared/assets/images/profile.jpg';
import setting_img from 'shared/assets/images/setting.png';

export const Header = () => {

	const location = useLocation();
	const { user } = useContext(AuthorizationContext);
	const [openMenu, setOpenMenu] = useState(false);

	const nav_list = openMenu
		? cls.menu_list + " " + cls.menu_open
		: cls.menu_list;

	return (
		<header className={`container ${cls.header}`}>

			<Link onClick={() => setOpenMenu(false)} to="/" className={cls.logo}>
				Article
			</Link>

			<nav className={cls.nav}>
				<div onClick={() => setOpenMenu(!openMenu)} className={cls.menu_btn}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<ul className={nav_list}>
					<li className={cls.nav_item}>
						<Link
							onClick={() => setOpenMenu(false)}
							className={location.pathname === "/" ? cls.nav_link_active : cls.nav_link}
							to="/"
						>
							<p className={cls.link_text}>Главная</p>
						</Link>
					</li>

					{!user &&
						<>
							<li className={cls.nav_item}>
								<Link
									onClick={() => setOpenMenu(false)}
									className={location.pathname === "/login" ? cls.nav_link_active : cls.nav_link}
									to="/login"
								>
									<p className={cls.link_text}>Войти</p>
								</Link>
							</li>
							<li className={cls.nav_item}>
								<Link
									onClick={() => setOpenMenu(false)}
									className={location.pathname === "/register" ? cls.nav_link_active : cls.nav_link}
									to="/register"
								>
									<p className={cls.link_text}>Регистрация</p>
								</Link>
							</li>
						</>
					}

					{user &&
						<>
							<li className={cls.nav_item}>
								<Link
									onClick={() => setOpenMenu(false)}
									className={location.pathname === "/new" ? cls.nav_link_active : cls.nav_link}
									to="/new"
								>
									<div className={cls.link_content}>
										<img className={cls.post_img} src={new_post_img} alt="Пост" />
										<p className={cls.link_text}>Создать статью</p>
									</div>
								</Link>
							</li>
							<li className={cls.nav_item}>
								<Link
									onClick={() => setOpenMenu(false)}
									className={location.pathname === "/settings" ? cls.nav_link_active : cls.nav_link}
									to="/settings"
								>
									<div className={cls.link_content}>
										<img className={cls.post_img} src={setting_img} alt="Настройки" />
										<p className={cls.link_text}>Настройки</p>
									</div>
								</Link>
							</li>
							<li className={cls.nav_item}>
								<Link
									onClick={() => setOpenMenu(false)}
									className={location.pathname === `/user` ? cls.nav_link_active : cls.nav_link}
									to={`user`}
								>
									<div className={cls.link_content}>
										<img className={cls.post_img} src={profile_img} alt="Профиль" />
										<p className={cls.link_text}>{user}</p>
									</div>
								</Link>
							</li>
						</>
					}
					<li className={cls.nav_item}>
						<Link
							onClick={() => setOpenMenu(false)}
							className={location.pathname === "/about" ? cls.nav_link_active : cls.nav_link}
							to="/about"
						>
							<p className={cls.link_text}>О сайте</p>
						</Link>
					</li>
				</ul>
			</nav>

		</header >
	);
};