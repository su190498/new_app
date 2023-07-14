'use strict'

//Kiem tra dang nhap
if(currentUser){
  const todoList = document.getElementById('todo-list');
  const btnAdd = document.getElementById('btn-add');
  const inputTask = document.getElementById('input-task');

  //hien thi len cac task co trong localStorage
  displayTodoList()

  //----------------------------------------------
  //Ham hien thi thong tin todo list
  function displayTodoList(){
    let html='';

    //Loc ra cac task cua user dang dang nhap vao he thong
    todoArr
      .filter((todo) => todo.owner === currentUser.username)
      .forEach(function(todo){
        html +=`
        <li class=${todo.isDone ? 'checked' : ''}>${todo.task}<span class="close">×</span></li>
        `;
      });

    todoList.innerHTML = html;

    //bat cac su kien ToggleTasks va DeleTasks
      toggleTasks();
      deleteTasks();
  }

  //Su kien them task moi
  btnAdd.addEventListener('click', function(){
    //Kiem tra nhap task chua
    if(inputTask.value.trim().length === 0){
      alert('Pless add a task!');
    }else{
      const todo = new Task(inputTask.value, currentUser.username, false);
      todoArr.push(todo);
      saveToStorage('todoArr', todoArr);

      //hien thi task moi
      displayTodoList();

      //reset from
      inputTask.value='';
    }
  });


  //Ham bat su kien danh dau cac tasks da hoan thanh
  function toggleTasks(){
    //lay tat ca cac task
    document.querySelectorAll('#todo-list li').forEach(function(li){
      li.addEventListener('click', function(e){
        //bo nut delete
        if(e.target !== li.children[0]){
          li.classList.toggle('checked');
          //tim task vua click vao (toggle). lay noi dung text chua task, loai bo dau x
          const todo = todoArr.find((todoItem) => todoItem.owner === currentUser.username &&
            todoItem.task === li.textContent.slice(0, -1)
          );
          //thay doi thuoc  tinh isDone cua no
          todo.isDone = li.classList.contains('checked') ? true : false;
          //cap nhap du lieu xuong localStorage
          saveToStorage('todoArr',todoArr);
        }
      });
    });
  }
  
  //Ham bat su kien xoa cac tasks
  function deleteTasks(){
    //Lay tat ca cac phan tu nut delete
    document.querySelectorAll('#todo-list .close').forEach(function(close){
      close.addEventListener('click', function(){
        //Hoi xac nhan xoa
        const isDelete  = confirm('Are you sure?');

        if(isDelete){
          //Tim dem vi tri cua task duoc an trong mang todoArr
          const todoIndex = todoArr.findIndex((todoItem) =>
            todoItem.owner === currentUser.username &&
            todoItem.task === close.parentElement.textContent.slice(0,-1)
          );

          //Xoa task ra khoi todtArr
          todoArr.splice(todoIndex,1);

          //Luu thay doi va hien thi lai danh sach tasks
          saveToStorage('todoArr', todoArr);
          displayTodoList();
        }
      })
    })
  }
}else{
  alert('Pless login!');
  window.location.href='../index.html';
}
