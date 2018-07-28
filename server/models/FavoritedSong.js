module.exports = function (sequelize,DataTypes){
  return sequelize.define('favoritedSong',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
  })
}
