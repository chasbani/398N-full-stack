// =========================================
// DO NOT MODIFY This code block
const url =
  "http://api.nobelprize.org/v1/prize.json";

const winners = [];
console.log("Starting fetch");
fetch(url)
  .then(resp => resp.json())
  .then(data => winners.push(...data.prizes));
// =========================================

// The following line displays the winner data in console for you.
console.log(winners);

/*
Your task is to complete the functions described below according to the
description given in comments.
*/

/*
(1) Display the list of 2021 winners. 

Output: An array of strings where each contains the category and the winner
names in the following format:

<category> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- The first letter of the category should be capitalized. 
- If surname does not exist, use just firstname.
- If there is no winner for a category, use 'Not Awarded' as the winner name.
- The output should be sorted by category in ascending order
*/
const names1 = (n) => {
  if(n.hasOwnProperty('laureates')) {
    return n.laureates.reduce(
      ((names, n) =>{
        if (n.hasOwnProperty("surname")) { 
          return `${names} ${n.firstname} ${n.surname} / `;
        } else {
          return `${names} ${n.firstname} / `;
        } }), "").slice(0,-2);
  } else {
    return "Not Awarded";
  }
}

function winner2021() {

result1 = winners.filter(w => w.year == 2021);
result2 = result1.map(w => `${w.category.charAt(0).toUpperCase() + w.category.slice(1)} : ${names1(w)}`);
result3 = result2.sort((fe, se) => fe > se);
convertToHTML(result3);
}

/*
(2) Display the list of all Nobel peace winners, sorted by year, in an ascending
order.

Output: An array of strings where each contains the year and the winner names in
the following format:

<year> : <firstname 1> <surname 1> / <firstname 2> <surname 2> / ...

- If surname does not exist, use just firstname.
- If there is no winner for a year, use 'Not Awarded' as the winner name part
- 'Not Awarded' must be displayed in bold
- 2021 winner(s) must be displayed in blue, bold font.
- The output should be sorted by award year in ascending order
*/

const names2 = (n) => {
  if(n.hasOwnProperty('laureates')) {
    return n.laureates.reduce(
      ((names, n) =>{
          if (n.hasOwnProperty("surname")) { 
            return `${names} ${n.firstname} ${n.surname} / `;
          } else {
            return `${names} ${n.firstname} / `;
          }
 }), "").slice(0,-2);
  } else {
    return "Not Awarded".bold();
  }
}

function peaceWinners() {

const reducer = (list, w)=>{
            var par = w.year;
            if(w.category == "peace") {
              if(par == 2021) {
                if(list.hasOwnProperty(par)) {
                 list[par] += `\ ${names2(w).bold().fontcolor('blue')}`;
                } else {
                 list[par] = `${w.year} : ${names2(w).bold().fontcolor('blue')}`;
                }
              } else {
                if(list.hasOwnProperty(par)) {
                 list[par] += `\ ${names2(w)}`;
                } else {
                 list[par] = `${w.year} : ${names2(w)}`;
                }
              }
            }
            return list;
         }
         temp = winners.reduce(reducer, {});
  results1 = Object.values(temp).map(w => `${w}`);
results2 = results1.sort((fe, se) => fe > se);
convertToHTML(results2);
}

/*
(3) Display the total number of all Nobel Chemistry winners and also display the
counts of the years in which only one laureate was awarded, two laureates were
awarded, and three laureates were awarded. 

Output: Just an integer, followed by the 1-laureate, 2-laureate, and
3-laureate count)

For example, if only one laureates for 60 years, two laureates for 23 year, and
three laureates for 28 years, then, the output should be: 

190 (60, 23, 28)

- Consider a group as a winner.
- Display the output as underlined and 3 times bigger than the font of the body
  font size.
- Note that the prize was not awarded for some years. 
*/
function countChemistryWinners() {

const reducer = (list, w)=>{
            if(w.hasOwnProperty('laureates')) {
               var count = w.laureates.reduce((acc, e)=> acc+= 1,0);
               list[0] += count;
               if(count == 1) {
                list[1] +=1;
               }
               if(count == 2) {
                list[2] +=1;
               }
               if(count == 3) {
                list[3] +=1;
               }
            }
            return list;
         }
         temp = winners.filter(w => w.category == 'chemistry').reduce(reducer, [0,0,0,0]);
         const results = [`<u style="font-size:3rem;">${temp[0]} (${temp[1]}, ${temp[2]}, ${temp[3]})</u>`];
         convertToHTML(results);
// FUNCTION BODY HERE

}

/* 
(4) Display the names of the winner(s) who won the prize 2 or more times

Output: An array of strings where each contains the winner name, category, and
year in the following format:

<firstname 1> <surname 1> (<category> <year>)

Note that same id is used in the data for each distinct laureate
*/
function multiTimeWinner() {

// const reducer3 = (pe, ce, i, list)=>{
//                 if(w.hasOwnProperty("laureates")) {

//                   list = list.concat(w.laureates.reduce(reducer2, []).map(e=>([`${e}`, `(${w.category}, ${w.year})`])));
//                 }
//             return list;
//          }

const reducer2 = (list, l)=> {
      if (l.hasOwnProperty("surname")) { 
        list.push([`${l.firstname} ${l.surname}`]);
      } else {
        list.push([`${l.firstname}`]);
      }
          return list;
}
const reducer = (list, w)=>{
                if(w.hasOwnProperty("laureates")) {

                  list = list.concat(w.laureates.reduce(reducer2, []).map(e=>([`${e}`, `(${w.category}, ${w.year})`])));
                }
            return list;
         }
         const reducer3 = (list, w)=>{
                if(w.hasOwnProperty("laureates")) {

                  list = list.concat(w.laureates.reduce(reducer2, []).map(e=>`${e}`));
                }
            return list;
         }
         onlyNames = winners.reduce(reducer3, []);
         names = winners.reduce(reducer, []);
         test = names.filter(e => onlyNames.indexOf(e[0]) != onlyNames.lastIndexOf(e[0]));
         test = test.map(e => `${e[0]} ${e[1]}`);
         // temp = names.reduce(reducer3, []);
         // temp4 = Object.values(names).filter(e=> e.length > 1);
  // results1 = Object.values(temp).map(w => `${w}`);
convertToHTML(test);

}


// Utility function that takes an array of strings and converts into arrays into
// separate HTML list elements. (Hint: Use this to generate a series of list
// items from an array.)
function convertToHTML(query) {
  const results = query.map(e => `<li>${e}</li>`).join("");
  laureateList.innerHTML = results;
}

// A javascript reference to the unordered list with classname list. 
// (Hint: Use this!)
const laureateList = document.querySelector(".list");
