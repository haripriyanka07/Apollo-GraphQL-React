const db = require('./db')

const Query = {
   //resolver function for cars returns list
   cars:() => db.cars.list(),
}

const Car = {
   manufacturer:(root) => {
      return db.manufacturers.get(root.manufacturerID);
   }
}
module.exports = {Query,Car}