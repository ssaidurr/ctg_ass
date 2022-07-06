let searchBook = () => {
	let searchField = document.getElementById('search-field');
	let searchText = searchField.value;

	/*after search empty input field*/
	searchField.value = '';
	document.getElementById('search_text').innerHTML=" : "+searchText;

	let spinner = document.getElementById('spinner');
	spinner.innerHTML=`
		<div class="spinner-border m-5" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>
	`;

	if (searchText == '') {
		let error = document.getElementById('error');
		error.innerHTML="Please type book name";
		spinner.innerHTML="";
	}else{
		let url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}`;
		fetch(url)
		.then(res => res.json())
		.then(data => displaySearchResult(data.items))
	}
	
}

let displaySearchResult = (items) =>{
	/*console.log(items[0].id);*/

	document.getElementById('single_book_details').textContent = "";

	let searchResult = document.getElementById('search-result');
	searchResult.textContent = '';

	if (items == 'null') {
		let error = document.getElementById('error');
		error.innerHTML="No Data Found"
	}
	items.forEach(item=>{
		//console.log(item.id);
		let image_link = (item.volumeInfo.imageLinks.thumbnail)?item.volumeInfo.imageLinks.thumbnail:' ';
		let authors = (item.volumeInfo.authors)?item.volumeInfo.authors:'';
		let categories = (item.volumeInfo.categories)?item.volumeInfo.categories:'';
		let div = document.createElement('div');
		div.classList.add('col-md-4');
		div.innerHTML=`
			<div onclick="details('${item.id}')" class="card mb-3" style="max-width: 540px;">
			  <div class="row g-0">
			    <div class="col-md-4">
			      <img src="${image_link}" class="img-fluid rounded-start" alt="">
			    </div>
			    <div class="col-md-8">
			      <div class="card-body">
			        <h5 class="card-title">${item.volumeInfo.title}</h5>
			        <p class="card-text">${authors}</p>
			        <p class="card-text">${categories}</p>
			        <p class="card-text"><small class="text-muted">Pulished Year :${item.volumeInfo.publishedDate}</small></p>
			        <a target="_blank" href="${item.volumeInfo.previewLink}" class="btn btn-primary">Preview</a>
			      </div>
			    </div>
			  </div>
			</div>
		`
		searchResult.appendChild(div);
		let spinners = document.getElementById('spinner');
		spinners.textContent=" ";
		let error = document.getElementById('error');
		error.innerHTML=" ";
	})
	
}

let details = id => {
	let spinner = document.getElementById('spinner');
	spinner.innerHTML=`
		<div class="spinner-border m-5" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>
	`;

	let url = `https://www.googleapis.com/books/v1/volumes/${id}`;
	fetch(url)
	.then(res => res.json())
	.then(data => displaySingleItem(data))
}


let displaySingleItem = (data) => {

	let bookDetails = document.getElementById('single_book_details');
	bookDetails.textContent = '';

	let subtitle = (data.volumeInfo.subtitle)?data.volumeInfo.subtitle:' ';
	let authors = (data.volumeInfo.authors)?"Authors: "+data.volumeInfo.authors:' ';
	let categories = (data.volumeInfo.categories)?data.volumeInfo.categories:'';
	let publisher = (data.volumeInfo.publisher)?"Publisher: "+data.volumeInfo.publisher:'';
	let publishedDate = (data.volumeInfo.publishedDate)?"Publisher Date: "+data.volumeInfo.publishedDate:'';
	let description = (data.volumeInfo.description)?data.volumeInfo.description:'';

	let div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML=`
			<img src="${data.volumeInfo.imageLinks.thumbnail}" class="card-img-top" alt="book details" style="height:600px">
          		<div class="card-body">
            	<h5 class="card-title">${data.volumeInfo.title}</h5>
            	<p class="card-text"><small class="text-muted">${subtitle}</small><br>${authors}<br>${categories}</p>
            	<p class="card-text">${description}</p>
            	<p class="card-text">
            		<small class="text-muted">${publisher}</small>
            		<small class="text-muted">${publishedDate}</small>
            	</p>
            	<a target="_blank" href="${data.volumeInfo.previewLink}" class="btn btn-primary">Preview</a>
          </div>
		`
		bookDetails.appendChild(div);
		let spinners = document.getElementById('spinner');
		spinners.textContent=" ";
		let error = document.getElementById('error');
		error.innerHTML=" ";
}