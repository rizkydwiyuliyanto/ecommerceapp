const formatNumber = (num) => {
    let arrNum = num.split("");
    arrNum.shift();
    arrNum.unshift(2)
    arrNum.unshift(6)
    return arrNum.join("")
}
let a = formatNumber("0813442442")
console.log(a)