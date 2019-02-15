var express = require('express');
var router = express.Router();
var Mock = require('mockjs')
const indexController = require('../controller/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getTableData',function(req, res, next){
  const template = {
    'name':'@name',
    'age|9-30':0,
    'email':'@email'
  }
  let i = 5,arr = []
  while(i--){
    arr.push(Mock.mock(template))
  }
  res.send({
    code: 200,
    mes: 'success',
    data: {
      tableData: arr
    }
  })
  next();
});

router.get('/getFileList',function(req, res, next){
  const template = {
    'name|5': '@cword',
    'create_time': '@datetime',
    'folder_id|1-5': 0,
    'id|+1': 1000
  }
  let i = 10,arr = []
  while(i--){
    arr.push(Mock.mock(template))
  }
  res.send({
    code: 200,
    mes: 'success',
    data: {
      fileList: arr
    }
  })
})

router.get('/getFolderList',function(req, res, next){
  const template1 = {
    'name|1': '@word',
    'create_time': '@datetime',
    'folder_id': 0,
    'id|+1': 1
  }
  const template2 = {
    'name|1': '@word',
    'create_time': '@datetime',
    'folder_id|+1': 1,
    'id|+1': 4
  }
  let i = 3,j=2,arr = []
  while(i--){
    arr.push(Mock.mock(template1))
  }
  while(j--){
    arr.push(Mock.mock(template2))
  }
  res.send({
    code: 200,
    mes: 'success',
    data: {
      folderList: arr
    }
  })
})

router
	.post('/get_file', indexController.getFile)
	.post('/upload_file', indexController.uploadFile)
	.get('/get_file_list', indexController.getFileList)
  .delete('/delete_file', indexController.deleteFile)
  
router.post('/sentFormData', (req, res, next) => {
  console.log(req.body)
  //res.status(200).send('success')
  if(req.body.username !== "haoxin") {
    res.status(401).send({ "username":"username should be haoxin" })
  }else{
    res.status(200).send('success')
  }
})

module.exports = router;
