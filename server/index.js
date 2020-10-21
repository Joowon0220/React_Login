const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const {auth} = require("./middleware/auth")
const {User} = require("./models/User");



//application/x-www-form-urlencoded 형식을 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//bodyParser? client에서 가져오는 정보 서버에서 분석해서 가져올 수 있게 해주는 애


//application/json 형식을 분석해서 가져옴
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}).then(() => console.log('mongoDB Connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => res.send('Hello World! 노드몬테스트'))


app.get('/api/hello', (req, res) =>{
    res.send("안녕하세요!! 응답완료")
})

//회원가입을 위한 라우트
app.post('/api/users/register', (req,res)=>{

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

app.post('/api/users/login', (req, res) => {
    //요청된 이메일이 이미 DB에 있는지 체크
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "가입되지 않은 이메일입니다."
            })
        }
    

    //요청된 이메일이 DB에 있다면, 비번이 맞는비번인지 체크
    user.comparePassword(req.body.password, (err, isMatch) =>{
        if(!isMatch)//매치하는게 없으면 비번 틀렸단 소리
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

        
        //맞는 비번이면 토큰 생성
        user.generateToken((err, user) =>{
            if(err) return res.status(400).send(err);

            //토큰을 쿠키에 저장한다.
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess:true, userId: user._id})

        })
    })
    
})
    
})


app.get('/api/users/auth', auth ,(req, res) => {
    //여기까지 넘어왔으면 Authentification이 true라는 말
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0? false : true,
        //role 0 -> 일반유저 아니면 어드민
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })
})


app.get('/api/users/logout', auth, (req, res) => {

    User.findOneAndUpdate({_id: req.user._id},
        {token: ""},
        (err, user) => {
            if(err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            })
        })
})


const port = 5000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})