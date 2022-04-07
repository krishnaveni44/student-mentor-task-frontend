import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { api } from "./global";
const mentorValidationSchema = yup.object({
  name: yup.string().required("Why not fill this name? 😉"),
  mentorId: yup.string().required("Why not fill this MentorID? 😉"),
  email: yup.string().required("Why not fill this email? 😉"),
});

export function AddMentor() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: "",
      mentorId: "",
      email: "",
    },
    validationSchema: mentorValidationSchema,
    onSubmit: (newMentor) => {
      addMentor(newMentor);
    },
  });

  const addMentor = (newMentor) => {
    console.log("onSubmit", newMentor);
    fetch(`${api}/mentors/`, {
      method: "POST",
      body: JSON.stringify([newMentor]),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => history.push("/mentors"));
  };

  return (
    <form onSubmit={formik.handleSubmit} className="input">
      <h1>Here you can add Mentors</h1>
      <TextField
        className="text"
        label="Mentor Name"
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
        label="MentorId"
        variant="outlined"
        margin="dense"
        id="mentorId"
        name="mentorId"
        onChange={formik.handleChange}
        value={formik.values.mentorId}
        onBlur={formik.handleBlur}
        error={formik.touched.mentorId && formik.errors.mentorId}
        helperText={
          formik.touched.mentorId && formik.errors.mentorId
            ? formik.errors.mentorId
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
        Add Mentor
      </Button>
    </form>
  );
}
