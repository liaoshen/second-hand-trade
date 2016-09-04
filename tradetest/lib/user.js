/**
 * Created by lyx on 2016/7/25.
 */
var mongoose=require('mongoose');

 var crypto = require('crypto');

mongoose.connect('mongodb://127.0.0.1/login_app');
var schema=new mongoose.Schema({
    name:String,
    hash_password:String,
    age:String});

var schemaItem=new mongoose.Schema({
    publishername:String,
    publishtime:String,
    publishtimed:String,
    imgPaths:Array,
    name:String,
    detail:String,
    location:String,
    price:String,
    category:String,
    tel:String,
    qq:String,
    weixin:String,
    sold:String
   
})

schema.virtual("pass").set(function (pass) {
    this.hash_password = encryptPassword(pass);
});

schema.method("authenticate", function (plainText) {
    return encryptPassword(plainText) === this.hash_password;
});

function encryptPassword(pass) {
    return crypto.createHash("md5").update(pass).digest("base64");
}


var use=mongoose.model('use',schema);
var itemModel=mongoose.model('itemModel',schemaItem);

var User={
    itemModel:itemModel,
    use:use,
    save:save,
    update:update,
    getById:getById,
    getAll:getAll,
    deletes:deletes,
    authenticate:authenticate
};

function save(callback){
    var usersEntity=new use(this.user);
    usersEntity.save(function(err,data){
        if(err)  console.log('err');
        callback(data);
    });
};
function update(conditions,update,options,callback){

    this.use.update(conditions,update,options,function(err){
        if(err) return callback(err);
        return callback(null);

    });
};
function getById (id, callback){
    this.use.findOne({_id:id},function(err,user){
        if(err) return callback(err,null);
        return callback(null,user);
    });
};

function getAll(callback) {
    this.use.find({}, function (err, user) {
        if (err) return callback(err, null);
        return callback(null, user);
    });
};


function deletes (query,callback){
    this.use.remove(query,function(err){
        if(err) return callback(err);
        return callback(null);
    });
};

function authenticate(fn){
    this.use.findOne({name:this.user.name,pass:this.user.pass},function(err,user){
        if(err) return fn(err);
        if(!user.id) return fn();
        return fn(null,user);

    });

};

module.exports=User;