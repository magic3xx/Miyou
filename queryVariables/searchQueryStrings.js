let PopularAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort : POPULARITY_DESC, type: ANIME) {
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let TrendingAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :TRENDING_DESC, type : ANIME){
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let top100AnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media (sort :SCORE_DESC, type : ANIME){
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
        	large
        	extraLarge
				}
				description
				episodes
				
			}
		}
	}
`;

let favouritesAnimeQuery = `
	query($perPage: Int, $page: Int) {
		Page(page: $page, perPage: $perPage) {
			pageInfo {
				total
				perPage
				currentPage
				lastPage
				hasNextPage
			}
			media(sort: FAVOURITES_DESC, type: ANIME) {
				title {
					romaji
					english
					userPreferred
				}
				bannerImage
				coverImage {
					medium
					large
					extraLarge
				}
				description
				episodes
			}
		}
	}
`;

let searchAnimeQuery = `
	query($search: String) {
		Media (search : $search, type: ANIME, sort:POPULARITY_DESC) {
			title {
				romaji
				english
				userPreferred
			}
			season
			seasonYear
			type
			bannerImage
			coverImage{
				extraLarge
				large
			}
			description
			episodes
			status
			genres
		}
	}
`;

exports.PopularAnimeQuery = PopularAnimeQuery;
exports.TrendingAnimeQuery = TrendingAnimeQuery;
exports.top100AnimeQuery = top100AnimeQuery;
exports.favouritesAnimeQuery = favouritesAnimeQuery;
exports.searchAnimeQuery = searchAnimeQuery;
