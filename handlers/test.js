exports.printNumberAsync = (number, numFunc) => {  
    setTimeout(() => {
        console.log(number);
        date = Date.now();
        numFunc(date)
    }, 2000);
}

exports.printNumber = (date) => {
    console.log(date);
}
