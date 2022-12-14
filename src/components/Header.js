import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./Authentication/AuthModal";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    fontFamily: "Monserrat",
    color: "gold",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));
const Header = () => {
  const classes = useStyles();
const {currency , setCurrency} = CryptoState()
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography className={classes.title}>
              <Link to="/">Emeka Crypto</Link>
            </Typography>

            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
                
              }}
              value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
             <AuthModal/>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
