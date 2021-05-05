import { element } from "prop-types";

const ocrText = [
    "DATE 08/01/2016 weo",
    "SRR",
    "IUCHINNT GREEN $4.66",
    "0.778kg NET @ $5.99/ka",
    "BANANA CAVENDISH $1.32",
    "0.442kn NET # $2.98/ka",
    "SPECIAL $0.99",
    "SPECIAL $1.50",
    "POTATOES BRUSHED $3.97",
    "] 1.328ka NET © $2.99/kg",
    "BROCCOLT $4.84",
    "0.808ka NET @ $5.99/ka",
    "BRUSSEL SPROUTS $5.15",
    "0.32kg NET @ $15.99/ka",
    "SPECTAL $0.99",
    "GRAPES GREEN $7.03",
    "1.174kg NET @ $5.99/ka",
    "PEAS SNOW $3.21",
    "0.218ka NET @ $14.99/ka",
    "TONATOES GRAPE $2.99",
    "LETTUCE ICEBERG $2.49",
    "SUBTOTAL $39.20",
    "‘ SUBTOTAL -15.00",
    "4 SUBTOTAL $24.20",
    "SUBTOTAL $24.20",
    "SUBTOTAL $24.20",
    "TOTAL $24 .20",
    "CASH $50.00",
    "CHANGE $25.80",
    ""
]

const WordList ={
    "fruitsVegs": [
      "apricots",
      "artichokes",
      "arugula",
      "asparagus",
      "avocados",
      "basil",
      "beets",
      "black-eyed peas",
      "blood oranges ",
      "broccoli",
      "carrots",
      "cauliflower ",
      "chard ",
      "cherries",
      "corn",
      "cucumber",
      "eggplant",
      "fava beans",
      "fennel",
      "fiddleheads",
      "garlic",
      "figs",
      "grapefruits ",
      "green onions ",
      "kohlrabi",
      "kumquats",
      "medjool dates",
      "morels",
      "mushrooms",
      "navel oranges",
      "nectarines",
      "nettles",
      "lettuce",
      "okra",
      "parsley",
      "passion fruit",
      "pea beans",
      "peaches",
      "plums",
      "potatoes",
      "radish",
      "raspberries",
      "rhubarb",
      "spinach ",
      "spring onions",
      "strawberries",
      "tomatoes",
      "turnips",
      "apples",
      "apricots",
      "asparagus",
      "avocados",
      "cherries",
      "basil",
      "beets",
      "blackberries ",
      "blueberries",
      "boysenberries",
      "broccoli",
      "cabbage ",
      "carrots ",
      "collards",
      "corn",
      "cucumber",
      "eggplants",
      "figs",
      "grapes",
      "grapefruits",
      "kale",
      "kohlrabi",
      "lemons",
      "lettuce",
      "melons",
      "mushrooms",
      "mustard",
      "navel oranges",
      "nectarines",
      "okra ",
      "peaches",
      "peppers",
      "persimmons",
      "plums ",
      "potatoes",
      "raspberries",
      "sapote",
      "spinach",
      "strawberries",
      "summer squash",
      "tomatillos",
      "tomatoes",
      "turnips",
      "valencia oranges",
      "apples ",
      "artichokes",
      "arugula",
      "asian pears",
      "avocados",
      "beets ",
      "broccoli",
      "brussels sprouts ",
      "cabbage ",
      "carambola",
      "carrots ",
      "cauliflower",
      "celery",
      "cherimoyas",
      "chili pepper",
      "collards",
      "corn",
      "cranberries",
      "cucumber",
      "edamame",
      "eggplant",
      "fennel",
      "figs",
      "garlic",
      "grapefruits",
      "grapes ",
      "green beans",
      "green onions",
      "guava ",
      "kale",
      "kiwi",
      "kohlrabi",
      "leeks",
      "lemongrass ",
      "lemons",
      "limes",
      "mushrooms",
      "mustard",
      "nectarines",
      "onions",
      "okra ",
      "oranges",
      "parsnips",
      "passion fruit",
      "peaches ",
      "pears ",
      "peppers ",
      "persimmons ",
      "pineapples",
      "plums ",
      "potatoes",
      "pomegranates",
      "pumpkins",
      "quinces",
      "radishes",
      "rapini",
      "raspberries ",
      "rutabaga",
      "salsify",
      "sapote ",
      "scallions",
      "shallots",
      "spinach",
      "strawberries ",
      "sweet potatoes",
      "tomatillos ",
      "tomatoes ",
      "turnips",
      "yams",
      "apples ",
      "asparagus",
      "avocados",
      "beets",
      "brussels sprouts",
      "cabbage",
      "carrots ",
      "cauliflower",
      "celery",
      "collards",
      "corn ",
      "cucumber",
      "green beans",
      "green onions",
      "green peas",
      "grapefruits",
      "grapes",
      "guava",
      "brussel",
      "kale ",
      "kiwi",
      "kumquats",
      "lemons",
      "lettuce",
      "mushrooms",
      "mustard",
      "navel oranges",
      "passion fruit",
      "pineapples",
      "spinach",
      "strawberries",
      "tangelos",
      "tangerines",
      "turnips",
      "valencia oranges",
      "winter squash",
      "yams",
      "banana"
    ]
  }

const wl = WordList.fruitsVegs

console.log(wl.length)


var x = [
    "net",
    "subtotal",
    "cash",
    "change",
    "@",
    "special"
] 
// look for date and total

const regex =  RegExp('(' + x.join('|') + ')', 'g');


var lowerCaseOCR = ocrText.map(element =>element.toLowerCase())


let filteredOCR = []
lowerCaseOCR.map(element=>filteredOCR .push(element.replace(regex, "").trim()))

let foundItems = []
const wlregex = RegExp('(' + wl.join('|') + ')', 'g');
filteredOCR.map(element=> {if(wlregex.test(element)){foundItems.push(element)}})

var name = []
var cost = []
var quantity = []

foundItems.map(element=>{
     let split = element.split("$")
     name.push(split[0])
    cost.push(split[1])
    quantity.push("1")    
    })

console.log(name, cost, quantity)


// filteredOCR .map((element, index)=>{
//     // console.log(element)
//     element.map(element=> {
//         console.log(element)
//         if(wl.includes(element))
//             {
//                 console.log(element)
//                 let x = { name: element, pos: index}
//                 foundItems.push(x)
//             }
//         })
//     })



// const costArry = foundItems.map(element=> filteredOCR[element.pos].join().replace(RegExp(",","g")," ").split("$"))


// var name = []
// var cost = []
// var quantity = []
// costArry.filter(element=>{name.push(element[0])
//     cost.push(element[1])
//     quantity.push("1")    
//  })

// console.log(name)


// console.log((ocrText[3]))
// console.log(wl.includes(ocrText[1]))