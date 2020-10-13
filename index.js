const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require("./models/User");

const config = require('./config/key');

//application/x-www-form-urlencoded 형식을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//bodyParser? client에서 가져오는 정보 서버에서 분석해서 가져올 수 있게 해주는 애


//application/json 형식을 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! 노드몬테스트'))


//회원가입을 위한 라우트
app.post('/register', (req,res)=>{

    //회원 가입할 때 필요한 정보들을 client에서 가져오면
    //그것들을 DB에 넣어준다. 

        const user = new User(req.body)
        //bodyParser를 이용해서 request body 안에 정보를 담는다.
        //안에는 {id: "hello", password: "123"} 이런식으로 정보가 담겨있다.

        
        //save는 몽고디비에서 오는 메소드. 담긴정보를 저장해줌
        user.save((err, userInfo) => {
            if(err) return res.json({success: false, err})
            return res.status(200).json({ //200은 성공했다는 뜻
                success:true //성공하면 POSTMAN에서 "success": true 로 뜸
            })
        })
        
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})