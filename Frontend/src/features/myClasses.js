const nums = [12, 5, 8, 130, 44];
const arr = [12, 5, 8, 130, 44];
console.log(nums.shift());

function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
      console.log(`Step ${i}-${j}:`, arr);
    }
  }
  return arr;
}



const  bubble  = () => {
   let n = arr.length;
   for(let i = 0; i< n ; i++){
    for(let j = 0;j < n-1 ;j++){
        if(arr[i] > arr[j + 1]){
            let temp = arr[j];
            arr[j] = arr[j+1];
            arr[j + 1] = temp

        }
    }
   }
   return arr
}

console.log(bubble(nums));

console.log(bubbleSort(nums)); 
// [5, 8, 12, 44, 130]

// const users = [
//   { name: "Pankaj", role: "admin" },
//   { name: "Ravi", role: "employee" },
//   { name: "Sara", role: "admin" }
// ];


// let a = users
// .filter((user) => user.role ==='admin')
// .map(user => user.name)
                
// console.log(a);




// // 
// const nums = [12, 5, 8, 130, 44];
// console.log(nums.sort((a,b) => b-a ));


// let maxVal = nums[0];
// nums.forEach(num => {
//   if (num > maxVal) maxVal = num;
// });
// console.log(maxVal); // 130
// // // console.log(nums.filter((num) => (num > 10)));


// const words = ["tea", "coffee", "milk", "sugar", "a"];

// console.log(words.filter((word) => (word.length > 3)));


// const users = [
//   { name: "Pankaj", role: "admin" },
//   { name: "Ravi", role: "employee" },
//   { name: "Sara", role: "admin" }
// ];

// console.log(
//     users.filter((user) => (user.role ==='admin'))
// );


// const arr = [0, 1, false, 2, "", 3, null, "hello"];
// console.log(arr.filter( Boolean));


// const nums = [1, 2, 2, 3, 4, 4, 5];
// console.log(nums.filter((num,index , arr) => (
//      arr.indexOf(num) === index
// )));


// const dates = [new Date("2024-01-01"), new Date("2026-01-01"), new Date("2025-12-01")];
// const now = new Date("2025-01-01");

// console.log(dates.filter((d) => d > now));


// const products = [
//   { name: "Laptop", price: 1000 },
//   { name: "Mouse", price: 20 },
//   { name: "Keyboard", price: 50 },
//   { name: "Monitor", price: 200 }
// ];


// console.log(products.filter( product => product.price >=50 && product.price <= 500));
