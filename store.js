/*Since we are loading the js in the background with async. We have to check the state of js whether it is still loading or loaded already.
*/

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', main);
}else{
    main();
}

function main(){
    //declare a let for all the remove buttons
    let removeCartItems = document.getElementsByClassName('remove-btn')
    /*We are trying to remove cart-item or a row whenever remove button is clicked*/
    //iterate over all the btns which have class of remove-btn
    for(let i = 0; i < removeCartItems.length; i++){
        //declare removeCartItems' ith element as  let button
        let button = removeCartItems[i];
        //add an eventListener to the button
        button.addEventListener('click', remover);
    }
    //let's update the value of total in real time
    let cartInputBtn = document.getElementsByClassName('cart-input');
    for(let i = 0; i < cartInputBtn.length; i++){
        let input = cartInputBtn[i];
        input.addEventListener('change', quantityChanged);
    }

    let addToCartButton = document.getElementsByClassName('store-item-btn');
    for(let i = 0; i < addToCartButton.length; i++){
        let atcButton = addToCartButton[i];
        atcButton.addEventListener('click', addToCart);
}
}

function remover(event){  //whenever an event happens on button, we listen to it. event is always returned within the function
    let buttonClicked = event.target; //Now we target whatever event happens to the button
    buttonClicked.parentElement.parentElement.remove(); //double parentElement to reach the root parent of the button
    updateCartTotal();
}

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal();
}

function addToCart(event){
    let atcButton = event.target;
    let storeItem = atcButton.parentElement.parentElement;
    let cartItemTitle = storeItem.getElementsByClassName('store-item-title')[0].innerText;
    let cartItemImage = storeItem.getElementsByClassName('store-item-img')[0].src;
    let cartItemPrice = storeItem.getElementsByClassName('store-item-price')[0].innerText;

    console.log(cartItemTitle, cartItemImage,cartItemPrice);
}

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0] //Get the very first element out of the arrays of items.
    let cartRows = cartItemContainer.getElementsByClassName('cart-row'); //Select all the rows inside cart-items
    //Since we r updating total, lets create a let for total
    let total = 0;
    //loop over all the cart rows
    for(let i = 0; i < cartRows.length; i++){
        let cartRow = cartRows[i];
        //priceElement represents price
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        //get the quantity with quantityElement 
        let quantityElement = cartRow.getElementsByClassName('cart-input')[0];
        //parse the text to float
        let price = parseFloat(priceElement.innerText.replace('$', ''));

        let quantity = quantityElement.value;
        total = total + (price * quantity); // Every time an item is added, the total is looped over and added to the new total.
        
    }
    total = Math.round(total * 100)/100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}





