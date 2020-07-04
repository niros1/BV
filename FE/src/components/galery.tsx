import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStore } from "../setupContext";
import { UserStore } from "../store/users";
import { IImage } from "../model/models";
import { GridList, createStyles, makeStyles, Theme, GridListTile, GridListTileBar, IconButton } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info"
import { BVRadar } from "./radar";
import BVFilter from './filter';


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
            width: 500,
            height: 450,

        },
        icon: {
            color: 'rgba(255, 255, 255, 0.54)',
        },
    }),
);

const Galery: React.FunctionComponent<{ userStore: UserStore }> = ({ userStore }) => {
    const classes = useStyles();
    useEffect(() => {
        userStore.getAllImages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const mouseClickHandler = (event: MouseEvent, tile: IImage) => {
        userStore.selectedImageId = tile.id;
        event.stopPropagation();
    }

    return (
        <div className={classes.root}>
            <div>
                <GridList cellHeight={160} className={classes.gridList} cols={3}>
                    {userStore.filteredImages.map((tile: IImage, i: number) => (
                        <GridListTile key={i} cols={1}>
                            <img src={`http://127.0.0.1:5000/api/v1/resources/image?user=${tile.path.split('/')[1]}&img=${tile.name}`} alt={tile.name} onClick={(e: any) => mouseClickHandler(e, tile)} />
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
    return (<Observed {...{ userStore: users }}></Observed >);
}

export default observer(WithStore);