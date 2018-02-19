module.exports = function (sequelize,DataTypes){
  return sequelize.define('song',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    name : {type:DataTypes.STRING},
    album : {type:DataTypes.STRING},
    artwork : {type:DataTypes.STRING},
    path: {type:DataTypes.STRING},
    fileName : {type:DataTypes.STRING},
    genre : {type:DataTypes.STRING},
    artist : {type:DataTypes.STRING},
    year : {type:DataTypes.STRING},
    color : {type:DataTypes.STRING,defaultValue:0},
    dirName : {type:DataTypes.STRING,defaultValue:0},
    baseDir : {type:DataTypes.STRING,defaultValue:0},
    
  })
}
