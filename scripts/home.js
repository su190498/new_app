'use strict'

const loginModal  = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMesage = document.getElementById('welcome-message');
const btnLogout = document.getElementById('btn-logout');

disPlayHome();

function disPlayHome(){
  if(!currentUser){
    loginModal.style.display = 'block';
    mainContent.style.display = 'none';
  }else{
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';

    welcomeMesage.textContent = `Welcome ${currentUser.firstname}`;
  }
}

btnLogout.addEventListener('click', function(){
  const isLogout = confirm('Are you sure?');
  if(isLogout){
    currentUser = null;
    saveToStorage('currentUser', currentUser);
    disPlayHome();
  }
});
