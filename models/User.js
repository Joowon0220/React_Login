const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 500
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 500
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

//save 하기전에 내가원하는 func을 해줘
userSchema.pre('save', function(next){
    var user = this; //여기서 this는 지금 js파일안에 userSchema 안에 지정된 것들을 모두 칭함

    //유저가 비번을 바꿀때만 비번이 다시 암호화됨
    if(user.isModified('password')){


    //비밀번호 암호화 시키기
    bcrypt.genSalt(saltRounds, function(err, salt) { //salt는 bcrypt에서 가져오는 암호화 key  
        if(err) return next(err)  //index.js안에 user.save function안에 err로 넘어감

        bcrypt.hash(user.password, salt, function(err, hash) { //hash는 암호화된 비밀번호
            if(err) return next(err)
            user.password = hash //사용자가 입력한 순수 패스워드를 해쉬된 값으로 변경
            next()
        })
        })        
    } else {
        next() //비밀번호 말고 다른거 바꿨을때, next로 index.js안에 user.save function안에 err로 넘어감
    }
})

userSchema.methods.comparePassword= function(plainPassword, cb){
    //유저가 입력한 비번과 암호화된 비번(schema안에있는 비번, this로 가져옴) 비교
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err); 
        //cb는 콜백. cb가 없다면 (콜백할 에러가 없다면) 비번은 isMatch (같다.)
        cb(null, isMatch);
    
    })
}


userSchema.methods.generateToken = function(cb){

    var user = this;

    //jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;
    // user._id + ''  = token
    //토큰을 decode 한다. 
    jwt.verify(token, 'secretToken', function (err, decoded) {
        //decoded된 유저 아이디를 이용해서 유저를 찾은 다음에 
        //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user)
        })
    })
}


const User = mongoose.model('User', userSchema) //스키마를 모델로 감싸줌

module.exports={User} //모델을 다른파일에서도 쓸 수있게 해줌