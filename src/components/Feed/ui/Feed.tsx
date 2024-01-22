import cls from './Feed.module.scss';
import { Article as ModuleArticle } from 'models/Article/Article';
import { Link, useNavigate } from 'react-router-dom';
import { TagList } from 'components/TagList';
import { Like } from 'components/Like';

interface FeedProps {
	articles: ModuleArticle[];
	type: 'user' | 'autor';
}

export const Feed = ({ articles, type }: FeedProps) => {

	const router = useNavigate();

	return (
		<div className={cls.content}>
			{
				articles.map((article, index) => (
					<div key={article.id} className={cls.article}>
						<div className={cls.meta_wrapper}>
							<div className={cls.meta}>
								<Link to={`/user/${article.autor}`}>
									<img src={type === 'autor' ? `../${article.autorIcon}` : article.autorIcon} alt="Профиль" className={cls.autor_icon} />
								</Link>
								<div className={cls.info}>
									<Link to={`/user/${article.autor}`} className={cls.autor}>
										{article.autor}
									</Link>
									<span className={cls.date}>{article.created}</span>
								</div>
							</div>
							<Like article={article} />
						</div>

						<div onClick={() => router(`/${article.id}`)} className={cls.article_link}>
							<h1 className={cls.title}>{article.title}</h1>
							<p className={cls.desc}>{article.description}</p>
							<span className={cls.read_all}>Читать далее...</span>
							<TagList tags={article.tagList} position='flex-end' />
						</div>
					</div>
				))
			}
		</div>
	);
};
