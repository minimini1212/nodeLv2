'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { // 2. Product 모델에게 1:N 관계 설정을 합니다.
        sourceKey: 'userId', // 3. User 모델의 userId 컬럼을
        foreignKey: 'userId', // 4. Product 모델의 userId 컬럼과 연결합니다.
      });
    }
  };
  User.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
