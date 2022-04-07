import { useState, Fragment } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { History } from "./History";
import { StudentsList } from "./Studentslist";
import { MentorsList } from "./Mentorslist";
import { AddStudent } from "./Addstudent";
import { AddMentor } from "./AddMentor";
import ChangeMentor from "./Changementor";
import { AssignMentor } from "./Assignmentor";
import FindByMentor from "./FIndByMentor";
import { Homepage } from "./Homepage";
import HomeIcon from "@mui/icons-material/Home";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import PeopleIcon from "@mui/icons-material/People";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export default function App() {
  const history = useHistory();

  const [mode, setMode] = useState("dark");
  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  // drawer
  const array = [
    {
      name: <div className="drawer-name">Home</div>,
      onClick: "/",
      icon: <HomeIcon />,
    },
    {
      name: <div className="drawer-name">History</div>,
      onClick: "/history",
      icon: <ManageHistoryIcon />,
    },
    {
      name: <div className="drawer-name">Students</div>,
      onClick: "/students",
      icon: <PeopleIcon />,
    },
    {
      name: <div className="drawer-name">Add a Student</div>,
      onClick: "/students/add",
      icon: <PersonAddIcon />,
    },
    {
      name: <div className="drawer-name">Mentors</div>,
      onClick: "/mentors",
      icon: <PeopleAltIcon />,
    },
    {
      name: <div className="drawer-name">Add a Mentor</div>,
      onClick: "/mentors/add",
      icon: <PersonAddAltIcon />,
    },
    {
      name: <div className="drawer-name">Change Mentor</div>,
      onClick: "/mentors/edit",
      icon: <ManageAccountsIcon />,
    },
    {
      name: <div className="drawer-name">Assign Mentor</div>,
      onClick: "/mentors/asign",
      icon: <AssignmentTurnedInIcon />,
    },
    {
      name: <div className="drawer-name">FindByMentor</div>,
      onClick: "/mentors/find",
      icon: <FindInPageIcon />,
    },
  ];

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {array.map(({ name, onClick, icon }, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              history.push(onClick);
            }}
          >
            <ListItemText color="success" primary={name} />
            {icon}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={4} style={{ borderRadius: "0px", minHeight: "100vh" }}>
        <div className="App">
          <AppBar position="static">
            <Toolbar>
              {["left"].map((anchor) => (
                <Fragment key={anchor}>
                  <Button color="inherit" onClick={toggleDrawer(anchor, true)}>
                    <div className="drawer-icon">
                      <MenuIcon />
                      Menu
                    </div>
                  </Button>
                  <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                  >
                    {list(anchor)}
                  </Drawer>
                </Fragment>
              ))}

              {/* light and dark mode logic */}
              <Button
                color="inherit"
                style={{ marginLeft: "auto" }}
                startIcon={
                  mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />
                }
                onClick={() => {
                  setMode(mode === "light" ? "dark" : "light");
                }}
              >
                {mode === "light" ? "dark" : "light"} Mode
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path="/students">
              <StudentsList />
            </Route>
            <Route path="/students/add">
              <AddStudent />
            </Route>
            <Route path="/mentors/add">
              <AddMentor />
            </Route>
            <Route exact path="/mentors">
              <MentorsList />
            </Route>
            <Route exact path="/mentors/edit">
              <ChangeMentor />
            </Route>
            <Route exact path="/mentors/asign">
              <AssignMentor />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route exact path="/mentors/find">
              <FindByMentor />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>

            <Route path="**">404</Route>
          </Switch>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
