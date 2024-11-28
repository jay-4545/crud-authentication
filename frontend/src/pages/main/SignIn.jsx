import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../services/apiServices";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slice/userSlice";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function goToSignup() {
    navigate("/signup");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      const result = await signIn(formData);

      if (result.token) {
        localStorage.setItem("token", result.token);
        const user = jwtDecode(result.token);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
        navigate("/");
        alert("Login success!");
      } else {
        alert("Login failed!");
      }
    } catch (error) {
      console.log("Error: ", error.message);
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
        <h2 className="text-2xl mb-4">Sign In</h2>
      </div>
      <div className="flex flex-col gap-4">
        <TextField id="email" label="Email" name="email" />
        <TextField
          id="password"
          label="Password"
          name="password"
          type="password"
        />
        <div className="flex flex-col gap-2">
          <Button variant="contained" type="submit">
            Login
          </Button>
          <p className="text-center">or</p>
          <Button onClick={goToSignup} variant="outlined">
            Signup
          </Button>
        </div>
      </div>
    </Paper>
  );
}

export default SignIn;
