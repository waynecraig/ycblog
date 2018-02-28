const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
const dbName = 'ycblog'

const find = (col, filter) => (
  MongoClient.connect(url).then(client => 
    client.db(dbName).collection(col).find(filter).toArray()
  ).catch(err => {
    console.error(err)
  })
)

exports.find = find
