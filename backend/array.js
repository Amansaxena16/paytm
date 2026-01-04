num  = [10, 20, 30, 40]

let smallest = 50;

for(var i = 0; i < num.length; i++){
    if(num[i] < smallest){
        smallest = num[i]
    }
}

console.log(smallest)