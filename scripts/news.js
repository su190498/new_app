'use strict'

//Dieu kien nguoi dung phai dang nhap truoc khi co the doc ti tuc
if(currentUser){
  const newsContainer = document.getElementById('news-container');
  const btnPrev = document.getElementById('btn-prev');
  const pageNum = document.getElementById('page-num');
  const btnNext = document.getElementById('btn-next');

  //Bien nay de tinh so news toi da tra ve tu API
  let totalResults = 0;
  getDataNews('us',1);

  //Lay du lieu tu API va hien thi ra ung dung
  async function getDataNews(country, page){
    try{
      const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pageSize}&page=${page}&apiKey=fe9e00b837a64d2da259c8357de7e13b`);
      const data = await res.json();
      // console.log(data);

      //Loi nay cho ngươi dùng biet phai chay ung dung tren localhost
      if(data.status === 'error' && data.code === 'corsNotAllowed'){
        throw new Error(data.message);
      }

      //Goi ham hien thi last news
      displayNewList(data);
    }catch(err){
      //Thong bao loi
      alert('Error' + err.message);
    }
  }

  //Ham hien thi List News
  function displayNewList(data){
    //Lay gia tri cua bien totalResults
    totalResults = data.totalResults;

    //Kiem tra xe co an cac nut Next, Previous hay chua va an no di
    checkBtnPrev();
    checkBtnNext();

    let html = '';
    //Tao code HTML hien thi
    data.articles.forEach( function(article){
      html += `
      <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src=${article.urlToImage ? article.urlToImage : 'no_image_available.jpg'} alt = 'img'
              class="card-img"/>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url}" 
              target = "_blank"
              class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
      </div>
      `;
    });

    newsContainer.innerHTML = html;
  }

  function checkBtnPrev(){
     //Ẩn nút Prev ở trang 1
    if(pageNum.textContent == 1){
      btnPrev.style.display = 'none';
    }else{
      btnPrev.style.display = 'block';
    }
  }

  function checkBtnNext(){
    //Nếu là trang cuối thì ẩn nut Next
    if(pageNum.textContent == Math.ceil(totalResults/currentUser.pageSize)){
      btnNext.style.display = 'none';
    }else{
      btnNext.style.display = 'block';
    }
  }

  //Sự kiện nút Previous
  btnPrev.addEventListener('click', function(){
    getDataNews('us', --pageNum.textContent);
  })

  //Sự kiện nút Next
  btnNext.addEventListener('click', function(){
    getDataNews('us', ++pageNum.textContent);
  })

}else{
  alert('Pless login!');
  window.location.href='../index.html';
}

