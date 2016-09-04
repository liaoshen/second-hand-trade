/**
 * Created by lyx on 2016/7/25.
 */
var User=require('./user');
var path = require('path');
var moment = require('moment');
var crypto = require('crypto');
var use=User.use;
var itemModel=User.itemModel;
var fs=require('fs');
var filter=require('./nameChange');
 var en2ch=filter.en2ch;

var multiparty=require('multiparty');
var util=require('util');





    var Index= {
        index: function (req, res) {
            res.render('./first', {title: "cnmaaa"});
        },

        loginindex: function (req, res) {
            res.render('../views/login', {title: '登录'});
        },

        login: function (req, res) {
            var users = req.body;
            console.log(users);
            var userModel = new use(users);
            console.log(userModel);
            use.findOne({name: users.name}, function (err, user) {
                if (err)  return res.json({err: err});
                if (!user) {
                    return res.json({err: '用户不存在'});
                }
                if (!user.authenticate(users.pass)) {
                    return res.json({err: '密码错误'});
                }

                req.session["user"] = user;

                res.redirect('/')


            });

        },

        logout: function (req, res) {
            req.session["user"] = null;
            res.redirect('/');
        },
        registerindex: function (req, res) {
            res.render('../views/register', {title: '注册'});
        },

        regist: function (req, res) {
            var user = req.body;
            var myuser = new use(user);
            console.log(user);
            use.findOne({name: user.name}, function (err, user) {
                if (err) return res.json({err: err});
                if (user) {
                    console.log(user);
                    console.log(JSON.stringify(user.name));
                    return res.json({err: '用户名已经存在'});
                }
                myuser.save(function (err, user) {
                    if (err) return res.json({err: err});
                    req.session["user"] = user;

                    res.redirect('/')
                });
            });
        },

        getUsers: function (req, res) {
            use.find({}, function (err, item) {
                if (err) res.json({err: err});
                res.json(item);
            });
        },
        getItems: function (req, res) {
            itemModel.find({}, function (err, items) {
                if (err) res.json({err: err});
                for(var i=0;i<items.length;i++){
                    var mytime=items[i].publishtime;
                    items[i].publishtimed=moment(mytime, "YYYY-MM-DD HH:mm:ss").fromNow();
                };
                items.reverse();
                res.json(items);
            });
        },


        getLoginUser: function (req, res) {
            res.json(req.session["user"] || {});

        },
        publish: function (req, res) {
            moment.lang('zh-cn');
          var time=moment().format('YYYY-MM-DD HH:mm:ss');

            console.log(moment(time, "YYYY-MM-DD HH:mm:ss").fromNow()); //2 years ago

            var item=req.body;
            item.publishtime=time;


             console.log(item);
           var myItem=new itemModel(item);
            myItem.save(function(err,item){
                if (err) return res.json({err: err});
                res.json();

            });
            
         },

        upload: function (req, res) {

            var form = new multiparty.Form({uploadDir: './public/files/'});

            form.parse(req, function (err, fields, files) {
                var filesTmp = JSON.stringify(files, null, 2);
                if (err) {
                    console.log('parse error' + err);
                } else {
                    console.log('parse files:hehe' + filesTmp);
                    ;
                  

                    var inputFile = files.file;
                    var uploadedPath = inputFile.path;

                    var dstPath = './public/files/' + inputFile.originalFilename;
                    var paths = '/public/files/' + inputFile.originalFilename;

                    console.log('parse files:' + dstPath);


                    res.send({
                        success: true,
                        imgUrl: paths
                    });

                    fs.rename(uploadedPath, dstPath, function (err) {
                        if (err) {
                            console.log('rename error: ' + err);
                        } else {
                            console.log('rename ok');
                        }
                    });
                }


            });
        },

        myItems: function (req, res) {
            console.log('ni shi zhu' + req.body.publishername);
            itemModel.find({publishername: req.body.publishername}, function (err, items) {
                if (err) res.json({err: err});
                for(var i=0;i<items.length;i++){
                    var mytime=items[i].publishtime;
                     items[i].publishtimed=moment(mytime, "YYYY-MM-DD HH:mm:ss").fromNow();
                };
                items.reverse();
                res.json(items);
            });

        },
        about: function (req, res) {
            res.render('./a.html');
        },
     category:function(req, res){
         var id=req.params.id;
           console.log(id);
         var category=en2ch(id);
         console.log(category);
         itemModel.find({category:category}, function (err, categorys) {
             if (err) res.json({err: err});
             for(var i=0;i<categorys.length;i++){
                 var mytimes=categorys[i].publishtime;
                 categorys[i].publishtimed=moment(mytimes, "YYYY-MM-DD HH:mm:ss").fromNow();
             };
             categorys.reverse();
             res.json(categorys);
         })
     },
        changMessage:function(req,res){
       var message=req.body;
            use.findOne({name: message.name}, function (err, user) {
                if (err) return res.json({err: err});
                if (user) {
                    return res.json({err: '用户名已经存在'});
                }
                var user = req.session["user"];
                console.log(user);
                console.log(message);

                itemModel.update({publishername: user.name}, {publishername:message.name}, {multi: true}, function (err) {
                    if (err) res.json({err: err})
                     console.log('更新成功');

                })

                use.update({_id: user._id}, message, {multi: false}, function (err) {
                    if (err) res.json({err: err})

                    user.name = message.name;
                    req.session["user"] = user;
                    console.log(user);
                    console.log(JSON.stringify(user) + 'hh');
                    res.json(user);
                })
            });

        },

        changPassword:function(req,res) {
            var message = req.body;
           var hash_password=crypto.createHash("md5").update(message.pass).digest("base64")
            var user = req.session["user"];
            console.log(user);
            use.update({_id: user._id}, {hash_password:hash_password}, {multi: false}, function (err) {
                if (err) res.json({err: err})
                req.session["user"] = '';

                console.log(JSON.stringify(user) + 'hh');
                res.json();
            })

        },
        itemdetail:function(req,res) {
            var _id=req.params.id;
            console.log(_id);
            itemModel.findOne({_id:_id}, function (err, item) {
                if (err) res.json({err: err});
                res.json(item);
            })
        },
        changeTrade:function(req,res){
            var message=req.body;
            itemModel.update({_id:message._id},{sold: message.sold},{multi: true}, function (err) {
                if (err) res.json({err: err})
                console.log('更新成功');
                res.json();

            })

        }
}


module.exports=Index;
