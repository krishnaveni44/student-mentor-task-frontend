import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { api } from "./global";

export function AssignMentor({ color }) {
  const history = useHistory();

  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  function getStudents() {
    fetch(`${api}/students`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setStudents(res))
      .then((res) => console.log(res));
  }
  useEffect(() => {
    getStudents();
  }, []);

  function getMentors() {
    fetch(`${api}/mentors`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setMentors(res))
      .then((res) => console.log(res));
  }
  useEffect(() => {
    getMentors();
  }, []);

  const [mentorId, setMentorId] = useState("");
  const handleMentorChange = (event) => {
    setMentorId(event.target.value);
    // console.log(event.target.value);
  };
  const [studentId, setStudentId] = useState([]);
  const handleStudentChange = (event) => {
    setStudentId(event.target.value);
    // console.log(event.target.value);
  };

  const changeMentor = async () => {
    if (studentId.length === 0) {
      alert("please select a student");
    } else if (mentorId === "") {
      alert("please select a mentor");
    } else {
      const data = {
        id: studentId,
      };

      const data1 = {
        mentorId: mentorId,
      };
      // function to change mentor for a student in API through PATCH method
      await fetch(`${api}/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data1),
      }).then(() => history.push("/history"));
    }
  };

  let unassignedstudents = students
    .filter((student) => !student.mentorId)
    .map((s) => s);

  // console.log(unassignedstudents)
  return (
    <div className="changementor-fromcontrol input">
      <h1>Assign a Mentor for Students</h1>
      <FormControl className="changementor-form">
        <InputLabel id="demo-multiple-name-label">Select Student</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={studentId}
          label="Select Student"
          onChange={handleStudentChange}
        >
          {/* <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={studentId}
          onChange={handleStudentChange}
          input={<OutlinedInput label="Select Student" />}
        > */}
          {unassignedstudents.map((e, index) => (
            <MenuItem value={e._id} key={index}>
              {" "}
              {e.name} {e.surname}{" "}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Select Mentor</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mentorId}
          label=" Select Mentor"
          onChange={handleMentorChange}
        >
          {mentors.map((e, index) => (
            <MenuItem value={e.mentorId} key={index}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        id="changeMentor"
        onClick={changeMentor}
        variant="contained"
        color="primary"
      >
        Assign Mentor
      </Button>
    </div>
  );
}
