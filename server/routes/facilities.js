const express = require('express')
const ObjectId = require('mongodb').ObjectId

const dbo = require('../db/conn')

const facilityRoutes = express.Router()

facilityRoutes.route('/facilities').get(function (req, res) {
  let db = dbo.getDb()
  db.collection('facilities')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})

facilityRoutes.route('/facilities/:id').get(function (req, res) {
  let db = dbo.getDb()
  db.collection('facilities').findOne(
    {
      _id: ObjectId(req.params.id)
    },
    function (err, result) {
      if (err) throw err
      res.json(result)
    }
  )
})

facilityRoutes.route('/facilities/:id/reserve').put(async function (req, res) {
  let db = dbo.getDb()
  const updates = { $push: { reservations: req.body } }
  await db
    .collection('facilities')
    .updateOne({ _id: ObjectId(req.params.id) }, updates)
  res.send(200)
})

module.exports = facilityRoutes
