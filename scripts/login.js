'use strict'

const inputUsername = document.getElementById('input-username');
const inputPassword = document.getElementById('input-password');
const btnSubmit = document.getElementById('btn-submit');

//Bat su kien ans vao nut submit
btnSubmit.addEventListener('click', function(){
   //Vaidate du lieu
  const isValidate = validate();
  if(isValidate){
      const isUser = userArr.find(
      item => item.username === inputUsername.value && item.password === inputPassword.value
    );
    
    //tim thay
    if(isUser){
      alert('Logged in successfully!');
      saveToStorage('currentUser', isUser);

      window.location.href = '../index.html';
    }
    //khong tim thay
    else{
      alert('unsuccessful login, please check again!');
    }
  }
});

//validate du lieu
function validate(){
  if(inputUsername.value === ''){
    alert('Pless input username!');
    return false;
  }

  if(inputPassword.value === ''){
    alert('Pless input password!');
    return false;
  }

  return true;
}