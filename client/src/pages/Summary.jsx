import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
  Card,
} from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Summary = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  // Media query for responsiveness
  const isNotMobile = useMediaQuery("(min-width: 1000px)");

  // States
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  // Function to generate summary using Gemini API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSummary(""); // Reset summary
    setError(""); // Reset error

    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCpSW-lhpN3yUkMsOGOeWIWGalrPYG-Xb4");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContentStream(text);

      // Stream the response incrementally
      for await (const chunk of result.stream) {
        setSummary((prev) => prev + chunk.text());
      }
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(err.message || "An unexpected error occurred.");
      setTimeout(() => setError(""), 5000); // Clear error after 5 seconds
    }
  };

  return (
    <>
      {!loggedIn ? (
        <Box
          p={10}
          sx={{ display: "flex", justifyContent: "center", alignContent: "flex-start" }}
        >
          <Typography variant="h3">
            Please <Link to={'/login'}>Log In</Link> to Continue
          </Typography>
        </Box>
      ) : (
        <Box
          width={isNotMobile ? "40%" : "80%"}
          p={"2rem"}
          m={"2rem auto"}
          borderRadius={5}
          sx={{ boxShadow: 5 }}
          backgroundColor={theme.palette.background.alt}
        >
          <Collapse in={error !== ""}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          </Collapse>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Summarize Text</Typography>

            <TextField
              placeholder="Add your text (150 characters)"
              type="text"
              multiline
              required
              margin="normal"
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ color: "white", mt: 2 }}
            >
              Submit
            </Button>
            <Typography mt={2}>
              Not this tool? <Link to="/">GO BACK</Link>
            </Typography>
          </form>

          <Card
            sx={{
              mt: 4,
              border: 1,
              boxShadow: 0,
              height: "500px",
              borderRadius: 5,
              borderColor: "natural.medium",
              bgcolor: "background.default",
              overflowY: "auto",
            }}
          >
            <Typography
              variant="h5"
              color="natural.main"
              sx={{
                whiteSpace: "pre-wrap",
              }}
            >
              {summary || "Paragraph Will Appear Here (Please wait for a few seconds after submitting...)"}
            </Typography>
          </Card>
        </Box>
      )}
    </>
  );
};

export default Summary;
