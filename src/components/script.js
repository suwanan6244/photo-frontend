const form=document.getElementById('form');
const username=document.getElementById('username');
const fname=document.getElementById('firstname');
const lname=document.getElementById('lastname');
const email=document.getElementById('email');
const password=document.getElementById('password');

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkInput([username,fname,lname,email,password]);
    if(!validateEmail(email.value.trim())){
        showerror(email,'อีเมลไม่ถูกต้อง');
    }else{
       showsuccess(email);
    }
    checkInputLength(username,5,10);
    checkInputLength(password,5,12);
});

function showerror(input,message){
    const formControl=input.parentElement;
    formControl.className='form-control error';
    const small=formControl.querySelector('small');
    small.innerText=message;
}

function showsuccess(input){
    const formControl=input.parentElement;
    formControl.className='form-control success';
}

function validateEmail(email) {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function checkInput(inputArray){
    inputArray.forEach(function(input){
        if(input.value.trim() === ''){
            showerror(input,`กรุณาป้อน ${getInputCase(input)}`);
        }else{
            showsuccess(input);
        }
    });
}

function getInputCase(input){
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}


function checkInputLength(input,min,max){
        if(input.value.length<=min){
            showerror(input,`${getInputCase(input)} ต้องมากกว่า ${min} ตัวอักษร`)
        }else if(input.value.length>max){
            showerror(input,`${getInputCase(input)} ต้องไม่เกิน ${max} ตัวอักษร`)
        }else{
            showsuccess(input);
        }
}