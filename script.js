const form = document.getElementById("form");  
const username = document.getElementById("username");  
const email = document.getElementById("email");  
const password = document.getElementById("password");  
const cPassword = document.getElementById("confirm password");

function showError(input, msg){
    const formControl = input.parentElement;
    formControl.className = "input error";
    const small = formControl.querySelector("small");
    // console.log(msg);
    small.innerText = msg;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.classList.add("success");
    formControl.className = "input success";
    const small = formControl.querySelector("small");
    small.innerHTML = "Verified";
}

function checkReq(inputArr){
    inputArr.forEach(function (input) {
        if(input.value.trim() === ""){
            console.log(getFieldName(input));
            showError(input, `${getFieldName(input)} is required`)
        }
        else{
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }
    else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }
    else{
        showSuccess(input);
    }
}

function checkMail(input){
    // const regex = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;  
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (regex.test(input.value.trim())) {  
        showSuccess(input);  
    } 
    else {  
        showError(input, "E-mail is not Valid");  
    }
}

function checkPasswordMatch(input1, input2) {  
    if (input1.value !== input2.value) {  
     showError(input2, "Passwords do not match");  
    }  
} 

function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkReq([username, email, password, cPassword]);
    checkLength(username, 3, 15);
    checkLength(password, 8, 25);
    checkMail(email);
    checkPasswordMatch(password, cPassword);
});