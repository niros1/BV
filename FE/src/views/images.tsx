import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import React from "react";
import { UserStore } from "../store/users";
import { ThemeProvider, Grid, Paper, createStyles, makeStyles, Theme, createMuiTheme, Container } from '@material-ui/core';
import BVFilter from '../components/filter';
import Galery from '../components/galery'
import { BVRadar } from "../components/radar";

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
            border: "2px solid #e1e1e1",
            marginTop: 30,
            borderStyle: "solid",
            borderRadius: 25,
            marginLeft: 10,

        },
    }),
);

const VImages: React.FunctionComponent<{ userStore: UserStore }> = ({ userStore }) => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Grid container justify="center" spacing={5} direction="row">
                <Grid item xs={6} className={classes.gridItem}>
                    <Grid container justify="space-around" spacing={5} direction="row">
                        <Grid item xs={4} className={classes.gridItem}>
                            <BVFilter></BVFilter>
                        </Grid>
                        <Grid item xs={6} className={classes.gridItem}>
                            <Galery></Galery>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} className={classes.gridItem}>
                    {
                        userStore.emotionsRadarStruct[0] &&
                        <BVRadar {...{ emotionsRadarStruct: userStore.emotionsRadarStruct, userImages: userStore.filteredImages, selectedId: userStore.selectedImageId }}></BVRadar>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

const Observed = observer(VImages);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ userStore: users }}></Observed >);
}

export default observer(WithStore);