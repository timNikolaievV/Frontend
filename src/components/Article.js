import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Article = ({ article }) => {
    return !article ? '' : (

        <div>
            <Box >
                <div  >
                    <img width="200px" src={article.imageUrl} alt="" />
                </div>
                <Typography variant="h5" gutterBottom component="div">
                    {article.title}
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    {article.summary}
                </Typography>

                <Typography variant="button" display="block" gutterBottom>
                    <a href={article.url} target="_blank">
                        Learn More
                    </a>
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    {article.newsSite}
                </Typography>
            </Box >
        </div >
    );
}

export default Article;