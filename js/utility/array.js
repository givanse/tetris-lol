
function hasDuplicates(arr) {                                         
    for(var i = 0; i < arr.length; i++) {                                        

        var currentVal = arr[i];                                                          

        for(var j = 0; j < arr.length; j++) {                                    

            if(i == j) continue; /* Same object, ignore it. */                                                        
                                                                                 
            var val = arr[j];                                                      

            if(currentVal == val)                                                           
                return true;                                                     
        }                                                                        
    }                                                                            
    return false;                                                                
}       

