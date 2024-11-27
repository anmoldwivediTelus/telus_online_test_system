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

function UserList() {
  const [candidates, setCandidates] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    testname: "ReactJS",
    mobileNumber: "",
    image: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const tests = ["ReactJS", "AngularJS", "JavaScript"];

  // Fetch candidates from API
  useEffect(() => {
    axios.get("http://localhost:5000/api/users")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setCandidates(response.data);
      })
      .catch((error) => console.error("Error fetching candidates:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Reset form data
  const resetForm = () => {
    setFormData({ image: null, name: "", email: "", testname: "ReactJS", mobileNumber: "" });
    setEditingIndex(null);
  };

  // Save or update candidate
  const handleSaveCandidate = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("testname", formData.testname);
    formDataToSend.append("mobileNumber", formData.mobileNumber);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      if (editingIndex !== null) {
        // Update candidate
        const id = candidates[editingIndex].id; // Changed from _id to id
        await axios.put(`http://localhost:5000/api/users/${id}`, formDataToSend);
      } else {
        // Add candidate
        await axios.post("http://localhost:5000/api/users", formDataToSend);
      }
      // Refresh candidates list
      const response = await axios.get("http://localhost:5000/api/users");
      setCandidates(response.data);
      resetForm();
      setDialogOpen(false);
    } catch (error) {
      console.error("Error saving candidate:", error);
    }
  };

  // Edit candidate
  const handleEditCandidate = (index) => {
    setEditingIndex(index);
    setFormData(candidates[index]);
    setDialogOpen(true);
  };

  // Delete candidate
  const handleDeleteCandidate = async (index) => {
    const id = candidates[index].id; // Changed from _id to id
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setCandidates(candidates.filter((_, i) => i !== index));
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
      setCandidates(updatedCandidates);
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
        Add Candidate
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Candidate Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Test Name</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow key={candidate.id}> {/* Changed from index to candidate.id */}
                <TableCell>
                  {candidate.image ? (
                    <img
                      src={`http://localhost:5000/${candidate.image}`} // Adjust this path if needed
                      alt="Candidate"
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  ) : (
                    "No Image"
                  )}
                </TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.testname}</TableCell>
                <TableCell>{candidate.mobileNumber}</TableCell>
                <TableCell>{candidate.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleSendInvite(index)}
                    disabled={candidate.status === "Invite Sent"}
                    sx={{ mr: 1 }}
                  >
                    Send Invite
                  </Button>
                  <IconButton color="primary" onClick={() => handleEditCandidate(index)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCandidate(index)}>
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
        <DialogTitle>{editingIndex !== null ? "Edit Candidate" : "Add Candidate"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Candidate Name"
            name="name"
            variant="outlined"
            margin="dense"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Email ID"
            name="email"
            variant="outlined"
            margin="dense"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Mobile Number"
            name="mobileNumber"
            variant="outlined"
            margin="dense"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Test Name"
            name="testname"
            variant="outlined"
            margin="dense"
            value={formData.testname}
            onChange={handleChange}
          >
            {tests.map((test) => (
              <MenuItem key={test} value={test}>
                {test}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
          {formData.image && <Typography sx={{ mt: 1 }}>Uploaded: {formData.image.name}</Typography>}
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

export default UserList;
