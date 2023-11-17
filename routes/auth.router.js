const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware.js");



// 내정보 조회하는 API
router.get("/users/me", authMiddleware, async (req, res)=>{
    res.json({user: res.locals.user, message: "내 정보 조회에 성공하였습니다."}); 
})


module.exports = router;