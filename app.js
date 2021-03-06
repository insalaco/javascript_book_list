// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {} // defines UI

UI.prototype.addBookToList = function(book) {
  // get table body element
  const list = document.getElementById('book-list');
  // create tr element
  const row = document.createElement('tr');

  // insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  // append row variable to body id list
  list.appendChild(row); 
}

// show alert
UI.prototype.showAlert = function(message, className) {
  // create div
  const div = document.createElement('div');
  // class name
  div.className = `alert ${className}`;
  // add text
  div.appendChild(document.createTextNode(message));
  
  // get parent
  const container = document.querySelector('.container');

  // get form
  const form = document.querySelector('#book-form');

  // insert alert
  container.insertBefore(div, form);

  // timeout after 3 sec
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);
}

// delete book
UI.prototype.deleteBook = function(target) {
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}

// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // instantiate new book
  const book = new Book(title, author, isbn);
  
  // instantiate new ui
  const ui = new UI();

  //validate 
  if(title === '' || author === '' || isbn === '') {
    // error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    // add book to list
    ui.addBookToList(book);

    //show success
    ui.showAlert('Book Added!', 'success');
    // clear fields
    ui.clearFields();
  }


  
  e.preventDefault(); // prevents submit through http
});

// event listener for delete
// get parent id
document.getElementById('book-list').addEventListener('click', function(e) {
  e.preventDefault();

  //instantiate UI
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // show alert
  ui.showAlert('Book removed', 'success');
})
