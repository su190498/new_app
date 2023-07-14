'use strict'

const inputFirstname = document.getElementById('input-firstname');
const inputLastname = document.getElementById('input-lastname');
const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const inputPasseordConfirm = document.getElementById('input-password-confirm');
const btnSubmit = document.getElementById('btn-submit');

btnSubmit.addEventListener('click', function(){
  const user = new User(
    inputFirstname.value,
    inputLastname.value,
    inputUsername.value,
    inputPassword.value
  );

  const isValidate = validate(user);

  if(isValidate){
    userArr.push(user);
    saveToStorage('userArr', userArr);

    alert('Sign up success!');

    window.location.href = '../pages/login.html';
  }
})

function validate(user){
  //Kiem tra co o nao bi bo trong khong
  if(user.firstname.trim().length === 0){
    alert('Pless input first name!');
    return false;
  }
  if(user.lastname.trim().length === 0){
    alert('Pless input last name!');
    return false;
  }
  if(user.username.trim().length === 0){
    alert('Pless input user name!');
    return false;
  }
  if(user.password === ''){
    alert('Pless input password!');
    return false;
  }
  if(inputPasseordConfirm.value === ''){
    alert('Pless input password confirm!');
    return false;
  }

  //Username moi khong duoc trung voi username da co

  for(let i=0; i<userArr.length; i++){
    if(userArr[i].username === user.username){
      alert('User has existed!');
      return false;
    }
  }

  //Dieu kien password va passwordConfirm phai giong nhau
  if(user.password !== inputPasseordConfirm.value){
    alert('Password and password confirmation must be the same!')
    return false
  }
  
  //Password phai >8
  if(user.password.length <= 8){
    alert('Password must be greater than 8 characters!')
    return false;
  }

  return true;
}
