'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { // 2. User 모델에게 N:1 관계 설정을 합니다.
        targetKey: 'userId', // 3. User 모델의 userId 컬럼을
        foreignKey: 'userId', // 4. Product 모델의 userId 컬럼과 연결합니다.
      });
    }
  }
  Product.init({
    productId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};