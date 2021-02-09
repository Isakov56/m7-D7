import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  test: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  grid: {
    minHeight: "80vh",
    flexGrow: 1,
    overflow: "hidden",
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 600,
    padding: theme.spacing(2),
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    color: "#666666",
  },
  button: {
    justify: "center",
    width: "100%",
  },
}));

export default useStyles;
