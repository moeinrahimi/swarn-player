module.exports = function (sequelize,DataTypes){
  return sequelize.define('playListSong',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},

  })
}
