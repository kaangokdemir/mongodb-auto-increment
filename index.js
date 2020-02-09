// 1- Create a collection named "counter" 
// then just add a document equals {"_id" : "id", "count : 0"}


// 2- Follow this
const { MongoClient } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017' // or your default port
const databaseName = 'your-db-name'

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
).then(res => {
  console.log('Connected')
  const db = res.db(databaseName)
  db.collection('counter').findOneAndUpdate({
    _id: 'id',
  }, { $inc: { count: 1 } }, { returnOriginal: false }).then(response => {
    db.collection('users').insertOne({
      id: response.value.count,
      name: `User${response.value.count}`,
    })
  })
})
