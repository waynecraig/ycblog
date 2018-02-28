const crypto = require('crypto')
const base = require('./base')
const colName = 'user'

class User {

  constructor(data) {
    this._data = data
  }

  validate(password) {
    return crypto.createHash('md5').update(password).digest('hex') === this._data.password
  }

  getName() {
    return this._data.name
  }

}

const getUserByName = name => (
  base.find(colName, {name}).then(list => {
    if (list && list[0]) {
      return new User(list[0])
    } else {
      return null
    }
  })
)

exports.getUserByName = getUserByName
