import  Test  from './../models/test.js';  // Import the Test model
import sequelize from "../dataBase/sequelize.js";
// Create a new Test
export const createTest = async (req, res) => {
  try {
    const { title, description } = req.body;
    await sequelize.sync({ alter: true }); 
    const newTest = await Test.create({
      title,
      description
    });
    res.status(201).json(newTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create test' });
  }
};

// Get all tests
export const getAllTests = async (req, res) => {
  console.log("getting all tests")
  try {
    const tests = await Test.findAll();
    res.status(200).json(tests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve tests' });
  }
};

//Get a single test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve test' });
  }
};

// export const getTestById = async (req, res) => {
//   try {
//     const { id, email, expiresAt } = req.query; // Fetching 'id', 'email', and 'expiresAt' from query params
//     console.log(id, email, expiresAt, "get test by id");

//     // Find the test by the provided 'id'
//     const test = await Test.findOne({ where: { id } });

//     if (!test) {
//       return res.status(404).json({ message: 'Test not found' });
//     }

//     // Send the test data as the response
//     res.status(200).json(test);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to retrieve test' });
//   }
// };




// Update a test by ID
export const updateTest = async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    const { title, description } = req.body;
    test.title = title;
    test.description = description;

    await test.save();
    res.status(200).json(test);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update test' });
  }
};

// Delete a test by ID
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByPk(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    await test.destroy();
    res.status(200).json({ message: 'Test deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete test' });
  }
};
