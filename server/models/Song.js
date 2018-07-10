module.exports = function (sequelize,DataTypes){
  return sequelize.define('song',{
    id: { primaryKey: true, type: DataTypes.INTEGER, autoIncrement: true},
    album : {type:DataTypes.STRING},
    title : {type:DataTypes.STRING},
    artwork : {type:DataTypes.STRING},
    path: {type:DataTypes.STRING},
    fileName : {type:DataTypes.STRING},
    genre : {type:DataTypes.STRING},
    artist : {type:DataTypes.STRING},
    year : {type:DataTypes.STRING},
    duration : {type:DataTypes.STRING},
    color : {type:DataTypes.STRING,defaultValue:0},
    dirName : {type:DataTypes.STRING,defaultValue:0},
    fullPath : {type:DataTypes.STRING,defaultValue:0},

    
  })
}
