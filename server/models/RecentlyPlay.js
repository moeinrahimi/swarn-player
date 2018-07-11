module.exports = function (sequelize,DataTypes){
  return sequelize.define('recentylyPlay',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
  })
}
