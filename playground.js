
console.log('hallo')
    var date = new Date(); 

    var firstDay = new Date(date.getFullYear(), 
                    date.getMonth(), 1); 
                      
    // var lastDay = new Date(date.getFullYear(), 
    //         date.getMonth(), daysInMonth(date.getMonth()+1, 
    //         date.getFullYear())); 
   


console.log(firstDay.toDateString().substring(0,3)+' : ')