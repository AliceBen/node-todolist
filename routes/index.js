var express = require('express');
var router = express.Router();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync(__dirname + '/../data/db.json')
const db = low(adapter)
const shortid = require('shortid')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/acount/create', function (req, res, next) {
  res.render('create')
})

router.get('/acount', function (req, res, next) {
  let accounts = db.get('acounts').value()
  res.render('list', { accounts: accounts })
})

router.post('/acount', function(req, res, next){
  let id = shortid.generate()
  db.get('acounts').unshift({ id: id, ...req.body }).write()
  res.render('success', {msg: '添加成功~', url: '/acount'})
})

router.get('/acount/:id', function (req, res, next) {
  let id = req.params.id
  db.get('acounts').remove({id: id}).write()
  res.render('success', { msg: '刪除成功~', url: '/acount' })
})


module.exports = router;
