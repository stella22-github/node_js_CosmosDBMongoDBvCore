const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://xxxx.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000'; 

// Database name to check
const databaseName = 'myNewDatabase';

async function checkDatabaseExists() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected to MongoDB!");

        // Get the admin database to list all databases
        const adminDb = client.db().admin();
        const databasesList = await adminDb.listDatabases();

        // Check if the specified database exists
        const dbExists = databasesList.databases.some(db => db.name === databaseName);

        if (dbExists) {
            console.log(`Database "${databaseName}" exists.`);
        } else {
            console.log(`Database "${databaseName}" does not exist.`);
        }

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the function to check if the database exists
checkDatabaseExists();
