const socket = io();

const addForm = document.getElementById("addForm");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = addForm.elements.title.value;
  const description = addForm.elements.description.value;
  const price = addForm.elements.price.value;
  const code = addForm.elements.code.value;
  const stock = addForm.elements.stock.value;
  const category = addForm.elements.category.value;

  socket.emit('newProduct', {
    title,
    description,
    price,
    code,
    stock,
    category
  });
});

socket.on('updateProducts', (data) => {
  const tbody = document.getElementById("productsNow");

  const productsMap = data
    .map((item) => {
      return `<tr>
      <th scope="row">${item._id}</th>
      <td>${item.title}</td>
      <td>${item.description}</td>
      <td>${item.price}</td>
      <td>${item.code}</td>
      <td>${item.stock}</td>
      <td>${item.category}</td>
      <td>${item.status}</td>
      </tr>`;
    })
    .join("");
  tbody.innerHTML = productsMap;
});

const deleteForm = document.getElementById("deleteForm");

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const _id = deleteForm.elements._id.value;

  socket.emit('deleteProduct', _id);
});

const input = document.getElementById('textbox');
const log = document.getElementById('log');
    
input.addEventListener('keyup', evt =>{
  if(evt.key === 'Enter'){
      socket.emit('messages',input.value)
      input.value = '';
  }
})

socket.on('log',data=>{

  let logs = '';

  data.logs.forEach(log => {
  logs += `${ log.socketid } say: ${ log.message} <br/>`      
  });
  log.innerHTML = logs;    
});

