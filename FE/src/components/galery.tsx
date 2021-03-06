import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import { ImageStore } from "../store/images";
import { IImage } from "../model/models";
import { GridList, createStyles, makeStyles, Theme, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info"
import { BVRadar } from "./radar";
import BVFilter from './filter';
import { REST_API } from "../config";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',
            backgroundColor: theme.palette.primary.main,
            height: '100%'
        },
        gridList: {
            width: "100%",
            height: 500,

        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
        gridListTile: {
            backgroundColor: "black",
            borderStyle: "dashed",
        }
    }),
);

const Galery: React.FunctionComponent<{ ImageStore: ImageStore }> = ({ ImageStore }) => {
    const classes = useStyles();
    const [overedTile, setOveredTile] = React.useState<number>(-1);

    useEffect(() => {
        ImageStore.getAllImages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mouseClickHandler = (event: MouseEvent, tile: IImage) => {
        ImageStore.selectedImageId = tile.id;
        event.stopPropagation();
    }

    const mouseOverTileHandler = (event: MouseEvent, index: number) => {
        setOveredTile(index)
    }
    return (
        <div className={classes.root}>
            <div>
                <GridList cellHeight={160} className={classes.gridList} cols={4}>
                    {ImageStore.filteredImages.map((tile: IImage, i: number) => (
                        <GridListTile key={i} cols={1} className={overedTile === i ? classes.gridListTile : ''}>
                            <img src={`${REST_API}/resources/image?user=${tile.path.split('/')[1]}&img=${tile.name}`} alt={tile.name}
                                onMouseOver={(e: any) => mouseOverTileHandler(e, i)} onClick={(e: any) => mouseClickHandler(e, tile)} />
                            <GridListTileBar
                                title={tile.name}
                                subtitle={<span>by: {tile.name}</span>}
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    )
};

const Observed = observer(Galery);
const WithStore: React.FunctionComponent = () => {
    const { users } = useStore();
    return (<Observed {...{ ImageStore: users }}></Observed >);
}

export default observer(WithStore);