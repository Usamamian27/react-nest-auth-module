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

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${baseURL}/auth/login`, values);
        localStorage.setItem("token", response.data.access_token);
        navigate("/");
      } catch (error: any) {
        setError(
          error.response?.data?.message || "Login failed. Please try again."
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
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={formik.handleSubmit}>
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
              Sign In
            </Button>
          </Box>
        </form>
        <Box mt={2} textAlign="center">
          <Link href="/signup" variant="body2">
            Don't have an account? Create one
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
