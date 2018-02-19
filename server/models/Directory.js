module.exports = function (sequelize,DataTypes){
  return sequelize.define('directory',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    path : {type:DataTypes.STRING}
  })
}
