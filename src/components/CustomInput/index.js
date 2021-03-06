import React from 'react';

import { Paper, IconButton, InputBase, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputPaper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    padding: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '2em',
  },
}));

const CustomInput = (props) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.inputPaper} elevation={0}>
      <IconButton
        disabled
        type="submit"
        className={classes.icon}
        aria-label="input-icon"
      >
        {props.icon}
      </IconButton>
      {/* TODO: validate the DNI, just 8 characters */}
      {/* TODO: validate the codeUNI, just 9 characters */}
      <InputBase {...props} className={classes.input} />
    </Paper>
  );
};

export default CustomInput;
