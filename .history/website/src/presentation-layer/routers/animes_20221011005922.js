
let slideIndex = 0;



function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


function fetchData(){
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8a0a32071dmshc3f86074e4ab522p137892jsn57fc53999b6f',
		'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
	}
};
        
	fetch('https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking&sortOrder=asc', options)
		.then(response => response.json())
		.then(data => {
			const animeData = data.data
			.map(anime => {
			return `
				${anime.title}
				${anime.ranking}
				${anime.episodes}
				${anime.status}
				
			`
		}).join(' ')
		
			console.log(animeData)
			document.querySelector('#animes').insertAdjacentText('afterbegin', animeData)

		})
		.catch(err => console.error(err));
    }


    showSlides();
    fetchData();f