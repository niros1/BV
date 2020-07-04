import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider, Grid, Paper, createStyles, makeStyles, Theme, createMuiTheme, Container, AppBar, Toolbar, IconButton, Typography, Drawer, fade } from '@material-ui/core';
import { WithMobx } from './WithMobx';
import VImages from './views/images'
import VCluster from './views/cluster'
import { Link } from "react-router-dom";


import MenuIcon from '@material-ui/icons/Menu'
import { K_Means } from '@softnami/kmeans';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.primary.main,
    },
    gridItem: {
      border: "15px solid #f1f1f1",
      marginTop: 60,
      borderStyle: "solid"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      // flexGrow: 1,
      display: "inline-block"
    },
    links: {
      flexGrow: 7,
    },
    link: {
      color: "black",
      marginLeft: 30,
      // flexGrow: 1,
      display: "inline-block"
    },
    appBar: {
      backgroundColor: "#B7BFE8",
      width: "90%",
      margin: "auto",
      // border: "1px solid",
      borderRadius: 15,

    }
  }),
);

const theme = createMuiTheme({
  spacing: 4,

  palette: {
    primary: {
      main: "#FFFFFF",
    },
  }
});

function App() {

  const preventDefault = (event: React.SyntheticEvent, path: string) => {
    window.history.replaceState(null, "New Page Title", path)
    event.preventDefault()
  };
  const classes = useStyles();
  return (
    <WithMobx>
      <ThemeProvider theme={theme}>
        {/* <Box color="primary" bgcolor="warning.main">blue</Box> */}
        <div className={classes.root} >
          <Router>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  BrainVivo
              </Typography>
                {/* <img src="/images/bvwhitelogo.webp"></img> */}
                <Container maxWidth="sm" className={classes.links}>
                  <Link to="/" className={classes.link}>
                    <Typography variant="h6" className={classes.title}>
                      Emotional Profile
                    </Typography>
                  </Link>
                  <Link to="/cluster/" className={classes.link}>
                    <Typography variant="h6" className={classes.title}>
                      Group Clustering
                    </Typography>
                  </Link>
                </Container>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route path="/cluster">
                <VCluster></VCluster>
              </Route>
              <Route path="/">
                <VImages></VImages>
              </Route>
            </Switch>
          </Router>

        </div>
      </ThemeProvider>
    </WithMobx>
    // </div>
  );

}

export default App;
