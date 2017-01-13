function Registration(a, newName, result) {

var list = [];
list.lenght = a;

for (var i = 0; i < list.lenght; i++) {
    list[i] = newName[i];
}
console.log(list);

var name = result;


    for (var i = 0; i < list.length; i++) {
        if (name == list[i]){
            return name;
            }
        }
    return false;
    }
