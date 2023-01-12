const { MongoClient } = require('mongodb');


export default async function handler(req, res) {

  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    // этот метод получает список баз данных, поэтому замените на то, что требуется вам
    
    // const result = await client.db().admin().listDatabases();

    // const database = ;
    // const collect = database.
    console.log("asdasd", req.body); // это будет выводится в терминале
    const result = await client.db("admin").collection("quizzz").deleteOne({currentQuestion: parseInt(req.body.currentQuestion)});
    // console.log(result);

    res.status(200).json(
      { result }
    )

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

