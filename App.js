import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Article from './components/Article';




function App() {
  const [articles, setArticles] = useState([]);
  const [articleCurrent, setArticleCurrent] = useState(null);
  const [articlesFav, setArticlesFav] = useState([]);
  const [view, setView] = useState('all');

  const drawerWidth = 340;

  const getArticles = async () => {

    const response = await fetch("https://api.spaceflightnewsapi.net/v3/articles", {
      headers: { "Content-type": "application.json" },
      method: "GET"
    })

    const data = await response.json();
    return data;
  }

  const getArticlesFav = async (articlesFav) => {
    const query = articlesFav.join('&id_in=');
    console.log(query);
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?${query}`, {
      headers: { "Content-type": "application.json" },
      method: "GET"
    })

    const data = await response.json();
    return data;
  }

  const handleChange = (event, newView) => {
    setView(newView);
    /*
        const fetch = async () => {
          const data = await getArticles();
          setArticles(data);
        }
    
        const fetchFav = async () => {
          const data = await getArticlesFav(articlesFav);
          setArticles(data);
        }
    
        if (view === 'all') {
          fetch();
        }
        else {
          fetchFav();
        }
    */
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getArticles();
      setArticles(data);
    }

    fetch();

  }, []);




  return (
    <div className="App">
      <Box sx={{ display: 'flex', }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>

        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar>

            <ToggleButtonGroup
              color="primary"
              value={view}
              exclusive
              onChange={handleChange}
            >

              <Typography variant="h6" component="div">
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="fav">Fav</ToggleButton>
              </Typography>

            </ToggleButtonGroup>

          </Toolbar >
          <Box sx={{ overflow: 'auto' }}>

            <ArticleList
              articles={articles} setArticleCurrent={setArticleCurrent}
              articlesFav={articlesFav} setArticlesFav={setArticlesFav}
            />
            <Divider />
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Article article={articleCurrent} />
        </Box>
      </Box >
    </div >
  );
}



export default App;
