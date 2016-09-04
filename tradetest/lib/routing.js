/**
 * Created by lyx on 2016/7/25.
 */
/**
 * Created by lyx on 2016/7/25.
 */
var route=require('route').route;
module.exports=function(app){
    app.get('/',route.index);
    app.get('/login',route.loindex);
    app.post('/login',route.login);
    app.get('/register',route.reindex);
    app.post('/register',route.regist);
    app.get('/logout',route.logout);
};
