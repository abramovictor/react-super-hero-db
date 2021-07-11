import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Wrapper } from 'components/Wrapper';

const drawerWidth = 280;

const useStyles = makeStyles(theme => {
  return ({
    root: {
      display: 'flex',
    },
    appBar: {
      boxShadow: theme.shadows[10],
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    appBarInner: {
      display: 'flex',
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      position: 'absolute',
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: theme.shadows[20],
    },
    appBarHeader: {
      '&::before': {
        content: '""',
        display: 'block',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100vh',
      minHeight: '500px',
    },
    contentContainer: {
      flexGrow: 1,
    },
    link: {
      display: 'flex',
      width: '100%',
    },
  });
});

export const Layout = props => {
  const { title, children, appBarChildren } = props;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position={'fixed'}
        color={'default'}
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            edge={'start'}
            color={'inherit'}
            className={classes.menuButton}
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            {open ? <ChevronLeftIcon/> : <MenuIcon/>}
          </IconButton>
          <Typography noWrap variant={'h6'}>
            {title}
          </Typography>
          <div className={classes.appBarInner}>
            <Grid container justifyContent={'flex-end'}>
              <Grid item xs={10}>
                <Wrapper>
                  {appBarChildren}
                </Wrapper>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        className={classes.drawer}
        variant={'persistent'}
        anchor={'left'}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem ContainerComponent={'li'}>
            <Button component={Link} to={'/'} className={classes.link}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={'Home'}/>
            </Button>
          </ListItem>
          <Divider/>
          <ListItem ContainerComponent={'li'}>
            <Button component={Link} to={'/favorites'} className={classes.link}>
              <ListItemIcon><FavoriteIcon/></ListItemIcon>
              <ListItemText primary={'Favorites'}/>
            </Button>
          </ListItem>
        </List>
      </Drawer>
      <main className={clsx(classes.content, classes.appBarHeader)}>
        <div className={classes.contentContainer}>
          {children}
        </div>
      </main>
    </div>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Layout.displayName = 'Layout';
}
