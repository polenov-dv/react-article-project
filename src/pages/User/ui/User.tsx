import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cls from './User.module.scss';
import profile_img from 'shared/assets/images/profile.jpg';
import { AuthorizationContext } from 'context/AuthorizationContext';
import { Article as ArticleModel } from 'models/Article/Article';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import { getPageCount } from 'utils/pages';
import { Loader } from 'components/Loader';
import { ErrorMessage } from 'components/ErrorMessage';
import { Feed } from 'components/Feed';
import { Pagination } from 'components/Pagination';

const User = () => {
	const { user } = useContext(AuthorizationContext);
	const [articles, setArticles] = useState<ArticleModel[]>([]);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [activeArticle, setActiveArticle] = useState(false);
	const { autor } = useParams();

	const [fetchArticle, isArticleLoading, articleError] = useFetching(async () => {
		let response: any;
		let userName = '';
		if (autor) {
			userName = autor;
		} else {
			userName = user;
		}

		setArticles([]);
		if (activeArticle) {
			response = await PostService.getFavoriteTag(limit, page, userName);
			setArticles(response.data);
		} else {
			response = await PostService.getUserTag(limit, page, userName);
			setArticles(response.data);
		}

		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useEffect(() => {
		fetchArticle();
	}, [page, activeArticle, autor])

	return (
		<main>
			<div className={cls.banner}>
				<img className={cls.banner_img} src={profile_img} alt="" />
				<p className={cls.user}>{autor ? autor : user}</p>
			</div>
			<div className={`${cls.content} container`}>
				<ul className={cls.link_list}>
					<li className={cls.link_item}>
						<span
							onClick={() => setActiveArticle(false)}
							className={!activeArticle ? cls.link_active : cls.link}
						>
							Мои статьи
						</span>
					</li>
					<li className={cls.link_item}>
						<span
							onClick={() => setActiveArticle(true)}
							className={activeArticle ? cls.link_active : cls.link}
						>
							Понравившиеся статьи
						</span>
					</li>
				</ul>

				{isArticleLoading && <Loader />}
				{articleError && articles.length === 0 && !isArticleLoading && <ErrorMessage textMessage='Ошибка загрузки данных' />}
				{!isArticleLoading && articles &&
					<>
						<Feed articles={articles} type={autor ? 'autor' : 'user'} />
						{articles.length > 0 &&
							<Pagination page={page} setPage={setPage} totalPages={totalPages} />
						}
					</>
				}
			</div>
		</main>
	);
};

export default User;