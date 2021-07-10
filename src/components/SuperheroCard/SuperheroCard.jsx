import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import clsx from 'clsx';

import { useFavoriteSuperhero } from 'redux-store/hooks/useFavoriteSuperhero';
import { useSelectSuperheroById } from 'redux-store/hooks/useSelectSuperheroById';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    width: `calc(100% - ${theme.spacing(1) * 2}px)`,
    marginTop: 25,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  containerVertical: {
    flexDirection: 'column',
    height: 425,
  },
  containerHorizontal: {
    height: 150,
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
    display: 'flex',
  },
  headerWrapperVertical: {
    flexDirection: 'column',
  },
  headerWrapperHorizontal: {
    flexDirection: 'row',
  },
  imageVertical: {
    height: '75%',
    width: '100%',
  },
  imageHorizontal: {
    width: 100,
    flexShrink: 0,
    height: '100%',
  },
}));

export const SuperheroCard = props => {
  const { id, layout = 'vertical' } = props;
  const classes = useStyles();
  const { isFavorite, toggle } = useFavoriteSuperhero(id);
  const { superhero = {} } = useSelectSuperheroById(id)

  const isVerticalLayout = layout === 'vertical';
  return (
    <Card className={clsx(classes.container, {
      [classes.containerVertical]: isVerticalLayout,
      [classes.containerHorizontal]: !isVerticalLayout,
    })}>
      <CardActionArea component={Link} to={`/superhero/${id}`} className={classes.header}>
        <div className={clsx(classes.headerWrapper, {
          [classes.headerWrapperVertical]: isVerticalLayout,
          [classes.headerWrapperHorizontal]: !isVerticalLayout,
        })}>
          <CardMedia
            className={clsx({
              [classes.imageVertical]: isVerticalLayout,
              [classes.imageHorizontal]: !isVerticalLayout,
            })}
            image={superhero.images?.url}
            title={superhero.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {superhero.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {superhero.biography?.publisher}
            </Typography>
          </CardContent>
        </div>
      </CardActionArea>
      <CardActions>
        <IconButton onClick={toggle}>
          {isFavorite ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
      </CardActions>
    </Card>
  );
};

if (process.env.NODE_ENV !== 'production') {
  SuperheroCard.displayName = 'SuperheroCard';
}
