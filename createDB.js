const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://xxxx.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000'; 

// The database name you want to create
const databaseName = 'myNewDatabase';

async function createDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected to MongoDB!");

        // Check if the database already exists
        const adminDb = client.db().admin();
        const databases = await adminDb.listDatabases();
        
        const databaseExists = databases.databases.some(db => db.name === databaseName);

        if (databaseExists) {
            console.log(`Database "${databaseName}" already exists.`);
        } else {
            // Create a new database by creating a collection (collections must exist to create a database)
            const db = client.db(databaseName);
            await db.createCollection('initCollection'); // Create an initial collection to create the database
            console.log(`Database "${databaseName}" created successfully.`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the function
createDatabase();
