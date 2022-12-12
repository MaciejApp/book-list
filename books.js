// HTML DOM elements
const userForm = document.getElementById("form");
const bookList = document.querySelector("#bookList");
const inputBookTitle = userForm["title"];
const inputBookAuthor = userForm["author"];
const inputBookGenre = userForm["genre"];
const inputBookPages = userForm["pages"];
// get array from sessionStorage or create an empty array if page loaded first time
const books = JSON.parse(sessionStorage.getItem("books")) || [];
// create a new book object that takes details as a parameter
const addBook = (title, author, genre, pages) => {
    books.push({
        title,
        author,
        genre,
        pages
    })
// add new book to sessionStorage
    sessionStorage.setItem("books", JSON.stringify(books));

    return {title, author, genre, pages};
};
// function to display book details
const createListItem = ({title, author, genre, pages}) => {
// create list item and its id
    const list = document.createElement('li');
    list.id = title;
// create title span item and fill using innerText
    bookTitle = document.createElement('span');
    bookTitle.className = 'span_title';
// bookTitle.innerText = document.getElementById('title').value;
    bookTitle.innerText = title;
// create author span item and fill using innerText
    bookAuthor = document.createElement('span');
    bookAuthor.innerText = author;
    bookAuthor.className = 'span_author';
// create genre span item and fill using innerText
    bookGenre = document.createElement('span');
    bookGenre.innerText = genre;
    bookGenre.className = 'span_genre';
// create pages span item and fill using innerText
    bookPages = document.createElement('span');
    bookPages.innerText = pages;  
    bookPages.className = 'span_pages';
// create edit button item and its id
    const bookEdit = document.createElement('button');
    bookEdit.innerText = 'edit';
    bookEdit.className = 'edit';
// create delete button item and its id
    const bookDelete = document.createElement('button');
    bookDelete.className = 'delete';
    bookDelete.innerText = 'delete';
// add to display
    list.append(bookTitle, bookAuthor, bookGenre, bookPages, bookEdit, bookDelete);
    bookList.appendChild(list);
}

// loop through books array and call function to display each book details
books.forEach(createListItem);

// create form element onsubmit interaction
userForm.onsubmit = e => {
// prevent submit of the form data to server 
    e.preventDefault();
// check for user input in prompt, if not valid alert user
    if(document.querySelector('#title').value === '' ||
    document.querySelector('#author').value === '' ||
    document.querySelector('#genre').value === '' ||
    document.querySelector('#pages').value === '') {
        alert('fill in form please');
      } else {

    const newBook = addBook(inputBookTitle.value, inputBookAuthor.value, inputBookGenre.value, inputBookPages.value)

    createListItem(newBook);
// clear input fields after creating new entry
    inputBookTitle.value = "";
    inputBookAuthor.value = "";
    inputBookGenre.value = "";
    inputBookPages.value = "";
      };
};


const amendListItem = document.querySelector("#bookList");
amendListItem.addEventListener('click', event => {
  if (event.target.classList.contains("edit")) {
// Get the ID of the book
    const titleID = event.target.parentElement.id;

// Loop through the books array to find the book with the matching ID
    books.forEach((item) => {
      if (titleID === item.title) {
// Convert the span elements to input elements
        const spanElements = event.target.parentNode.querySelectorAll('span');
        spanElements.forEach(span => {

// Create a div element
            const div = document.createElement('div');


            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.innerText;
            input.className = span.className;
            input.maxLength = 20;
            span.replaceWith(input);
        });

// Replace the edit button with a save button
        const saveButton = document.createElement('button');
        saveButton.innerText = 'save';
        saveButton.className = 'save';
        event.target.replaceWith(saveButton);
      }
    });
  } else if (event.target.classList.contains("save")) {
// Get the ID of the book
    const titleID = event.target.parentElement.id;

// Loop through the books array to find the book with the matching ID
    books.forEach((item) => {
      if (titleID === item.title) {
// Loop through the input elements to update the corresponding properties in the books array
// if the input value is different from the original item value
        const inputElements = event.target.parentNode.querySelectorAll('input');
        inputElements.forEach(input => {
          if (input.classList.contains("span_title")) {
            if (input.value !== item.title) {
              item.title = input.value;
            }
          } else if (input.classList.contains("span_author")) {
            if (input.value !== item.author) {
              item.author = input.value;
            }
          } else if (input.classList.contains("span_genre")) {
            if (input.value !== item.genre) {
              item.genre = input.value;
            }
          } else if (input.classList.contains("span_pages")) {
            if (input.value !== item.pages) {
              item.pages = input.value;
            }
          }
        });
// Update the session storage with the updated books array
        sessionStorage.setItem("books", JSON.stringify(books));

// Convert the input elements to span elements
        const spanInputElements = event.target.parentNode.querySelectorAll('input');
        spanInputElements.forEach(input => {
          const span = document.createElement('span');
          span.innerText = input.value;
          span.className = input.className;
          input.replaceWith(span);
        });

// Replace the save button with an edit button
        const editButton = document.createElement('button');
        editButton.innerText = 'edit';
        editButton.className = 'edit';
        event.target.replaceWith(editButton);
      }
    });
// delete function
  } else if (event.target.classList.contains("delete")) {
// use JavaScript method to remove element from HTML DOM
    event.target.parentElement.remove();
    const titleID = event.target.parentElement.id;
// create copy of array
    books.slice(0).forEach((item) => {
      if(titleID === item.title) {
// if match is found remove item from array by checking its index
        books.splice(books.indexOf(item), 1);
// update sessionStorage
        sessionStorage.setItem("books", JSON.stringify(books));
      }
    });
  }
});
