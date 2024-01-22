import { useState, useEffect } from 'react';
import { ArticleForm } from 'components/ArticleForm';
import { useParams } from 'react-router-dom';
import { Article as ArticleModel } from 'models/Article/Article';
import { useFetching } from 'hooks/useFetching/useFetching';
import PostService from 'API/PostService';
import { ErrorMessage } from 'components/ErrorMessage';

const EditArticle = () => {
	const { id } = useParams();
	const [article, setArticle] = useState<ArticleModel>({});

	const [fetchPostById, error] = useFetching(async (curId: string) => {
		const response = await PostService.getById(curId);
		setArticle(response.data);
	});

	useEffect(() => {
		fetchPostById(+id);
	}, []);

	if (error) {
		return (
			<ErrorMessage textMessage='Ошибка загрузки статьи!' />
		);
	}

	return (
		<main className='container'>
			<ArticleForm type='change' article={article} />
		</main>
	);
};

export default EditArticle;