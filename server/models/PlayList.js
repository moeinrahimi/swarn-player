module.exports = function (sequelize,DataTypes){
  return sequelize.define('playlist',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    name : {type:DataTypes.STRING}
  })
}
