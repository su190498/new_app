'use strict'

//class user
class User {
  constructor(
    firstname,
    lastname,
    username,
    password,
    //khai bao gia 2 gia tri mac dinh cho yeu cau so 9
    pageSize = 5,
    category = 'Sports'

  ){
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.password = password;
    this.pageSize = pageSize;
    this.category = category;
  }
}

//Tao clss Task
class Task{
  constructor(task,owner,isDone){
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}