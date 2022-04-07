import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { api } from "./global";

export function MentorsList() {
  const [mentors, setMentors] = useState([]);
  const getMentors = () => {
    fetch(`${api}/mentors`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mentors) => setMentors(mentors));
  };
  console.log(mentors);
  useEffect(() => getMentors(), []);
  const deleteMentor = (id) => {
    fetch(`${api}/mentors/${id}`, {
      method: "DELETE",
    }).then(() => getMentors());
  };
  const history = useHistory();
  const style = {
    fontFamily: "cursive",
    letterSpacing: "1px",
    fontWeight: "900",
  };
  return (
    <div className="table">
      <h1>Mentors</h1>
      <div className="btn">
        <Button variant="outlined" onClick={() => history.push("/mentors/add")}>
          Add New Mentor
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={style}>S.no</TableCell>
              <TableCell align="center" style={style}>
                Mentor Id
              </TableCell>
              <TableCell align="center" style={style}>
                Name
              </TableCell>
              <TableCell align="center" style={style}>
                Email
              </TableCell>
              <TableCell align="center" style={style}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mentors.map(({ name, email, mentorId, _id }, index) => (
              <Mentor
                key={index}
                name={name}
                email={email}
                mentorid={mentorId}
                // delete
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: "auto" }}
                      onClick={() => {
                        deleteMentor(_id);
                      }}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                }
                id={_id}
                index={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Mentor({ name, email, mentorid, deleteButton, index }) {
  const style = {
    fontFamily: "Carter One",
    letterSpacing: "2px",
    fontWeight: "600",
  };
  const num = index + 1;

  return (
    <>
      <TableRow
        key={index}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {num}
        </TableCell>
        <TableCell style={style} align="center">
          {mentorid}
        </TableCell>
        <TableCell style={style} align="center">
          {name}
        </TableCell>
        <TableCell style={style} align="center">
          {email}
        </TableCell>
        <TableCell style={style} align="center">
          {deleteButton}
        </TableCell>
      </TableRow>
    </>
  );
}
