import React, { useEffect } from 'react';
import './App.css';
import { ThemeProvider, Grid, Paper, createStyles, makeStyles, Theme, createMuiTheme, Container, AppBar, Toolbar, IconButton, Typography, Drawer } from '@material-ui/core';
import { WithMobx } from './WithMobx';
import Main from './components/main'
import VImages from './views/images'
import VCluster from './views/cluster'

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
      flexGrow: 1,
    },
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
type Anchor = 'top' | 'left' | 'bottom' | 'right';

function App() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    learn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };





  const learn = () => {
    //generate data or you can use your own data
    let data: any[] = [];
    let generateData = function () {
      for (let i = 0; i < 10; i++) { // IMages?
        data[i] = [];
        for (let j = 0; j < 3; j++) { // emottions
          data[i].push(Math.random() * 10 + j);
        }
      }
    };
    generateData();


    //instantiate K_Means 
    const kMeans = new K_Means({
      random_Init_Count: 4, //number of times to initialize random centroids
      cluster_count: 2, //number of clusters needed
      max_iterations: 10000, //maximum iterations to run clustering
      iteration_callback: () => { console.log("debugInfo"); }, //debug callback
      notify_count: 10 //execute callback after every 10 iterations
    });

    console.log('orgdata,', data);

    //start clustering
    kMeans.start_Clustering(data).then(function (clusters) {
      console.log(clusters);
    });

  }


  const classes = useStyles();
  return (
    <WithMobx>
      <ThemeProvider theme={theme}>
        {/* <Box color="primary" bgcolor="warning.main">blue</Box> */}
        <div className={classes.root} >
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                BrainVivo
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer anchor="left" open={state["left"]} onClose={toggleDrawer("left", false)}>
            Left
          </Drawer>
          <Router>
            <Switch>
              <Route path="/images">
                <VImages></VImages>
              </Route>
              <Route path="/cluster">
                <VCluster></VCluster>
              </Route>
              <Route path="/">
                <Main></Main>
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
