const { MongoClient } = require('mongodb');

async function handler() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    // этот метод получает список баз данных, поэтому замените на то, что требуется вам
    
    // const result = await client.db().admin().listDatabases();

    const database = client.db("admin");
    const collect = database.collection("quizzz");

    const firstQuestion = {
      a: "123",
      b: "12"
    }

    const result = await collect.insertOne(firstQuestion);
    console.log('qq');

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export {handler};