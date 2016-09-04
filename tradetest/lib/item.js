/**
 * Created by lyx on 2016/8/3.
 */

var schemaItem=new mongoose.Schema({
    publishername:String,
    imgPaths:Array,
    name:String,
    detail:String,
    location:String,
    price:String,
    category:String,
    noBargain:Boolean,
    tel:String,
    qq:String,
    weixin:String,

});
var itemModel=mongoose.model('itemModel',schemaItem);