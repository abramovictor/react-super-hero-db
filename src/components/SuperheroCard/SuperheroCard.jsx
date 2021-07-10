import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${theme.spacing(1) * 2}px)`,
    height: 425,
    marginTop: 25,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  header: {
    flexGrow: 1,
  },
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  image: {
    height: '75%',
  },
}));

export const SuperheroCard = props => {
  const { image, title, description } = props;
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <CardActionArea className={classes.header}>
        <div className={classes.headerWrapper}>
          <CardMedia
            className={classes.image}
            image={image}
            title={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions className={classes.footer}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

if (process.env.NODE_ENV !== 'production') {
  SuperheroCard.displayName = 'SuperheroCard';
}
