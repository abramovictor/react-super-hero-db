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
import AddBoxIcon from '@material-ui/icons/AddBox';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

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
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
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

export const MainLayout = props => {
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
            className={clsx(classes.menuButton, open && classes.hide)}
            onClick={handleDrawerOpen}
          >
            <MenuIcon/>
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
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon/>
          </IconButton>
        </div>
        <Divider/>
        <List>
          <ListItem ContainerComponent={'li'}>
            <Button component={Link} to={'/'} className={classes.link}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary={'Home'}/>
            </Button>
          </ListItem>
          <ListItem ContainerComponent={'li'}>
            <Button component={Link} to={'/'} className={classes.link}>
              <ListItemIcon><AddBoxIcon/></ListItemIcon>
              <ListItemText primary={'Add new superhero'}/>
            </Button>
          </ListItem>
          <ListItem ContainerComponent={'li'}>
            <Button component={Link} to={'/'} className={classes.link}>
              <ListItemIcon><AssignmentIndIcon/></ListItemIcon>
              <ListItemText primary={'Profile'}/>
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
