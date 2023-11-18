const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../models/");

// 암호화를 위한 준비
const bcrypt = require("bcrypt");
const salt = 12;


// 회원가입 비밀번호 조건
function checkPwd(str_pwd) {
    const reg = /^[A-Za-z\d@$!%*#?&]{6,}$/;
    return reg.test(str_pwd); //정규식과 매치되면 true, 매치되지않으면 false 반환.
}

//회원가입 이메일 조건
function checkEmail(str_email){
    const reg = /^[A-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    return reg.test(str_email);
}

// 회원가입 API
router.post("/users", async (req,res)=> {
    const {email, name, password, confirmPassword} = req.body;
    // checkEmail 함수를 이용한 이메일 조건을 만족하는가
    if(!checkEmail(email)){
        res.status(400).json({
            errorMessage: "이메일 형식을 맞춰주세요"
        });
        return;
    }
    // checkPwd 함수를 이용한 패스워드 조건을 만족하는가
    if(!checkPwd(password)){
        res.status(400).json({
            errorMessage: "password는 최소 6자리 이상이어야 합니다."
        });
        return;
    }
    // 패스워드, 패스워드 검증 값이 일치하는가
    if(password !== confirmPassword) {
        res.status(400).json({
            errorMessage: "password와 confirmPassword가 일치하지 않습니다."
        });
        return;
    }
    // email 또는 name 포함하는 객체찾기
    const existUser = await User.findAll({
        where: {
          [Op.or]: [{ email }, { name }],
        },
    });
    if(existUser.length) {
        res.status(409).json({
            errorMessage: "Email이나 name이 이미 사용 중입니다."
        });
        return;
    }
    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(password, salt);
    // DB에 데이터를 삽입
    await User.create({ email, name, password: hashPassword });
    res.status(201).json({name, email, message: "회원가입을 축하드립니다."});
});


// 로그인 API
router.post ("/auth", async (req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({
        where: {
          email,
        },
    });

    // 데이터베이스에 저장된 해싱된 비밀번호와 입력된 password를 비교 match가 true면 일치
    const match = bcrypt.compareSync(password, user.password)
    console.log(match)
    // 사용자가 존재하지 않거나
    // 입력받은 password와 사용자의 password가 다를 때 에러메시지가 발생해야 한다.
    if(!user || !match) {
        res.status(400).json({
        errorMessage: "사용자가 존재하지 않거나, 사용자의 password와 입력받은 password가 일치하지 않습니다."
        });
        return;
    }
    // 토큰의 만료시간 설정 12시간..
    const token = jwt.sign({userId: user.userId}, process.env.SECRET_KEY, { expiresIn: '12h' });
    res.status(200).json({
        "token": token, message: "로그인에 성공하였습니다."
    })
})


module.exports = router;
