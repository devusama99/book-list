// BOOK constructor
function Book(title , author , isbn)
{
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI(){}
// add book to UI
UI.prototype.addBookTolist = function(book)
{
    const list = document.querySelector('#book-list');

    // create an element
    const row = document.createElement('tr');
    // insert td
    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="#" class="delete" >X</a></td>`;
    list.appendChild(row);
};
UI.prototype.clearInputs = function()
{
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}
UI.prototype.infoBox = function(value)
{
    const par = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    const msg = document.createElement('div');    
    if( value === true)
    {
        msg.className = 'alert success';
        msg.appendChild(document.createTextNode('Added Successfully'));
    }
    else if ( value === 'delete' )
    {
        msg.className = 'alert success';
        msg.appendChild(document.createTextNode('Deleted Successfully'));
    }
    else
    {
        msg.className = 'alert error';
        msg.appendChild(document.createTextNode('Please Enter All Fields'));
    }

    par.insertBefore(msg , form);

    // timeout
    setTimeout(function removeAlert()
    {
        document.querySelector('.alert').remove();
    } , 3000);

    
}


// eventlistners

document.getElementById('book-form').addEventListener('submit' , function(e)
{
    // Get Form values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // 
    const book = new Book(title , author, isbn);


    // ui
    const ui = new UI();


    // validation
    if(title ===''|| author ==='' || isbn === '')
    {
        ui.infoBox(false);
    }
    else
    {
        // add book to list
        ui.addBookTolist(book);

        // clear inputs
        ui.clearInputs();

        // alert
        ui.infoBox(true);
    }

  
    e.preventDefault();
});

// eventListner for delete

document.getElementById('book-list').addEventListener('click',deleteBook);

function deleteBook(e)
{
    const cross = e.target;
    console.log(cross);
    if(cross.classList.contains('delete'))
    {
        if(confirm('Are you sure you want to delete'))
        {
            cross.parentElement.parentElement.remove();
            const ui = new UI();
            ui.infoBox('delete');
        }
        
    }
}

