const express = require("express");
const router = express.Router();
const { Product } = require("../models/");
const { User } = require("../models/");
const authMiddleware = require("../middlewares/auth-middleware.js");

// 상품 생성 api
router.post("/products", authMiddleware, async (req, res) => {
  const {title, content} = req.body;
  if(!title || !content) {
    res.status(400).json({
      errorMessage: "상품명 또는 내용을 작성해주세요."
    });
    return;
  }
  const userId = res.locals.user.userId;
  const status = "FOR_SALE";
  await Product.create({userId, title, content, status});
  res.status(200).json({message: "상품 등록에 성공하였습니다."});
});

// 상품 목록 조회 api
router.get("/products", async (req, res) => {
  // queryString으로 정렬하기 위한 초식
  let { sort } = req.query;
  sort = sort.toLowerCase();
  let newSort = "";
  if (sort === "desc" || sort === "asc") {
    newSort = sort;
  } else {
    newSort = "desc";
  }
  const sum = await Product.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      }
    ],
    // 입력받은 newSort로 정렬하겠다.
    order: [
      ["createdAt", newSort]
    ]
  });
  const productFile = sum.map(data => data.toJSON())
  const newPrd = productFile.map(data => ({
    productId: data.productId,
    title: data.title,
    content: data.content,
    name: data.User.name,
    status: data.status,
    createdAt: data.createdAt,
  }))
  if(newPrd.length === 0) {
    res.status(400).json({
      errorMessage: "조회할 수 있는 상품목록이 없습니다."
    });
    return;
  }
  res.status(200).json({newPrd});
})

// 상품 상세 조회 api
router.get("/products/:productId",  async (req, res) => {
  const { productId } = req.params;
  const details = await Product.findOne({
    // 입력받은 productId와 일치하는 객체를 가져오겠다.
    where: {
      productId
    },
    // 모델 User에서 키가 name인 데이터를 참조하겠다.
    include: [
      {
        model: User,
        attributes: ['name'],
      }
    ]
  });
  if(!details) {
    res.status(400).json({
      errorMessage: "선택한 상품은 존재하지 않습니다." 
    });
    return;
  }
  const detail = details.toJSON();
  const name = detail.User.name;
  const {userId, title, content, status, createdAt} = detail;
  res.status(200).json({
    userId, 
    title, 
    content, 
    name, 
    status, 
    createdAt, 
    message: "상품 상세 조회에 성공하였습니다."});
});


// 상품 수정 api
router.put("/products/:productId/", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const {title, content, status} = req.body;
  const existsproduct = await Product.findOne({where: {productId}});
  const userId = res.locals.user.userId;
  if (existsproduct === null) {
    res.status(400).json({ errorMessage: "상품 조회에 실패하였습니다." });
    return;
  }
  if(existsproduct.userId !== userId) {
    res.status(401).json({ errorMessage: "작성자가 일치하지 않습니다."});
    return;
  }
  // Sequelize 수정
  await Product.update({title: title , content: content, status: status} , 
                       {where: {productId}});
  res.status(200).json({ message: "성공적으로 수정되었습니다." });
});


// 상품 삭제 api
router.delete("/products/:productId/", authMiddleware, async (req, res) => {
  const { productId } = req.params;
  const existsproduct = await Product.findOne({where: {productId}});
  const userId = res.locals.user.userId;
  if (existsproduct === null) {
    res.status(400).json({ errorMessage: "상품 조회에 실패하였습니다." });
    return;
  }
  if(existsproduct.userId !== userId) {
    res.status(401).json({ errorMessage: "작성자가 일치하지 않습니다."});
    return;
  } 
  // Sequelize 삭제
  await Product.destroy({where: {productId}});
  res.status(200).json({ message: "성공적으로 삭제되었습니다." });
});

module.exports = router;
