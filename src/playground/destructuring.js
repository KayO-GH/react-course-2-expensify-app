//
//Object Destructuring
//

// const person = {
//     name:"KayO",
//     age: 23,
//     location:{
//         city: "Philadelphia",
//         temp: 88
//     }
// };

// const {name: firstName = "Anonymous", age} = person;
// console.log(`${firstName} is ${age}.`);

// const {city, temp: temperature} = person.location;
// if(city && temperature)
//     console.log(`It's ${temperature} in ${city}`);

// const book = {
//     title: "Ego is the Enemy",
//     author: "Ryan Holiday",
//     publisher: {
//         name: "Penguin"
//     }
// };

// const {name: publisherName = "Self-Published"} =  book.publisher;
// console.log(publisherName);


//
//Array Destructuring
//

const address = ["1299 S Juniper Street", "Kumasi", "Ashanti Region", "00233"];
const [, city, region = "Greater Accra"] = address;
console.log(`You are in ${city}, ${region}.`);

const item = ["Coffee (hot)", "$2.00", "$2.50", "$2.75"];
const [coffeeType, , mediumPrice] = item;
console.log(`A medium ${coffeeType} costs ${mediumPrice}`);