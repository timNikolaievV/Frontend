import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react';


import TablePagination from '@mui/material/TablePagination';


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
    const response = await fetch(`https://api.spaceflightnewsapi.net/v3/articles?id_in=${query}`, {
      headers: { "Content-type": "application.json" },
      method: "GET"
    })

    const data = await response.json();
    return data;
  }

  const handleChange = async (event, newView) => {
    setView(newView);

    if (newView === 'all') {
      const data = await getArticles();
      setArticles(data);
    }
    else {
      if (articlesFav?.length > 0) {
        const data = await getArticlesFav(articlesFav);
        setArticles(data);
      }
      else {
        setArticles([]);
      }
    }

  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getArticles();
      setArticles(data);
    }

    fetch();

  }, []);


  //tododdo

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <ToggleButtonGroup
              color="primary"
              value={view}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="fav">Fav</ToggleButton>
            </ToggleButtonGroup>

            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <ArticleList
              articles={articles} setArticleCurrent={setArticleCurrent}
              articlesFav={articlesFav} setArticlesFav={setArticlesFav}
            />
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Article article={articleCurrent} />
        </Box>
      </Box>
    </div>
  );
}



export default App;
