//----------------------------------------------------------------------------------
//Part 1,2 - Class definition
//----------------------------------------------------------------------------------
/*
TODO: Create a Book class;
Class Name: Book
Description: The parent class with 3 public instance fields

-------------------------------------------------------------------------------
Constructor 
- Params: title, author, pages
-------------------------------------------------------------------------------
Method: reading()
Description: Function that returns the following string:
"You chose <book_title>, here are are its details: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
<BookType Data>: <BookType Data>"

- details() you will implement in the child classes below will be used for 
  the book details.
-------------------------------------------------------------------------------
Method: addToTable()
Description: Function that reads the input form data and adds a book to the 
table below the submit button

- Use querySelector() to obtain a reference to the book table
- Use createElement() in order to create a new table row.
- Populate the table row using innerHTML
- Assign text color based on type of object 
  (Textbook : Red, PictureBook : Blue, CookBook : Green) 
  Resource: https://www.w3schools.com/jsref/prop_html_style.asp
- Append the new row to the table
- Add an event listener to the row that listens for a 'click' event. When  
  clicked will use the return value of the reading() function to display an alert.
- Clear input fields after adding the book
*/

//
// Todo: 
// Book class here!
//
class Book {

  constructor(title, author, pages) {
    this.book_title = title;
    this.book_author = author;
    this.book_pages = pages;
  }

  reading() {
    return `You chose ${this.book_title}, here are its details:\n ${this.details()}`;
  }

  addToTable() {
    
    var tab = document.querySelector("#table");
    var row = document.createElement("tr");
    var c;
    if (this.constructor.name == "TextBook") {
      c = "Red";
    } else if (this.constructor.name == "PictureBook") {
      c = "Blue";
    } else {
      c = "Green";
    }
    row.style.color = c;
    row.innerHTML = `<td>${this.book_title}</td><td>${this.book_author}</td><td>${this.book_pages}</td>`;
    tab.appendChild(row);
    row.addEventListener("click", () => {alert(this.reading());});
    clearInputs();
  }
}
/*
TODO: Create a TextBook class that inherits from the Book class.
Class Name: TextBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, subject;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string:
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Subject: <book_subject>
*/

//
// Todo: 
// TextBook class here!
//
class TextBook extends Book {

  constructor(title, author, pages, subject) {
    super(title, author, pages);
    this.book_subject = subject;
  }

  details() {
    return `Title: ${this.book_title}\n Author: ${this.book_author}\n Page #: ${this.book_pages}\n Subject: ${this.book_subject}`;
  }
}
/*
TODO: Create a PictureBook class that inherits from the Book class.
Class Name: PictureBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, illustrator;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Illustrator: <book_illustrator>
*/

//
// Todo: 
// PictureBook class here!
//
class PictureBook extends Book {

  constructor(title, author, pages, illustrator) {
    super(title, author, pages);
    this.book_illustrator = illustrator;
  }

  details() {
    return `Title: ${this.book_title}\n Author: ${this.book_author}\n Page #: ${this.book_pages}\n Illustrator: ${this.book_illustrator}`;
  }
}
/*
TODO: Create a CookBook class that inherits from the Book class.
Class Name: CookBook
Description: Inherits from Book, should have a function called details().
Constructor Params: title, author, pages, cuisine;
  - title, author, and pages are should be initialized by calling super.

Method: details() returns a string: 
Title: <book_title>
Author: <book_author>
Page #: <book_pages>
Cuisine: <book_cuisine>
*/

//
// Todo: 
// CookBook class here!
//
class CookBook extends Book {

  constructor(title, author, pages, cuisine) {
    super(title, author, pages);
    this.book_cuisine = cuisine;
  }

  details() {
    return `Title: ${this.book_title}\n Author: ${this.book_author}\n Page #: ${this.book_pages}\n Subject: ${this.book_cuisine}`;
  }
}
//----------------------------------------------------------------------------------
//Part 3 - Putting it all together
//----------------------------------------------------------------------------------

// 
// Todo: 
// Declare variables of which values are the references to the HTML elements with 
// the id 'title', 'author', 'pages', 'bookType', and 'data'. 
// - use querySelector 
var title = document.querySelector("#title");
var author = document.querySelector("#author");
var pages = document.querySelector("#pages");
var bookType = document.querySelector("#bookType");
var data = document.querySelector("#data");


// 
// Todo: 
// - save form data into variables
// - validate inputs
// - create an object based on the book type
// - add the book to the table by calling addToTable of the created object
//
function addBook() {
  t = title.value;
  a = author.value;
  p = pages.value;
  d = data.value;
  var i = bookType.selectedIndex;
  console.log(t);
  console.log(a);
  console.log(p);
  console.log(d);
  type = bookType.options[i].value;
  var book;
  var mes = "";
  if(t == "") {
    mes = `${mes} Title can not be empty\n`;
  }
  if(a == "") {
    mes = `${mes} Author can not be empty\n`;
  }
  if(p == "") {
    mes = `${mes} Page can not be empty\n`;
  } else if(isNaN(p)) {
    mes = `${mes} Page should be an integer\n`;
  }
  if(d == "") {
    mes = `${mes} Data can not be empty\n`;
  }
  if (mes != "") {
    alert(mes);
  } else {
    if(type == "PictureBook") {
      book = new PictureBook(t, a, p, d);
    } else if (type == "TextBook") {
      book = new TextBook(t, a, p, d);
    } else if (type == "CookBook") {
      book = new CookBook(t, a, p, d);
    }
    book.addToTable();
  }

}

//
// Todo: 
// Clear input form elements
// Note that the default book type is "TextBook" and the default dataLabel is "Subject"
//
function clearInputs() {
  document.querySelector("#book-form").reset();
  document.querySelector("#dataLabel").innerText = "Subject";
}

//
// Todo: 
// Register an event handler function (to the bookType) that switches the names of
// the last input's label based on book type chosen.
//
document.querySelector("#bookType").addEventListener("change", (e) => {
var text;
if(e.target.value == "TextBook") {
  text = "Subject";
} else if (e.target.value == "PictureBook") {
  text = "Illustrator";
} else {
  text = "Cuisine";
}
  document.querySelector("#dataLabel").innerText = text;});
