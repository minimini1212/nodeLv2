require(id='dotenv').config();
const development = { 
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: "mysql"
}


module.exports = { development };






// 데이터베이스를 새로 만들 때 npx sequelize db:create --config config/config.js

// id='dotenv' , id:'dotenv' 어떤 것이 맞는지 

// 일단 id='dotenv'로 했더니 데이터베이스 생성완료