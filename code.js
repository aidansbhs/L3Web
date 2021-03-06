var products = [
  ['imgs/Products/Product%201.png', 'Regular Chair', 50, 'description'],
  ['imgs/Products/Product%202.png', 'Not Fancy Chair', 25, 'description'],
  ['imgs/Products/Product%205.png', 'Office Chair', 120, 'description'],
  ['imgs/Products/Product%208.png', 'Unusual Chair', 500, 'description'],
  ['imgs/Products/Product%207.png', 'Sunday Afternoon Chair', 150, 'description'],
  ['imgs/Products/Product%206.png', 'Nice Chair', 200, 'description']
];

var cartItems = [];
var totalItems = 0;
var empty = true;
var plus = '<div class="increase">' + '+' + '</div>';
var minus = '<div class="decrease">' + '-' + '</div>';
var cartAdd = '<div class="cartAdd">' + 'Add To Cart' + '</div>';

function loadProducts() { //loading products on the product page

  var main = document.getElementById('items'); //where these elements will go on the cart html page

  for (var i = 0; i < products.length; i++) { //for loop to make these elements for each of the items in the products array

    //creating the elements properties
    var ele = document.createElement('li');
    var pic = document.createElement('img');
    var header = document.createElement('h2');
    var price = document.createElement('h2');
    var desc = document.createElement('p');
    var increase = document.createElement('button');
    var box = document.createElement('input');
    var decrease = document.createElement('button');
    var add = document.createElement('button');

    //appendchild makes all these elements childs of the list or goes under it
    main.appendChild(ele);
    ele.appendChild(pic);
    ele.appendChild(header);
    ele.appendChild(price);
    ele.appendChild(desc);
    ele.appendChild(increase);
    ele.appendChild(box);
    ele.appendChild(decrease);
    ele.appendChild(add);

    //sets these elements content to the html page
    pic.src = products[i][0];
    header.innerHTML = products[i][1];
    price.innerHTML = '$' + products[i][2];
    desc.innerHTML = products[i][3];
    increase.innerHTML = plus;
    decrease.innerHTML = minus;
    box.type = 'number';
    add.innerHTML = cartAdd;
    box.setAttribute('id', 'input' + i);
    box.value = 1;

    increase.dataset.cartIndex = i;
    increase.addEventListener('click', increasing, false);

    decrease.dataset.cartIndex = i;
    decrease.addEventListener('click', decreasing, false);

    add.dataset.cartIndex = i;
    add.addEventListener('click', adding, false);
  }
} //end of loadProducts

function increasing(num) {
  const NUM = event.currentTarget.dataset.cartIndex;
  var inputBox = document.getElementById('input' + NUM);
  inputBox.value++;
} //end of increasing

function decreasing(num){
  const NUM = event.currentTarget.dataset.cartIndex;
   var inputBox = document.getElementById('input' + NUM).value;
   if(inputBox > 1){ //only if greater than 1 it will minus therefore won't go into negatives
     inputBox--;
     document.getElementById('input' + NUM).value = inputBox;
   }
} //end of decreasing

function adding(event) { //function for the button to add products to cart
  const NUM = event.currentTarget.dataset.cartIndex;
  cartItems.push([products[NUM]]); //pushes the products as the number dataset into the cart
  cartItems[cartItems.length - 1][1] = Number(document.getElementById('input' + NUM).value);

  updateCart();
} //end of adding

function updateCart() {
  var itemCounter = document.getElementById('itemCount');
  totalItems = 0;

  for (var i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i][1];
  }

  window.sessionStorage.setItem('cartItems', JSON.stringify(cartItems)); //stores the items in cart to the website so it isn't lost when changing pages
  itemCounter.innerHTML = totalItems;
} //end of updateCart

function loadCart() { // loading products on cart page
  var main = document.getElementById('cartProducts'); //where these elements will go on the cart html page

  var data = sessionStorage.getItem('cartItems');
  data = JSON.parse(data);
  cartItems = data;

  updateCart();

  for (var i = 0; i < cartItems.length; i++) {

    //creating the elements properties
    var ele = document.createElement('li');
    var pic = document.createElement('img');
    var header = document.createElement('h2');
    var price = document.createElement('h2');
    var subtract = document.createElement('button');
    var amount = document.createElement('h2');
    var subtotal = document.createElement('h3');
    var grandTotal = document.createElement('h2');

    //appendchild makes all these elements childs of the list or goes under it
    main.appendChild(ele);
    ele.appendChild(pic);
    ele.appendChild(header);
    ele.appendChild(price);
    ele.appendChild(amount);
    ele.appendChild(subtotal);
    ele.appendChild(subtract);
    ele.appendChild(grandTotal);

    //sets these elements content to the html page
    pic.src = cartItems[i][0][0];
    header.innerHTML = '<div class="name">' + cartItems[i][0][1] + '</div>';
    price.innerHTML = '<div class="price">' + '$' + cartItems[i][0][2] + '</div>';
    amount.innerHTML = '<div class="amount">' + 'Quantity: ' + cartItems[i][1] + '</div>';
    subtotal.innerHTML = '<div class="subtotal">' + '$' + cartItems[i][1] * cartItems[i][0][2] + '</div>';
    subtract.innerHTML = 'Remove';
    subtract.dataset.cartIndex = i;
    subtract.addEventListener('click', deleteItems, false);

    if (cartItems.length > 0) { //if there is nothing in the cart
      empty = false;
    }
    if (empty == true) { //it will display this text
      var main = document.getElementById('empty');
      var text = document.createElement('h2');
      main.appendChild(text);
      text.innerHTML = 'Your Cart Is empty';
    }
  }
} //end of loadCart

function deleteItems() { //function for removing the items in the cart
  const NUM = event.currentTarget.dataset.cartIndex;
  delete cartItems[NUM]; //deletes the item you clicked remove on
  cartItems = cartItems.filter(item => item !== undefined); //once it's deleted the array will become undefined so this will filter out that problem and make it null
  updateCart();
  loadCart();
  window.location.reload(true); //refreshes the page to get rid of product still on page after its properties was deleted
} //end of deleteItems

window.onload = function() {
  loadProducts();
} //end of window.onload
