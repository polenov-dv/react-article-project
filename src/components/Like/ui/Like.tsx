import { useContext } from 'react';
import cls from './Like.module.scss';
import { Article as ArticleModel } from 'models/Article/Article';
import Star from "shared/assets/icons/star.svg";
import { AuthorizationContext } from 'context/AuthorizationContext';

interface PropsLike {
	article: ArticleModel;
	onClick?: () => void;
}

export const Like = ({ article, onClick }: PropsLike) => {
	const { user } = useContext(AuthorizationContext);
	return (
		<div className={cls.content}>
			{article.favorite !== undefined &&
				<>
					<Star onClick={onClick} className={article.favorite.includes(user) ? cls.star_active : cls.star} />
					<p className={cls.likes}>{article.likes}</p>
				</>
			}
		</div>
	);
};
