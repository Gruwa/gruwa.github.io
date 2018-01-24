var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true}, //тип поля строка, и и поле обязательное
    lastName: {type: Schema.Types.ObjectId},// филду присваивается айдишка создаваемая самой бд
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},//unique - говорит что будет экстровалидация
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]// ref - говорит мангусту, что этот модель конектится к другому модулю
    // и указываем его имя (в ответ в другом модуле тожк должно быть указано куда он подключается)
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);