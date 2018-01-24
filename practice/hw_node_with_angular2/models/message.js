var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: {type: String, required: true}, //тип поля строка, и и поле обязательное
    user: {type: Schema.Types.ObjectId, ref: 'User'}// филду присваивается айдишка создаваемая самой бд
    // ref - говорит мангусту, что этот модель конектится к другому модулю
    // и указываем его имя (в ответ в другом модуле тожк должно быть указано куда он подключается)
});

module.exports = mongoose.model('Message', schema);