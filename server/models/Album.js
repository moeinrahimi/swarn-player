module.exports = function (sequelize,DataTypes){
  return sequelize.define('album',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    title : {type:DataTypes.STRING},
    artwork : {type:DataTypes.STRING},
    artist : {type:DataTypes.STRING},
  })
}
