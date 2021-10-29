import React from 'react';
import ArticleItem from './ArticleItem';




const ArticleList = ({ articles, setArticleCurrent, articlesFav, setArticlesFav, }) => {


    console.log(articles);
    return (
        <div className="all-articles">
            {articles.map(article => {
                return <ArticleItem article={article} setArticleCurrent={setArticleCurrent} articlesFav = {articlesFav} setArticlesFav={setArticlesFav} key={article.id} />
            })}
        </div>
    )
}


export default ArticleList;