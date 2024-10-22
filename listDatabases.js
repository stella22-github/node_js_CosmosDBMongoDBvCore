const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const uri = 'mongodb+srv://xxxx.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000'; 

async function listDatabases() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB client
        await client.connect();
        console.log("Connected to MongoDB!");

        // Get the admin database to list all databases
        const adminDb = client.db().admin();
        const databasesList = await adminDb.listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

    } catch (err) {
        console.error(err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the function to list databases
listDatabases();
