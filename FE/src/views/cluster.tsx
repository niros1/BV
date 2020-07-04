import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import React, { useEffect } from "react";
import { ImageStore } from "../store/images";
import { ThemeProvider, Grid, Paper, createStyles, makeStyles, Theme, createMuiTheme, Container, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import BVFilter from '../components/filter';
import Galery from '../components/galery'
import { BVRadar } from "../components/radar";
import { IImage } from "../model/models";

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
        galery: {
            width: 300,
        }
    }),
);

const VCluster: React.FunctionComponent<{ ImageStore: ImageStore }> = ({ ImageStore }) => {
    const classes = useStyles();
    useEffect(() => {
        ImageStore.getAllImages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Container maxWidth="xl">
            <Grid container justify="center" spacing={5} direction="row">
                <Grid item xs={4} className={classes.gridItem}>
                    {/* <Grid container justify="space-around" spacing={5} direction="row"> */}
                    {
                        ImageStore.clustersImages && ImageStore.clustersImages.map(cluster => {
                            return cluster.map((img: IImage) => {
                            })

                        })
                    }

                    <GridList cellHeight={160} cols={3}>
                        {ImageStore.clustersImages[0] && ImageStore.clustersImages[0].map((tile: IImage, i: number) => (
                            <GridListTile key={i} cols={1}>
                                <img src={`http://127.0.0.1:5000/api/v1/resources/image?user=${tile.path.split('/')[1]}&img=${tile.name}`} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                    subtitle={<span>by: {tile.name}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>

                    {/* </Grid> */}
                </Grid>
                <Grid item xs={4} className={classes.gridItem}>
                    <GridList cellHeight={160} cols={3}>
                        {ImageStore.clustersImages[1] && ImageStore.clustersImages[1].map((tile: IImage, i: number) => (
                            <GridListTile key={i} cols={1}>
                                <img src={`http://127.0.0.1:5000/api/v1/resources/image?user=${tile.path.split('/')[1]}&img=${tile.name}`} alt={tile.name} />
                                <GridListTileBar
                                    title={tile.name}
                                    subtitle={<span>by: {tile.name}</span>}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </Grid>
            </Grid>
        </Container>
    )
}

const Observed = observer(VCluster);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ ImageStore: users }}></Observed >);
}

export default observer(WithStore);