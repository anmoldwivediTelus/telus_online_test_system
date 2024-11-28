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
import { Delete, Description, Edit } from "@mui/icons-material";

function AdminTest() {
  const [tests, setTests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
   title:'',
   dscription:''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  
  // Fetch candidates from API
  useEffect(() => {
    axios.get("http://localhost:4000/api/tests")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setTests(response.data);
      })
      .catch((error) => console.error("Error fetching candidates:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  
  // Reset form data
  const resetForm = () => {
    setFormData({ name: "",
      email: "",
      mobileNumber: "",
      technology:"",
      experience:0 });
    setEditingIndex(null);
  };

  // Save or update candidate
  const handleSaveCandidate = async () => {
    
    try {
      if (editingIndex !== null) {
        // Update candidate
        const id = formData.id; // Changed from _id to id
        
        await axios.put(`http://localhost:4000/api/tests/${id}`, formData);
      } else {
        // Add candidate
        await axios.post("http://localhost:4000/api/tests", formData);
      }
      // Refresh candidates list
      const response = await axios.get("http://localhost:4000/api/tests");
      setTests(response.data);
      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  // Edit candidate
  const handleEditCandidate = (candidate) => {
   setEditingIndex(candidate);
    console.log(candidate,"sdfadadfsaf")
    setFormData(candidate);
    setDialogOpen(true);
  };

  // Delete candidate
  const handleDeleteCandidate = async (index) => {
    //const id = candidates.id; // Changed from _id to id
    try {
      await axios.delete(`http://localhost:4000/api/tests/${index}`);
      const response = await axios.get("http://localhost:4000/api/tests");
      setTests(response.data);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  // Send invite
  const handleSendInvite = async (index) => {
    const id = candidates[index].email; // Changed from _id to id
    try {
      await axios.post(`http://localhost:5000/api/invites/send-invite`, { email: id , testName: "ReactJS",testId: 2 });
      const updatedCandidates = candidates.map((candidate, i) =>
        i === index ? { ...candidate, status: "Invite Sent" } : candidate
      );
      setTests(updatedCandidates);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Recruiter Dashboard - Send Test Invites
      </Typography>

      <Button
        variant="contained"
        color="success"
        onClick={() => setDialogOpen(true)}
        sx={{ float: "right", marginBottom: "10px" }}
      >
        Add Test
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tests.map((test) => (
              <TableRow key={test.id}> {/* Changed from index to candidate.id */}
                <TableCell>{test.title}</TableCell>
                <TableCell>{test.description}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditCandidate(test)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCandidate(test.id)}>
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
        <DialogTitle>{editingIndex !== null ? "Edit Tesr" : "Add Test"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Test Title"
            name="title"
            variant="outlined"
            margin="dense"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Test Description"
            name="description"
            variant="outlined"
            margin="dense"
            value={formData.description}
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

export default AdminTest;
