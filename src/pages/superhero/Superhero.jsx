import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useLatest, useToggle, useUpdateEffect } from 'react-use';
import useSetState from 'react-use/lib/useSetState';
import { makeStyles } from '@material-ui/styles';

import capitalize from 'lodash/capitalize';
import kebabCase from 'lodash/kebabCase';

import {
  IconButton,
  CircularProgress,
  TableCell,
  TableRow,
  Table,
  TableBody,
  Collapse,
  Box,
  Grid,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import { useGetSuperhero } from 'redux-store/hooks/useGetSuperhero';
import { editCharacter } from 'redux-store/superheroes/superheroesSlice';

import { SearchBar } from 'components/SearchBar';
import { Layout } from 'components/Layout';
import { Fullscreen } from 'components/Fullscreen';
import { SuperheroCard } from 'components/SuperheroCard';
import { Editable } from 'components/Editable';

const spinner = (
  <Fullscreen>
    <CircularProgress size={100}/>
  </Fullscreen>
);

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const defaultRenderValue = value => {
  return Array.isArray(value) ? value.join(', ') : value;
};

const noop = () => {};

const Row = props => {
  const { isContentEditable = false, name, data, renderValue = defaultRenderValue, onChange = noop } = props;

  const [isOpened, setIsOpened] = useState(false);
  const classes = useRowStyles();

  const handleToggle = () => setIsOpened(isOpen => !isOpen);
  const [content, setContent] = useSetState(data);

  const latestOnChange = useLatest(onChange);
  useUpdateEffect(() => {
    if (isContentEditable) {
      latestOnChange.current(content);
    }
  }, [content]);

  return (
    <Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton size={'small'} onClick={handleToggle}>
            {isOpened ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
          </IconButton>
        </TableCell>
        <TableCell component={'th'} scope={'row'}>
          {name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse unmountOnExit in={isOpened} timeout={'auto'}>
            <Box margin={2}>
              <Table size={'small'}>
                <TableBody>
                  {Object.keys(data).map((key, index) => (
                    <TableRow key={index}>
                      <TableCell width={'25%'} component={'th'}>{capitalize(kebabCase(key).replace('-', ' '))}</TableCell>
                      <TableCell width={'75%'}>
                        <Editable
                          value={renderValue(content[key])}
                          contentEditable={isContentEditable}
                          onChange={value => setContent({ [key]: value })}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Superhero = () => {
  const styles = useStyles();
  const { id } = useParams();
  const { superhero, isSuccess, isLoading } = useGetSuperhero(id);
  const [isContentEditable, toggleIsContentEditable] = useToggle(false);

  const dispatch = useDispatch();
  const handleChange = ({ key, value }) => {
    dispatch(editCharacter({ id, data: { ...superhero, [key]: value } }));
  };

  return (
    <Layout title={isSuccess ? superhero.name : '...'} appBarChildren={<SearchBar/>}>
      {isLoading ? spinner : isSuccess ? (
        <div className={styles.root}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <SuperheroCard id={id}/>
            </Grid>
            <Grid item xs={7}>
              <FormControlLabel
                label={'Edit'}
                control={
                  <Switch color={'primary'} checked={isContentEditable} onChange={toggleIsContentEditable}/>
                }
              />

              <Editable
                value={superhero.name}
                contentEditable={isContentEditable}
                onChange={value => handleChange({ key: 'name', value })}
              />

              <Table>
                <TableBody>
                  <Row
                    isContentEditable={isContentEditable}
                    name={'Powerstats'}
                    data={superhero.powerstats}
                    onChange={value => handleChange({ key: 'powerstats', value })}
                  />
                  <Row
                    isContentEditable={isContentEditable}
                    name={'Biography'}
                    data={superhero.biography}
                    onChange={value => handleChange({ key: 'biography', value })}
                  />
                  <Row
                    isContentEditable={isContentEditable}
                    name={'Appearance'}
                    data={superhero.appearance}
                    onChange={value => handleChange({ key: 'appearance', value })}
                  />
                  <Row
                    isContentEditable={isContentEditable}
                    name={'Work'}
                    data={superhero.work}
                    onChange={value => handleChange({ key: 'work', value })}
                  />
                  <Row
                    isContentEditable={isContentEditable}
                    name={'Connections'}
                    data={superhero.connections}
                    onChange={value => handleChange({ key: 'connections', value })}
                  />
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      ) : null}
    </Layout>
  );
};

export default Superhero;

if (process.env.NODE_ENV !== 'production') {
  Superhero.displayName = 'Home';
}
