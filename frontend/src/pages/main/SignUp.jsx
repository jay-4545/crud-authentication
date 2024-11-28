import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/apiServices";

function SignUp() {
  const navigate = useNavigate();

  function goToLogin() {
    navigate("/signin");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const objFormData = Object.fromEntries(
      Array.from(formData.entries(e.target))
    );

    if (objFormData.password !== objFormData.conformPassword) {
      alert("Password Must Match!");
      return;
    }

    await signUp(formData);

    if (formData.isVerified) {
      navigate("/signin");
    }
  }

  return (
    <Paper
      variant="outlined"
      component={"form"}
      className="p-4 mt-8 mx-auto max-w-[500px]"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-2xl mb-4">Sign Up</h2>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <TextField id="fname" name="fname" label="First Name" />
          <TextField id="lname" name="lname" label="Last Name" />
        </div>
        <TextField id="email" label="Email" name="email" />
        <TextField
          id="password"
          label="Password"
          name="password"
          type="password"
        />
        <TextField
          id="conformPassword"
          label="ConformPassword"
          type="password"
          name="conformPassword"
        />
        <div className="flex flex-col gap-2">
          <Button variant="contained" type="submit">
            SignUp
          </Button>
          <p className="text-center">or</p>
          <Button onClick={goToLogin} variant="outlined">
            Login
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default SignUp;
