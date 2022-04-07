import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { api } from "./global";

const studentValidationSchema = yup.object({
  name: yup.string().required("Why not fill this name? 😉"),
  surname: yup.string().required("Why not fill this name? 😉"),
  email: yup.string().required("Why not fill this email? 😉"),
});

export function AddStudent() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
    },
    validationSchema: studentValidationSchema,
    onSubmit: (newStudent) => {
      addStudent(newStudent);
    },
  });

  const addStudent = (newStudent) => {
    console.log("onSubmit", newStudent);
    fetch(`${api}/students/`, {
      method: "POST",
      body: JSON.stringify([newStudent]),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/mentors/asign"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1>Here you can add students</h1>
      <TextField
        className="text"
        label="Student Name"
        variant="outlined"
        margin="dense"
        id="name"
        name="name"
        onChange={formik.handleChange}
        value={formik.values.name}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : ""
        }
      />
      <TextField
        className="text"
        label="Surname"
        variant="outlined"
        margin="dense"
        id="surname"
        name="surname"
        onChange={formik.handleChange}
        value={formik.values.surname}
        onBlur={formik.handleBlur}
        error={formik.touched.surname && formik.errors.surname}
        helperText={
          formik.touched.surname && formik.errors.surname
            ? formik.errors.surname
            : ""
        }
      />
      <TextField
        className="text"
        label="Email"
        variant="outlined"
        margin="dense"
        id="email"
        name="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        helperText={
          formik.touched.email && formik.errors.email ? formik.errors.email : ""
        }
      />
      <Button variant="contained" type="submit">
        Add Student
      </Button>
    </form>
  );
}
