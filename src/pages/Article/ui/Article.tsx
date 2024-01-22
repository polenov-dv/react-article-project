import { useState, useEffect, useContext } from 'react';
import cls from './Article.module.scss';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import { Article as ArticleModel } from 'models/Article/Article';
import { ErrorMessage } from 'components/ErrorMessage';
import { Loader } from 'components/Loader';
import { TagList } from 'components/TagList';
import { AuthorizationContext } from 'context/AuthorizationContext';
import { ConfirmModal } from 'components/ConfirmModal';
import { Like } from 'components/Like';

const Article = () => {

	const { id } = useParams();
	const [article, setArticle] = useState<ArticleModel>({});
	const { user } = useContext(AuthorizationContext);
	const [changeArticle, setChangeArticle] = useState(false);
	const [modal, setModal] = useState(false);
	const router = useNavigate();

	const [fetchPostById, isLoading, error] = useFetching(async (curId: string) => {
		const response = await PostService.getById(curId);
		setArticle(response.data);
	});

	useEffect(() => {
		fetchPostById(+id);
	}, [changeArticle]);

	if (error) {
		return (
			<ErrorMessage textMessage='Ошибка загрузки статьи!' />
		);
	}

	const changeFavorite = () => {
		if (user && user !== article.autor) {
			let newLikes = article.likes;
			let newFavorite = [...article.favorite];

			if (newFavorite.includes(user)) {
				if (+newLikes > 0) {
					newLikes = String(+newLikes - 1);
				}
				newFavorite.splice(newFavorite.indexOf(user), 1);
			} else {
				newLikes = String(+newLikes + 1);
				newFavorite.push(user);
			}

			PostService.changeArticle(
				article.id,
				article.title,
				article.description,
				article.autor,
				article.autorIcon,
				article.created,
				article.tagList,
				newLikes,
				newFavorite
			);

			setTimeout(() => {
				setChangeArticle(!changeArticle);
			}, 100);
		}
	}

	return (
		<main className={cls.banner}>
			{!isLoading && article ?
				<>
					<ConfirmModal visible={modal} id={id} setVisible={setModal} />
					<div className={cls.inner}>
						<div className='container'>
							<div className={cls.title_wrapper}>
								<h1 className={cls.title}>
									{article.title}
								</h1>
								<div className={cls.likes} title="Добавить в избранное">
									<Like onClick={changeFavorite} article={article} />
								</div>

							</div>
							<div className={cls.meta}>
								<Link to={`/user/${article.autor}`}>
									<img className={cls.meta_img} src={`../${article.autorIcon}`} alt="Автор" />
								</Link>
								<div className={cls.info}>
									<Link to={`/user/${article.autor}`} className={cls.autor}>
										{article.autor}
									</Link>
									<span className={cls.date}>
										{article.created}
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className={`${cls.content} container`}>
						<p className={cls.desc}>{article.description}</p>
						{article.tagList !== undefined ? <TagList tags={article.tagList} position='flex-start' /> : null}
						{
							user === article.autor ?
								<div className={cls.btn_wrapper}>
									<button onClick={() => router(`/${id}/edit`)} className={cls.btn}>Редактировать</button>
									<button onClick={() => setModal(true)} className={`${cls.btn} ${cls.btn_delete}`}>Удалить</button>
								</div>
								:
								null
						}
					</div>
				</>
				:
				<Loader />
			}
		</main>
	);
};

export default Article;