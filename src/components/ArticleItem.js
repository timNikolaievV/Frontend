import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Typography from '@mui/material/Typography';




const ArticleItem = ({ article, setArticleCurrent, articlesFav, setArticlesFav, }) => {

    const showCurrentArticleHandler = (article, e) => {
        setArticleCurrent(article);

    }

    const changeFavArticleHandler = (id, isFav, e) => {

        if (!isFav) {
            setArticlesFav([...articlesFav, id]);
        }
        else {
            setArticlesFav(articlesFav.filter(x => x !== id));
        }
    }
    const isFav = articlesFav.indexOf(article.id) !== -1;
    return (
        <div className="article">
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={article.title}
                    subheader={article.publishedAt}
                    action={
                        <IconButton
                            aria-label="add to favorites"
                            onClick={e => {
                                changeFavArticleHandler(article.id, isFav, e);
                            }}>
                            {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>
                    }
                />
                <CardMedia
                    component="img"
                    height="200"
                    image={article.imageUrl}
                    onClick={e => { showCurrentArticleHandler(article, e); }}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {article.summary}
                    </Typography>
                </CardContent>
            </Card>

        </div >
    );
}


export default ArticleItem;