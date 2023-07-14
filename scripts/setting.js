'use strict'

if(currentUser){
  const inputPageSize = document.getElementById('input-page-size');
  const inputCategory = document.getElementById('input-category');
  const btnSubmit = document.getElementById('btn-submit');

  //Bat su kien an vao nut submit
  btnSubmit.addEventListener('click', function(){
    //validate du lieu nhap vao
    const isValidate = validate();
    if(isValidate){
      //Cap nhap lai currentUser
      currentUser.pageSize = inputPageSize.value;// Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      saveToStorage('currentUser', currentUser);

      //Cap nhap lai userArr
      const index = userArr.findIndex(
        (userItem) => userItem.username === currentUser.username
      );
      userArr[index] = currentUser;
      saveToStorage('userArr', userArr);

      //Reset lai from va thong bao ket qua
      inputPageSize.value = '';
      inputCategory.value = 'General';
      alert('Successful!')
    }
  });

  //Ham validate du lieu
  function validate(){
    //Kiem tra inputPaseSize
    if(Number.isNaN(Number.parseInt(inputPageSize.value))){
      alert('New per page is not valid!')
      return false;
    }
    if(inputCategory.value ===''){
      alert('Pless in put category!');
      return false;
    }

    return true;
  }
}else{
  alert('Pless login!');
  window.location.href = '../index.html';
}
