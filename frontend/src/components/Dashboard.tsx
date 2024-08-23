import React, { useEffect } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      }}
    >
      <Button
        onClick={handleLogout}
        variant="contained"
        color="secondary"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
        }}
      >
        Logout
      </Button>
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Welcome to the application!
        </Typography>
      </Container>
    </Box>
  );
};

export default Dashboard;
