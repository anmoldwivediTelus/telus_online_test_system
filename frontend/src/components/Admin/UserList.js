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
    testName: "ReactJS",
    mobile: "",
    image: null,
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const tests = ["ReactJS", "AngularJS", "JavaScript"];

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
    setFormData({  image: null, name: "", email: "", testName: "ReactJS", mobile: "" });
    setEditingIndex(null);
  };

  const handleSaveCandidate = () => {
    if (editingIndex !== null) {
      // Reset "Send Invite" button by changing the status to "Pending"
      const updatedCandidates = candidates.map((candidate, index) =>
        index === editingIndex
          ? { ...formData, status: "Pending" }
          : candidate
      );
      setCandidates(updatedCandidates);
    } else {
      setCandidates([...candidates, { ...formData, status: "Pending" }]);
    }
    resetForm();
    setDialogOpen(false);
  };
  
  // Edit candidate
  const handleEditCandidate = (index) => {
    setEditingIndex(index);
    setFormData(candidates[index]);
    setDialogOpen(true);
  };

  // Delete candidate
  const handleDeleteCandidate = (index) => {
    setCandidates(candidates.filter((_, i) => i !== index));
  };

  // Send invite
  const handleSendInvite = (index) => {
    const updatedCandidates = candidates.map((candidate, i) =>
      i === index ? { ...candidate, status: "Invite Sent" } : candidate
    );
    setCandidates(updatedCandidates);
    setSnackbarOpen(true);
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
        sx={{ float:'right', marginBottom:'10px' }}
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
              <TableCell>Mobile</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate, index) => (
              <TableRow key={index}>
               <TableCell>
          {candidate.image ? (
            <img
              src={URL.createObjectURL(candidate.image)}
              alt="Candidate"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
          ) : (
            "No Image"
          )}
        </TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.testName}</TableCell>
                <TableCell>{candidate.mobile}</TableCell>
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
                  <IconButton
                    color="primary"
                    onClick={() => handleEditCandidate(index)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCandidate(index)}
                  >
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
        <DialogTitle>
          {editingIndex !== null ? "Edit Candidate" : "Add Candidate"}
        </DialogTitle>
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
            name="mobile"
            variant="outlined"
            margin="dense"
            value={formData.mobile}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            label="Test Name"
            name="testName"
            variant="outlined"
            margin="dense"
            value={formData.testName}
            onChange={handleChange}
          >
            {tests.map((test) => (
              <MenuItem key={test} value={test}>
                {test}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            component="label"
            sx={{ mt: 2 }}
          >
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {formData.image && (
            <Typography sx={{ mt: 1 }}>
              Uploaded: {formData.image.name}
            </Typography>
          )}
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
