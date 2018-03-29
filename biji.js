//mogoose支持的两种增加实例的方法
var mogoose = require('mogoose');

//链接数据库
var uri = 'username:password@hostname:port/dataBaseName';
mongoose.Promise = global.Promise; //在连接数据库之前必须有这一个语句
mogoose.connect('uri', {
	'useMongoClient': true
});

//创建模式
var UserSchema = new mogoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	regTime: {
		type: Date,
		default: Date.now
	}
});

//根据模式创建模型类
var UserModel = mogoose.model('User', UserSchema);

// 这里的模型类也可以直接创建，而不用通过Schema,向下面的这样：
// var UserModel=mogoose.model("User",{
// 	username:{type:String,unique:true},
// 	password:{type:String},
// 	email:{type:String,unique:true},
// 	regTime:{type:Date,default:Date.now}
// })

/////////////////////////////增加一条文档的第一种方法////////////////////////////
//的到一个UserModel的实例
use1 = new UserModel({
	"username": "user1",
	"password": "123456",
	"email": '123456@qq.com'
});

//保存这一个用户实例,这里调用的是实例方法
use1.save(function(err) {
	if (err)
		console.log('保存用户出错' + ":" + err.errmsg)
});

//////////////////////增加一条文档的第二种方法/////////////////////////////////

UserModel.create({
	"username": "user2",
	"password": "123456",
	"email": "12345678@qq.com"
}, function(err) {
	if (err)
		console.log('保存用户出错' + ":" + err.errmsg)

});