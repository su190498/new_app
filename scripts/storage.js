'use strict'

function saveToStorage(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key){
  return JSON.parse(localStorage.getItem(key));
}


//------------------------------------------
//Ham chuyen tu JS Object sang Class Intence 
function parseUser(userData) {
	const user = new User(userData.firstname, userData.lastname, userData.username, userData.password, userData.pageSize, userData.category);
	return user;
}

function parseTask(taskData) {
	const task = new Task(taskData.task, taskData.owner, taskData.isDone);
	return task;
}

//------------------------------------------
//Lay giu lieu userArr tu localStorage
const users = getFromStorage('userArr') ? getFromStorage('userArr') : [];
//Lay giu lieu todoArr to localStorage
const todos = getFromStorage('todoArr') ? getFromStorage('todoArr') : [];


//Chuyen doi ve dang Class Instence
const userArr = users.map((user) => parseUser(user));
const todoArr = todos.map((todo) => parseTask(todo));

//Bien nay luu thong tin user da dang nhap vao he thong
let currentUser = getFromStorage('currentUser') ? parseUser(getFromStorage('currentUser')) : null;