const { DataStore } = require('notarealdb');

const store = new DataStore('./data');

module.exports = {
    cars:store.collection('cars'),
    manufacturers:store.collection('manufacturers')
}