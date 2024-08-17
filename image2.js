
const input = document.querySelector('#search');
const btn = document.querySelector('#search-btn');
const add_more = document.querySelector('#add-more')
const show = document.querySelector('.show');

const view = document.querySelector('.view')

const download_icon = document.querySelector("#download-btn");



console.log(show)

const apikey = 'czrMkJHEGdx6iAA6nGnjuq5UZMhJthFgvdTIB2VTr4EeMgNMNV37Yflj';

const per_page = 20;
let page = 2;

const getImages = async (apiurl) => {

  add_more.innerText = 'loading...';
  const reuqest = await fetch(apiurl, {
    headers: { Authorization : apikey}
  })
  const respond = await reuqest.json();
  add_more.innerText = 'add-more';


  // console.log(respond.photos);
   
  const data = respond.photos;

  AddtoDom(data)

 
}
btn.addEventListener('click', () => {
  page =  2;
  const term = input.value;
  show.innerHTML = '';
  getImages(`https://api.pexels.com/v1/search?query=${term}&page=${page}&per_page=${per_page}`);

})

const download = (imageUrl) => {

  fetch(imageUrl).then (res => res.blob()).then(file => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = new Date().getTime();
    a.click();
  }).catch(err => console.log('there is error'))
}

// view image 
const showImg = (img,name) => {
  view.style.display = 'block';

  const image = view.querySelector('.wrapper .preview-img img');
  image.src = img;
  const cameraman = view.querySelector('.wrapper span');
  cameraman.innerText = name;

  
  
  download_icon.setAttribute('data-img', img);
  console.log(download_icon)



}

const hideimg =() => {
  view.style.display = 'none';

}

download_icon.addEventListener('click' , (e) => {
  download(e.target.dataset.img)
  
})


const AddtoDom = (image) => {
  image.forEach(img => {
  //  console.log(img.src.large2x)
   show.innerHTML += `
   
      <li onclick = "showImg('${img.src.large2x}', '${img.photographer}');">
        <img src="${img.src.large2x}" alt="" >
           <div class="author">
          <div class="photo-grapher">
            <i class="fa-solid fa-camera"></i>
            <span>${img.photographer}</span>
          </div>
          <i class="fa-solid fa-download" onclick= "download('${img.src.large2x}')"></i>
        </div>
      </li>
      `

    
  });
}

add_more.addEventListener('click', () => {
 
  page++;

  let term = input.value
  let url =  (` https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`)
  url = term  ? `https://api.pexels.com/v1/search?query=${term}&page=${page}&per_page=${per_page}` :url;

 getImages(url);

})

getImages(` https://api.pexels.com/v1/curated?page=${page}&per_page=${per_page}`);