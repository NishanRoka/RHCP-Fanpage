if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', main);
}else{
    main();
}

function main(){
    
    const ticketBtns = document.querySelectorAll('.primary-button') //Id has to be unique. wow
    for(let i = 0; i < ticketBtns.length; i++){
        const ticketBtn = ticketBtns[i]
        ticketBtn.addEventListener("click", ()=>{
            alert('ticket processing coming soon')
        })
    }
  
}

