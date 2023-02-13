var email = document.getElementById('email');
var password = document.getElementById('password');
//var loginBtn = document.getElementById('loginBtn');

var username = document.getElementById('name');
var regEmail = document.getElementById('regEmail');
var regPassword = document.getElementById('regPassword');
var regBtn = document.getElementById('regBtn');

var errorMsg = document.getElementById('errorMsg');
var invalidMsg = document.getElementById('invalidMsg');
var nameExist = document.getElementById('nameExist');
var emailExist = document.getElementById('emailExist');

var successMsg = document.getElementById('successMsg');

var loginName = '';
var userName;

if(localStorage.getItem('Users') == null){
    var users = [];
}
else{
    users = JSON.parse(localStorage.getItem('Users'));
}


/////////////////////For login page///////////////////////
function login(){
    if(email.value.trim() == '' || password.value.trim() == ''){
        errorMsg.style.display = 'block';
        invalidMsg.style.display = 'none';
        return;
    }

    if(loginValidation()){
        localStorage.setItem('Session', loginName)
        userName = localStorage.getItem('Session');
        if(userName.trim() != ''){
            var loginBtn = document.querySelector('a[href="#"]')
            loginBtn.href = "home.html";           
        }

    }else{
        invalidMsg.style.display = 'block';
        errorMsg.style.display = 'none';
        return;
    }
}
///////////////////////////////////////////////

/////////////////For home page/////////////////
userName = localStorage.getItem('Session');
if(userName){
    document.getElementById('user').innerHTML = 'Welcome ' + userName;
}
////////////////////////////////////////

//////////////////Validate login data////////////////////////////////
function loginValidation(){
    if(users.length > 0){
        for(var i = 0; i < users.length; i++){
            if(email.value == users[i].email && password.value == users[i].password){
                loginName = users[i].userName;
                return true;
            }
        }
        return false;
    }
    return false;
}
///////////////////////////////////////////////////////////////////////

/////////////////////////For signup page////////////////////////////
function signUp(){
    var user = {
        userName : username.value.trim(),
        email : regEmail.value.trim(),
        password : regPassword.value.trim()
    }

    if(user.userName == '' || user.email == '' || user.password == ''){
        errorMsg.style.display = 'block';
        nameExist.style.display = 'none';
        emailExist.style.display = 'none';
        successMsg.style.display = 'none';
        return;
    }

    if(checkNameExistence(user.userName)){
        nameExist.style.display = 'block';
        if(!checkEmailExistence(user.email)){
            emailExist.style.display = 'none';
        }
        else if(checkEmailExistence(user.email))
        {
            emailExist.style.display = 'block';
        }
        return;
    }

    if(checkEmailExistence(user.email)){
        emailExist.style.display = 'block';
        if(!checkNameExistence(user.userName)){
            nameExist.style.display = 'none';
        }
        else if(checkNameExistence(user.userName))
        {
            nameExist.style.display = 'block';
        }
        return;
    }

    users.push(user);
    localStorage.setItem('Users', JSON.stringify(users));
    errorMsg.style.display = 'none';
    nameExist.style.display = 'none';
    emailExist.style.display = 'none';
    successMsg.style.display = 'block';
    reset();
}
/////////////////////////////////////////////////////////

//////////////////////////reset data//////////////////////////
function reset(){
    userName.value = '';
    regEmail.value = '';
    regPassword.value = '';
    nameExist.style.display = 'none';
    emailExist.style.display = 'none';
    errorMsg.style.display = 'none';
}
///////////////////////////////////////////////////////////////////

/////////////////////chech name & email existence in signup page/////////////////
function checkNameExistence(name){
    for(var i = 0; i < users.length; i++){
        if(users[i].userName == name){
            return true;
        }
    }
    return false;
}

function checkEmailExistence(email){
    for(var i = 0; i < users.length; i++){
        if(users[i].email == email){
            return true;
        }
    }
    return false;
}
///////////////////////////////////////////////////////////////////////

/////////////////////for logout in home page////////////////////////////
function logout(){
    localStorage.removeItem('Session');
}
/////////////////////////////////////////////////////////////////
