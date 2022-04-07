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
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import { api } from "./global";

export function StudentsList() {
  const [students, setStudents] = useState([]);
  const history = useHistory();

  const getStudents = () => {
    fetch(`${api}/students`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((students) => setStudents(students));
  };

  useEffect(() => getStudents(), []);

  const deleteStudent = (id) => {
    fetch(`${api}/${id}`, {
      method: "DELETE",
    }).then(() => getStudents());
  };

  const style = {
    fontFamily: "cursive",
    letterSpacing: "1px",
    fontWeight: "900",
  };
  return (
    <div className="table">
      <h1>Students</h1>
      <div className="btn">
        <Button
          variant="outlined"
          onClick={() => history.push("/students/add")}
        >
          Add New Student
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={style}>S.no</TableCell>
              <TableCell align="center" style={style}>
                StudentName
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
            {students.map(({ name, surname, email, _id }, index) => (
              <Student
                key={index}
                name={name}
                surname={surname}
                email={email}
                // delete
                deleteButton={
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="delete"
                      style={{ marginLeft: "auto" }}
                      onClick={() => {
                        deleteStudent(_id);
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

function Student({ name, surname, email, deleteButton, index }) {
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
          {name + " " + surname}
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
