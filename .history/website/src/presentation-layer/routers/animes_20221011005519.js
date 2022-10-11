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
