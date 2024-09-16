const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb"); // Import ObjectId
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const uri = "mongodb+srv://kotreshsh162:Kotresh162@cluster0.aifb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with MongoClientOptions to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the MongoDB server
        await client.connect();

        // Database and Collection
        const db = client.db("test"); 
        const collection = db.collection("dbsheets");

        console.log("Connected to MongoDB!");

        app.post('/add-to-mongo', async (req, res) => {
            const sheetData = req.body.data;
        
            // Check if sheetData is an array and not empty
            if (!Array.isArray(sheetData) || sheetData.length === 0) {
                return res.status(400).send('No data provided or data is empty');
            }
        
            try {
                // Remove all existing data from the collection
                await collection.deleteMany({});
        
                // Insert new data into MongoDB
                const result = await collection.insertMany(sheetData);
                res.status(200).send('Data inserted successfully');
                console.log('Data inserted:', result);
            } catch (error) {
                res.status(500).send('Error inserting data');
                console.error('Error inserting data:', error);
            }
        });
        

        // API endpoint to get all users
        app.get('/', async (req, res) => {
            try {
                const users = await collection.find({}).toArray(); // Fetch all users
                res.status(200).json(users);
            } catch (error) {
                res.status(500).json(error);
                console.error('Error fetching users:', error);
            }
        });

        // API endpoint to get user by ID
        app.get('/getUser/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const user = await collection.findOne({ _id: new ObjectId(id) }); // Use ObjectId here
                res.status(200).json(user);
            } catch (error) {
                res.status(500).json(error);
                console.error('Error fetching user:', error);
            }
        });

        // API endpoint to update user by ID
        app.put('/updateUser/:id', async (req, res) => {
            const id = req.params.id;
            try {
                const result = await collection.updateOne(
                    { _id: new ObjectId(id) }, // Use ObjectId here
                    { $set: { name: req.body.name, email: req.body.email, age: req.body.age } }
                );
                res.status(200).json(result);

                // await fetch('https://script.google.com/macros/s/AKfycbyiCgVT44K-YdnYnFkA6nQoDQwSQevNJlaLmCtx9x2QPGgAX-poHUcZ-J4EEtPANLdvFQ/exec');

                // console.log('Google Sheet update triggered');

            } catch (error) {
                res.status(500).json(error);
                console.error('Error updating user:', error);
            }
        });

                // API endpoint to delete user by ID
                // API endpoint to delete user by ID
        app.delete('/deleteUser/:id', async (req, res) => {
            const id = req.params.id;
            try {
                // Check if the ID is valid ObjectId
                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ message: 'Invalid User ID' });
                }

                // Attempt to delete the user
                const result = await collection.deleteOne({ _id: new ObjectId(id) });

                if (result.deletedCount === 0) {
                    // If no user was deleted (i.e., the user doesn't exist)
                    return res.status(404).json({ message: 'User not found' });
                }

                // Successful deletion
                res.status(200).json({ message: 'User deleted successfully' });
            } catch (error) {
                res.status(500).json({ message: 'Error deleting user', error });
                console.error('Error deleting user:', error);
            }
        });


        // API endpoint to create a new user
        app.post('/createUser', async (req, res) => {
            try {
                const { email } = req.body; // Only check for the email field
        
                // Check if a user with the given email already exists
                const existingUser = await collection.findOne({ email: email });
        
                if (existingUser) {
                    // If user with the same email already exists, return a message
                    return res.status(400).json({ message: 'User with this email is already present in the database.' });
                }
        
                // If user with the given email doesn't exist, insert the new user
                const result = await collection.insertOne(req.body);
                res.status(200).json(result);

                // await fetch('https://script.google.com/macros/s/AKfycbyiCgVT44K-YdnYnFkA6nQoDQwSQevNJlaLmCtx9x2QPGgAX-poHUcZ-J4EEtPANLdvFQ/exec');
                 
                // console.log('Google Sheet update triggered');
        
            } catch (error) {
                res.status(500).json(error);
                console.error('Error creating user:', error);
            }
        });        

        // Start the server
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

run().catch(console.dir);
