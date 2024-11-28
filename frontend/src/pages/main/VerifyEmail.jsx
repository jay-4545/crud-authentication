import React, { useEffect } from "react";
import { verifyEmail } from "../../services/apiServices";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    verifyEmail(searchParams.get("userId"), searchParams.get("token"));
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p>Your Email has been verified!</p>
      <Button LinkComponent={Link} to="/signin">
        Go To Login
      </Button>
    </div>
  );
}

export default VerifyEmail;
