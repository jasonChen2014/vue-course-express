var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')

function getPassword(userName) {
  return {password: '123'}
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/userinfo', function(req, res, next) {
  res.json({error:null,data:{username:'haoxin'}});
});
router.post('/login', function(req, res, next) {
  const { userName,password } = req.body
  if(userName) {
    const userinfo = getPassword(userName)
    if(!userinfo || userinfo.password != password) {
      res.status(401).send({
        code: 401,
        mes: 'userName is not exist'
      })
    }else{
      res.send({
        code: 200,
        mes: 'success',
        data: {
          token: jwt.sign({name: userName},'1234',{
            expiresIn: '240h'
          })
        }
      })
    }
  }else{
    res.status(401).send({
      code: 401,
      mes: 'userName cannot be empty'
    })
  }
})

router.get('/authorization', function(req, res, next) {
  const userName = req.userName
  res.send({
    code: 200,
    mes: 'success',
    data: {
      token: jwt.sign({name: userName},'1234',{
        expiresIn: '240h'
      })
    }
  })
})

module.exports = router;
