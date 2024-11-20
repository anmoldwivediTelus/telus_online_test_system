import React, { useState } from "react";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import './AdminQuestion.css'
function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    courseName: "ReactJS",
    question: "",
    marks: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",

  });
  const [editingIndex, setEditingIndex] = useState(null);

  const courses = ["ReactJS", "AngularJS", "JavaScript"];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 
  // Reset form data
  const resetForm = () => {
    setFormData({courseName: "ReactJS",  question: "", marks:"", option1: "",option2: "",option3: "",option4: "",  answer: "" });
    setEditingIndex(null);
  };

  const handleSaveQuestions = () => {
   
      setQuestions([...questions, { ...formData, status: "Pending" }]);
    
    resetForm();
    setDialogOpen(false);
  };
  
  // Edit Questions
  const handleEditQuestions = (index) => {
    setEditingIndex(index);
    setFormData(questions[index]);
    setDialogOpen(true);
  };

  // Delete Questions
  const handleDeleteQuestions = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

 

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recruiter Dashboard - Add Question
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
        sx={{ marginLeft: "auto" ,mb: 2}}
      >
        Add Question
      </Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
            <TableCell>Course</TableCell>
             <TableCell>Question</TableCell>
              <TableCell>Marks</TableCell>
              <TableCell>Option 1</TableCell>
              <TableCell>Option 2</TableCell>
              <TableCell>Option 3</TableCell>
              <TableCell>Option 4</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Actions</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((ques, index) => (
              <TableRow key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           >
              <TableCell>{ques.courseName} </TableCell>
               <TableCell>{ques.question} </TableCell>
                <TableCell>{ques.marks}</TableCell>
                <TableCell>{ques.option1}</TableCell>
                <TableCell>{ques.option2}</TableCell>
                <TableCell>{ques.option3}</TableCell>
                <TableCell>{ques.option4}</TableCell>
                <TableCell>{ques.answer}</TableCell>

                <TableCell>
                
                  <IconButton
                    color="primary"
                    onClick={() => handleEditQuestions(index)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteQuestions(index)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

     
      {/* Add/Edit Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {editingIndex !== null ? "Edit Question" : "Add Question"}
        </DialogTitle>
        <DialogContent>
        <TextField
            select
            
            label="Course"
            name="courseName"
            variant="outlined"
            margin="dense"
            value={formData.courseName}
            onChange={handleChange}
          >
            {courses.map((course) => (
              <MenuItem key={course} value={course}>
                {course}
              </MenuItem>
            ))}
          </TextField>
        <TextField
            fullWidth
            label="Question"
            name="question"
            variant="outlined"
            margin="dense"
            value={formData.question}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Marks"
            name="marks"
            variant="outlined"
            margin="dense"
            value={formData.marks}
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
          >
          </TextField>
          <TextField
            fullWidth
            label="Answer"
            name="answer"
            variant="outlined"
            margin="dense"
            value={formData.answer}
            onChange={handleChange}
          >
          </TextField>
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
          <Button onClick={handleSaveQuestions} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminQuestions;
