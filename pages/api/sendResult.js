const { MongoClient } = require('mongodb');

export default async function handler(req, res) {

    const uri = 'mongodb://localhost:27017';
    const client = new MongoClient(uri);

    console.log('Пришло на сервер = ', req.body); // это бужет выводится в терминале

    try {
        await client.connect();
        // этот метод получает список баз данных, поэтому замените на то, что требуется вам
        const result = await client.db('admin').collection('quizzz').insertOne({ 
                                                                                    currentQuestion: req.body.currentQuestion - 1,
                                                                                    question: req.body.question,
                                                                                    firstAnswer: req.body.firstAnswer,
                                                                                    secondAnswer: req.body.secondAnswer,
                                                                                    thirdAnswer: req.body.thirdAnswer,
                                                                                    fourthAnswer: req.body.fourthAnswer,
                                                                                    correctAnswer: req.body.correctAnswer,
                                                                                });

        res.status(200).json(
            { valid: true }
        )

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
