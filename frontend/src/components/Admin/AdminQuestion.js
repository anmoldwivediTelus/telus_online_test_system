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

function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tests, setTests] = useState([]);
  const [formData, setFormData] = useState({
      testName:"",
      testId:"",
      questionText: "",
      option1: "",
      option2: "",
      option2: "",
      option4: "",
      correctAnswer:"",
      id:""
      
  });
  const [editingIndex, setEditingIndex] = useState(null);

  
  // Fetch questions from API
  useEffect(() => {
    axios.get("http://localhost:4000/api/questions")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setQuestions(response.data);
        axios.get("http://localhost:4000/api/tests")
        .then((response) => {
          console.log("Fetched Data:", response.data);
          setTests(response.data);
        })
        .catch((error) => console.error("Error fetching questions:", error));
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  
  // Reset form data
  const resetForm = () => {
    setFormData({ 
      testName: "",
      testId:"",
      questionText: "",
      option1: "",
      option2: "",
      option2: "",
      option4: "",
      correctAnswer:""
     });
    setEditingIndex(null);
  };

  // Save or update candidate
  const handleSaveCandidate = async () => {
    
    try {
      if (editingIndex !== null) {
        console.log(editingIndex,"editingIndexeditingIndex",formData)
        // Update candidate
        // Changed from _id to id
        let options = {
          option1:formData['option1'],
          option2:formData['option2'],
          option3:formData['option3'],
          option4:formData['option4'],
        }
        let updatedFormData = {
          options,
          questionText:formData.questionText,
          correctAnswer:formData.correctAnswer,
          testName:formData.testName,

        }
        await axios.put(`http://localhost:4000/api/questions/${editingIndex.id}`, updatedFormData);
      } else {
        // Add questions
        let options = {
          option1:formData['option1'],
          option2:formData['option2'],
          option3:formData['option3'],
          option4:formData['option4'],
        }
        let updatedFormData = {
          options,
          questionText:formData.questionText,
          correctAnswer:formData.correctAnswer,
          testName:formData.testName,

        }
        
        console.log(updatedFormData,"updatedFormData")
        
        await axios.post("http://localhost:4000/api/questions", updatedFormData);
      }
      // Refresh questions list
      const response = await axios.get("http://localhost:4000/api/questions");
      setQuestions(response.data);
      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  // Edit candidate
  const handleEditCandidate = (question) => {
   setEditingIndex(question);
   let editFormData= {
    testId:question.testId,
    questionText: question.questionText,
    option1: question.options.option1,
    option2: question.options.option2,
    option3: question.options.option3,
    option4: question.options.option4,
    correctAnswer:question.correctAnswer,
    testName:question.testName
   }
    //console.log(editFormData,"sdfadadfsaf",question)
    setFormData(editFormData);
    setDialogOpen(true);
  };

  // Delete candidate
  const handleDeleteCandidate = async (index) => {
    //const id = questions.id; // Changed from _id to id
    try {
      await axios.delete(`http://localhost:4000/api/questions/${index}`);
      const response = await axios.get("http://localhost:4000/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  // Send invite
  const handleSendInvite = async (index) => {
    const id = questions[index].email; // Changed from _id to id
    try {
      await axios.post(`http://localhost:5000/api/invites/send-invite`, { email: id , testName: "ReactJS",testId: 2 });
      const updatedquestions = questions.map((candidate, i) =>
        i === index ? { ...candidate, status: "Invite Sent" } : candidate
      );
      setQuestions(updatedquestions);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}> <Box
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
      fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
    }}
  >
    Questions - Modify or Add Questions
  </Typography>
  <Button
    variant="contained"
    color="success"
    onClick={() => setDialogOpen(true)}
    sx={{
      width: { xs: "100%", sm: "auto" },
      marginTop: { xs: "10px", sm: "0" },
    }}
  >
    Add Question
  </Button>
</Box>
      <TableContainer component={Paper}  sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
            {questions.map((question) => (
              <TableRow key={question.id}> {/* Changed from index to candidate.id */}
                <TableCell>{question.testName}</TableCell>
                <TableCell>{question.questionText}</TableCell>
                <TableCell>{question.options?.a || question.options.option1}</TableCell>
                <TableCell>{question.options?.b || question.options.option2}</TableCell>
                <TableCell>{question.options?.c || question.options.option3}</TableCell>
                <TableCell>{question.options?.d || question.options.option4}</TableCell>
                <TableCell>{question.correctAnswer}</TableCell>
                <TableCell>
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

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Invite sent successfully!
        </Alert>
      </Snackbar>

      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{editingIndex !== null ? "Edit Question" : "Add Question"}</DialogTitle>
        <DialogContent>
        <TextField
            fullWidth
            select
            label="Test"
            defaultValue="hello"
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
            max={20}
            value={formData.correctAnswer}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              resetForm();
            }}
            color="secondary"
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
