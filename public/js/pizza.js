document.getElementById("pizza-form").onsubmit = validate;
function validate(){
    clearErrors();
    let isValid=true;
    let fname = document.getElementById("fname").value.trim();
    let lname = document.getElementById("lname").value.trim();
    let email = document.getElementById("email").value.trim();
    let pickup= document.getElementById("pickup");
    let delivery= document.getElementById("delivery");
    let size = document.getElementById("size");
    if(!fname){
        isValid=false
        document.getElementById("err-fname").style.display= "block"
    }
    if(!lname){
        isValid = false
        document.getElementById("err-lname").style.display = "block"
    }
    if (!email) {
        isValid = false
        document.getElementById("err-email").style.display = "block"
    }
    if(size ==="none" || !size){
        isValid = false
        document.getElementById("err-size").style.display = "block"  
    }
    if(!pickup.checked && !delivery.checked){
        document.getElementById("err-method").style.display="block"
        isValid==false;
    }

    return isValid



}



function clearErrors(){
    let error= document.getElementsByClassName("err");
    for(let i=0; i<clearErrors.length;i++){
        error[i].style.display=="none"
    }
}