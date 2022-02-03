const message = (str) => {
    const insert = (arr, index, newItem) => [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // part of the array after the specified index
      ...arr.slice(index),
    ];
    let result = [];
    let myStr = str.split('');
    let length = myStr.length;
    let a = null;
    let count = 0
    for (let i = 0;i < length;i++){
      a = str.charCodeAt(i)
      if (a >= 65 &&  a <= 90){
        myStr[i] = myStr[i].toLowerCase();
        result = insert(myStr, i, " ")
      }
    }
    return result.join("")
 }

let text = "namaBarang"
let test = message(text)
console.log(test)