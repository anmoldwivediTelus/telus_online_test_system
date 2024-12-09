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
import ResultPage from "./CandidateResult";

function UserList() {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]); // For filtering candidates
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [tests, setTests] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showResultDialogOpen, setShowResultDialogOpen]=useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    experience:0,
    technology:"",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  
  // Fetch candidates from API
  useEffect(() => {
    axios.get("http://localhost:4000/api/users")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setCandidates(response.data);
        setFilteredCandidates(response.data); // Set initial filtered candidates
        axios.get("http://localhost:4000/api/tests")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setTests(response.data);
      })
      .catch((error) => console.error("Error fetching candidates:", error));
      })
      .catch((error) => console.error("Error fetching candidates:", error));
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredCandidates(candidates);
    }
  }, [candidates]);
  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = candidates.filter(
      (candidate) =>
        candidate.name.toLowerCase().includes(value) ||
        candidate.email.toLowerCase().includes(value)
    );
    setFilteredCandidates(filtered);
  };  

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
      experience:0,
    isTestDone: false });
    setEditingIndex(null);
  };

  // Save or update candidate
  // const handleSaveInvite = async () => {
    
  //   try {
  //      await axios.post("http://localhost:4000/api/users", formData);
  //     // Refresh candidates list
  //     const response = await axios.get("http://localhost:4000/api/users");
  //     setCandidates(response.data);
  //     resetForm();
  //     setInviteDialogOpen(false);
  //   } catch (error) {
  //     console.error("Error sending invite candidate:", error);
  //   }
  // };

  // Save or update candidate
  const handleSaveCandidate = async () => {
    
    try {
      if (editingIndex !== null) {
        // Update candidate
        const id = formData.id; // Changed from _id to id
        
        await axios.put(`http://localhost:4000/api/users/${id}`, formData);
      } else {
        // Add candidate
        await axios.post("http://localhost:4000/api/users", formData);
      }
      // Refresh candidates list
      const response = await axios.get("http://localhost:4000/api/users");
      setCandidates(response.data);
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
  const handleInviteCandidate = (candidate) => {
    setFormData(candidate);
     setInviteDialogOpen(true);
   };

  // Delete candidate
  const handleDeleteCandidate = async (index) => {
    //const id = candidates.id; // Changed from _id to id
    try {
      await axios.delete(`http://localhost:4000/api/users/${index}`);
      const response = await axios.get("http://localhost:4000/api/users");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  // Send invite
  const handleSendInvite = async (candidate) => {
    console.log(candidate.id)
    const id = formData.email; // Changed from _id to id
    try {
      await axios.post(`http://localhost:4000/api/invites/send-invite`, { email: formData.email , testName: formData.testId.split(".")[1],testId: formData.testId.split(".")[0],userId: formData.id });
      const response = await axios.get("http://localhost:4000/api/users");
      setCandidates(response.data);
      setInviteDialogOpen(false);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  //view result
  const showResult = (candidate) => {
     setShowResultDialogOpen(true);
   };

   const handleClose = () => {
    setShowResultDialogOpen(false);
  };


  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
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
            textTransform: "uppercase",
            fontSize: { xs: "1.5rem", sm: "1rem", md: "1.25rem" },
          }}
        >
          Recruiter Dashboard - Send Test Invites
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={handleSearchChange}
            size="small"
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => setDialogOpen(true)}
            sx={{
              width: { xs: "100%", sm: "auto" },
              marginTop: { xs: "10px", sm: "0" },
            }}
          >
            Add Candidate
          </Button>
        </Box>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Mobile Number</TableCell>
              <TableCell>Total Experience</TableCell>
              <TableCell>Technology</TableCell>
              <TableCell>Test Invite Status</TableCell>
              <TableCell>Test Attempted</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}> {/* Changed from index to candidate.id */}
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.email}</TableCell>
                <TableCell>{candidate.mobileNumber}</TableCell>
                <TableCell>{candidate.experience}</TableCell>
                <TableCell>{candidate.technology}</TableCell>
                {console.log(candidate.inviteStatus,"sdafd")}
                <TableCell>{!candidate.inviteStatus ? "false" : "true"}</TableCell>
                <TableCell>{!candidate.isTestDone ? "false" : "true"}</TableCell>
                <TableCell sx={{whiteSpace: "nowrap",padding:"10px 5px"}} >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleInviteCandidate(candidate)}
                    disabled={candidate.inviteStatus === true}
                    sx={{fontSize: "12px",marginRight:"2px",padding: "7px" }}>
                    Send Invite
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => showResult(candidate)}
                    disabled={candidate.isTestDone === false}
                    sx={{fontSize: "12px",marginLeft:"3px",    padding: "7px"  }}>
                    View Result
                  </Button>
                  <IconButton color="primary" onClick={() => handleEditCandidate(candidate)}>
                    <Edit   sx={{width: "0.8em"}}/>
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteCandidate(candidate.id)}>
                    <Delete   sx={{width: "0.8em"}}/>
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
        <DialogTitle sx={{color:"#000"}}>{editingIndex !== null ? "Edit Candidate" : "Add Candidate" }</DialogTitle>
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
            fullWidth
            label="Experience"
            name="experience"
            variant="outlined"
            margin="dense"
            type="number"
            value={formData.experience}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Technology"
            name="technology"
            variant="outlined"
            margin="dense"
            value={formData.technology}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setDialogOpen(false);
              resetForm();
            }}
            sx={{color:"#000"}}
             >
            Cancel
          </Button>
          <Button onClick={handleSaveCandidate} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={inviteDialogOpen}
        onClose={() => {
          setDialogOpen(false);
          resetForm();
        }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{color:"#000"}}>Send Test Invite</DialogTitle>
        <DialogContent>
        <TextField
            fullWidth
            select
            label="Test"
            defaultValue="hello"
            name="testId"
            variant="outlined"
            margin="dense"
            value={formData.testId}
            onChange={handleChange}
          >
           
            {tests.map((course) => (
              <MenuItem key={course.id} value={course.id+"."+course.title}>
                {course.title}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setInviteDialogOpen(false);
              //resetForm();
            }}
            sx={{color:"#000"}}
          >
            Cancel
          </Button>
          <Button onClick={handleSendInvite} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
   
      <Dialog
        open={showResultDialogOpen}
        onClose={() => {
          setShowResultDialogOpen(false);
        }}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle>View Result</DialogTitle>
        <DialogContent sx={{backgroundColor:"rgb(247, 249, 250)"}}>
         <ResultPage />
        
        </DialogContent>
        <DialogActions>
       
          <Button autoFocus onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
  
    </Box>
  );
}

export default UserList;
