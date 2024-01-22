import { useState, useEffect, useContext } from 'react';
import cls from './Home.module.scss';
import { Feed } from 'components/Feed';
import { Article as ArticleModel } from 'models/Article/Article';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import { Loader } from 'components/Loader';
import { Pagination } from 'components/Pagination';
import { getPageCount } from 'utils/pages';
import { PopularTags } from 'components/PopularTags';
import { ErrorMessage } from 'components/ErrorMessage';
import { FeedToggle } from 'components/FeedToggle';
import { AuthorizationContext } from 'context/AuthorizationContext';

const Home = () => {

	const [articles, setArticles] = useState<ArticleModel[]>([]);
	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);
	const [activeTag, setActiveTag] = useState('');
	const [isMyTag, setIsMyTag] = useState(false);
	const { user } = useContext(AuthorizationContext);

	const [fetchArticle, isArticleLoading, articleError] = useFetching(async () => {
		let response: any;
		setArticles([]);
		if (activeTag !== '' && isMyTag === false) {
			response = await PostService.getArticlesTag(limit, page, activeTag);
			setArticles(response.data);
		} else if (activeTag === '' && isMyTag === true) {
			response = await PostService.getUserTag(limit, page, user);
			setArticles(response.data);
		} else {
			response = await PostService.getArticles(limit, page, 'id');
			setArticles(response.data);
			setIsMyTag(false);
		}

		const totalCount = response.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})

	useEffect(() => {
		fetchArticle();
	}, [page, activeTag, isMyTag])


	//Формирование активного тега
	const createActiveTag = (tagName: string) => {
		setActiveTag(tagName);
		setIsMyTag(false);
		setPage(1);
	}

	//Формирование активности вкладки: Ваши теги
	const createMyTag = (status: boolean) => {
		setIsMyTag(status);
		setActiveTag("");
		setPage(1);
	}
	return (
		<main className={cls.content_wrapper}>
			<div className={cls.banner_content}>
				<div className={cls.banner}>
					<h1 className={cls.title}>HTML, CSS, JavaScripr, React</h1>
				</div>
			</div>

			<div className={`${cls.content} container`}>
				<div className={cls.feeds}>
					{isArticleLoading && <Loader />}
					{!isArticleLoading && articles &&
						<>
							<FeedToggle tagName={activeTag} isMyTag={isMyTag} createActiveTag={createActiveTag} createMyTag={createMyTag} />
							{articleError && articles.length === 0 && !isArticleLoading && <ErrorMessage textMessage='Ошибка загрузки данных' />}
							<Feed articles={articles} type='user' />
							{articles.length > 0 &&
								<Pagination page={page} setPage={setPage} totalPages={totalPages} />
							}
						</>
					}
				</div>

				<div className={cls.tags}>
					<PopularTags createActiveTag={createActiveTag} />
				</div>
			</div>

		</main>
	);
};

export default Home;