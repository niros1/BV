import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import React from "react";
import { ImageStore } from "../store/images";
import { ThemeProvider, Grid, Paper, createStyles, makeStyles, Theme, createMuiTheme, Container } from '@material-ui/core';
import BVFilter from '../components/filter';
import Galery from '../components/galery'
import { BVRadar } from "../components/radar";
import { BVBarChart } from "../components/bars";

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

const VImages: React.FunctionComponent<{ ImageStore: ImageStore }> = ({ ImageStore }) => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl">
            <Grid container justify="center" spacing={5} direction="row">
                <Grid item xs={6} className={classes.gridItem}>
                    <Grid container justify="space-around" spacing={5} direction="row">
                        <Grid item xs={10} className={classes.gridItem}>
                            <BVFilter></BVFilter>
                        </Grid>
                        <Grid item xs={10} className={classes.gridItem}>
                            <Galery></Galery>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={4} className={classes.gridItem} alignItems="center">
                    {
                        ImageStore.emotionsRadarStruct[0] &&
                        <BVRadar {...{ emotionsRadarStruct: ImageStore.emotionsRadarStruct, userImages: ImageStore.filteredImages, selectedId: ImageStore.selectedImageId }}></BVRadar>
                    }
                    {
                        ImageStore.emotionsRadarStruct[0] &&
                        <BVBarChart {...{ emotionsRadarStruct: ImageStore.emotionsRadarStruct, userImages: ImageStore.filteredImages, selectedId: ImageStore.selectedImageId }}></BVBarChart>
                    }
                </Grid>
            </Grid>
        </Container>
    )
}

const Observed = observer(VImages);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ ImageStore: users }}></Observed >);
}

export default observer(WithStore);