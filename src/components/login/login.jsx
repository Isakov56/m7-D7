import { useState } from "react";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import Grid from "./styledGrid";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Login = (props) => {
  const [name, setName] = useState("");
  const classes = useStyles();
  return (
    <Grid container direction="column" alignItems="center" justify="center">
      <div className="d-flex align-items-center">
        <Typography variant="h4">LinkedIn</Typography>
        <LinkedInIcon style={{ fontSize: 50, color: "#0A66C2" }} />
      </div>
      <Paper className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="email"
            className={classes.input}
            id="password"
            label="Email or Phone"
            variant="filled"
          />
          <TextField
            className={classes.input}
            id="password"
            label="Password"
            variant="filled"
            type="password"
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                props.history.push(`/`);
              }
            }}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => props.history.push(`/`)}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
