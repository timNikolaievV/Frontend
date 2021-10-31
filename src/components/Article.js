import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const Article = ({ article }) => {
    return !article ? '' : (

        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>

                        <div  >
                            <img width="700px" src={article.imageUrl} alt="" />
                        </div>
                    </Grid>
                    <Grid item xs={6} md={12}>
                        <Typography variant="h5" gutterBottom component="div">
                            {article.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} md={12}>

                        <Typography variant="h6" gutterBottom component="div">
                            {article.summary}
                        </Typography>

                    </Grid>
                    <Grid item xs={6} md={12}>

                        <Typography variant="button" display="block" gutterBottom>
                            <a href={article.url} target="_blank">
                                Learn More
                            </a>
                        </Typography>

                    </Grid>
                    <Grid item xs={6} md={12}>

                        <Typography variant="overline" display="block" gutterBottom>
                            Source {article.newsSite}
                        </Typography>

                    </Grid>
                </Grid>
            </Box >
        </div >
    );
}

export default Article;