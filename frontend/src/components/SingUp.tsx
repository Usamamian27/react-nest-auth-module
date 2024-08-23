import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Link,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../utils/api";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Za-z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
          /[@$!%*#?&]/,
          "Password must contain at least one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}/auth/signup`, values);
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Signup failed. Please try again."
        );
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      }}
    >
      <Container maxWidth="xs">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign Up
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Sign Up
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/login" variant="body2">
            Already have an account? Login
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default SignUp;
