/*Since we are loading the js in the background with async. We have to check the state of js whether it is still loading or loaded already.
*/

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', main);
}else{
    main();
}

function main(){
    //declare a var for all the remove buttons
    var removeCartItems = document.getElementsByClassName('remove-btn')
    /*We are trying to remove cart-item or a row whenever remove button is clicked*/
    //iterate over all the btns which have class of remove-btn
    for(var i = 0; i < removeCartItems.length; i++){
        //declare removeCartItems' ith element as  var button
        var button = removeCartItems[i];
        //add an eventListener to the button
        button.addEventListener('click', remover);
    }
    //let's update the value of total in real time
    var cartInputBtn = document.getElementsByClassName('cart-input');
    for(var i = 0; i < cartInputBtn.length; i++){
        var input = cartInputBtn[i];
        input.addEventListener('change', quantityChanged);
    }
    //add functionality to add to cart button
    var addToCartButton = document.getElementsByClassName('store-item-btn');
    for(var i = 0; i < addToCartButton.length; i++){
        var atcButton = addToCartButton[i];
        atcButton.addEventListener('click', addToCart);
       
    }
    //add functionality to purchase button
    document.getElementsByClassName('purch-btn')[0].addEventListener('click', purchClicked);

}
//if we were to track any event, we will pass event as a parameter to the function but we are not.
function purchClicked(){
    alert('Thank you for the purchase.')
    //what we wanna do is, empty the cart after purch-btn is clicked
    var cartItemz = document.getElementsByClassName('cart-items')[0];
    while(cartItemz.hasChildNodes()){ //while the cartItemz has children, keeo removing the first child to make the cart-row empty
        cartItemz.removeChild(cartItemz.firstChild);
    }
    updateCartTotal();
}


function remover(event){  //whenever an event happens on button, we listen to it. event is always returned within the function
    var buttonClicked = event.target; //Now we target whatever event happens to the button
    buttonClicked.parentElement.parentElement.remove(); //double parentElement to reach the root parent of the button
    updateCartTotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCart(event){
    var atcButton = event.target;
    var storeItem = atcButton.parentElement.parentElement;
    var cartItemTitle = storeItem.getElementsByClassName('store-item-title')[0].innerText;
    var cartItemImage = storeItem.getElementsByClassName('store-item-img')[0].src;
    var cartItemPrice = storeItem.getElementsByClassName('store-item-price')[0].innerText;
    console.log(cartItemTitle, cartItemImage,cartItemPrice);
    addItemsToCart(cartItemTitle, cartItemPrice, cartItemImage);
    updateCartTotal(); //total here so that total is updated right after we add item to the cart
}

function addItemsToCart(cartItemTitle, cartItemPrice, cartItemImage){
    var cartRow = document.createElement('div'); //create e new div so it can be added to cart-row
    cartRow.classList.add('cart-row'); //add the actual class cart-row to cartRow
    var cartItems = document.getElementsByClassName('cart-items')[0]; //get the cart-items
    var cartItemsNames = document.getElementsByClassName('cart-item-title');
    //check if the item is alredy in the cart by comparing array of cart-item-title with store-item-title.innertext
    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == cartItemTitle){
            alert('Item is already in the cart');
            return //here we exit out of the function.
        }
    }
    //use a html format so that its easier to to add to the cart
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-img" src="${cartItemImage}" >
            <span class="cart-item-title">${cartItemTitle}</span>
        </div>
        <span class="cart-price cart-column cart-item-price">${cartItemPrice}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-input" type="number" value="1">
            <button class="btn remove-btn" role="button">REMOVE</button>
        </div>
        `
    cartRow.innerHTML= cartRowContents; 
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('remove-btn')[0].addEventListener('click', remover);
    cartRow.getElementsByClassName('cart-input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0] //Get the very first element out of the arrays of items.
    var cartRows = cartItemContainer.getElementsByClassName('cart-row'); //Select all the rows inside cart-items
    //Since we r updating total, lets create a var for total
    var total = 0;
    //loop over all the cart rows
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i];
        //priceElement represents price
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        //get the quantity with quantityElement 
        var quantityElement = cartRow.getElementsByClassName('cart-input')[0];
        //parse the text to float
        var price = parseFloat(priceElement.innerText.replace('$', ''));

        var quantity = quantityElement.value;
        total = total + (price * quantity); // Every time an item is added, the total is looped over and added to the new total.
        
    }
    total = Math.round(total * 100)/100 //rounding of the total to 2 decimal unit
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}





