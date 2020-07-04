import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IUser } from '../model/models';
import { useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        width: 200,
    }
});

export function User({ user }: { user: IUser }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    let match = useRouteMatch();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media}
                    component="img"
                    alt="Campaing"
                    height="160"
                    image="http://www.hotavatars.com/wp-content/uploads/2019/01/I80W1Q0.png"
                    title="Campaing"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography> */}
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Emotions...  {match.url}
                </Button>
                {/* <Button size="small" color="primary">
                    Learn More
        </Button> */}
            </CardActions>
        </Card>
    )
}