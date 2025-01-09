import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function AdminQuestions({ onUpdateTestNames, selectedTestName }) {
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tests, setTests] = useState([]);

  const [formData, setFormData] = useState({
    testName: "",
    testId: "",
    questionText: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    id: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Fetch questions and tests from API
  useEffect(() => {
    const fetchQuestionsAndTests = async () => {
      try {
        const [questionsResponse, testsResponse] = await Promise.all([
          axios.get("http://localhost:4000/api/questions"),
          axios.get("http://localhost:4000/api/tests"),
        ]);

        setQuestions(questionsResponse.data);
        setTests(testsResponse.data);

        // Extract unique test names and pass them to the parent
        const testNames = [
          ...new Set(questionsResponse.data.map((question) => question.testName)),
        ];
        onUpdateTestNames(testNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchQuestionsAndTests();
  }, [onUpdateTestNames]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      testName: "",
      testId: "",
      questionText: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
    });
    setEditingIndex(null);
  };

  // Save or update question
  const handleSaveCandidate = async () => {
    try {
      const { option1, option2, option3, option4, ...rest } = formData;
      const updatedFormData = {
        ...rest,
        options: {
          option1,
          option2,
          option3,
          option4,
        },
      };

      if (editingIndex !== null) {
        // Update question
        await axios.put(
          `http://localhost:4000/api/questions/${editingIndex.id}`,
          updatedFormData
        );
      } else {
        // Add new question
        await axios.post("http://localhost:4000/api/questions", updatedFormData);
      }

      // Refresh questions list
      const response = await axios.get("http://localhost:4000/api/questions");
      setQuestions(response.data);
      resetForm();
      setDialogOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  // Edit question
  const handleEditCandidate = (question) => {
    setEditingIndex(question);
    setFormData({
      testName: question.testName,
      testId: question.testId || "",
      questionText: question.questionText,
      option1: question.options?.option1 || "",
      option2: question.options?.option2 || "",
      option3: question.options?.option3 || "",
      option4: question.options?.option4 || "",
      correctAnswer: question.correctAnswer,
      id: question.id,
    });
    setDialogOpen(true);
  };

  // Delete question
  const handleDeleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/questions/${id}`);
      const response = await axios.get("http://localhost:4000/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  // Filter questions by the selected test name
  const filteredQuestions =
    selectedTestName === "All" || !selectedTestName
      ? questions
      : questions.filter((question) => question.testName === selectedTestName);

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.25rem" },
            textTransform: "uppercase",
          }}
        >
          Questions - Modify or Add Questions
        </Typography>
        <Button
          variant="contained"
          onClick={() => setDialogOpen(true)}
          sx={{
            color: "#000",
            backgroundColor: "#fff",
            border: "1px solid #000",
            width: { xs: "100%", sm: "auto" },
            marginTop: { xs: "10px", sm: "0" },
          }}
        >
          Add Question
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: 550 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderRight: "1px solid #b1b1b1" }}>S.no.</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>Option 1</TableCell>
              <TableCell>Option 2</TableCell>
              <TableCell>Option 3</TableCell>
              <TableCell>Option 4</TableCell>
              <TableCell>Correct Answer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question, index) => (
              <TableRow key={question.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{question.testName}</TableCell>
                <TableCell>{question.questionText}</TableCell>
                <TableCell>{question.options?.option1 || ""}</TableCell>
                <TableCell>{question.options?.option2 || ""}</TableCell>
                <TableCell>{question.options?.option3 || ""}</TableCell>
                <TableCell>{question.options?.option4 || ""}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  <IconButton color="primary" onClick={() => handleEditCandidate(question)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCandidate(question.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
Invite sent successfully        </Alert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ color: "#000" }}>
          {editingIndex !== null ? "Edit Question" : "Add Question"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            select
            label="Test"
            name="testName"
            variant="outlined"
            margin="dense"
            value={formData.testName}
            onChange={handleChange}
          >
            {tests.map((course) => (
              <MenuItem key={course.id} value={course.title}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Question Description"
            name="questionText"
            variant="outlined"
            margin="dense"
            value={formData.questionText}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Option 1"
            name="option1"
            variant="outlined"
            margin="dense"
            value={formData.option1}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Option 2"
            name="option2"
            variant="outlined"
            margin="dense"
            value={formData.option2}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Option 3"
            name="option3"
            variant="outlined"
            margin="dense"
            value={formData.option3}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Option 4"
            name="option4"
            variant="outlined"
            margin="dense"
            value={formData.option4}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Correct Option"
            name="correctAnswer"
            variant="outlined"
            margin="dense"
            value={formData.correctAnswer}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#000" }}
            onClick={() => {
              setDialogOpen(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveCandidate} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminQuestions;
