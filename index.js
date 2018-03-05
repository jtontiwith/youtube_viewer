/* 

-the app should display an input field 
-the app should accept a search term
-the app should get the json that corresponds to the users search 
term
-the app should display the thumbnail image of the returned videos
-after this, take a look at the advanced features

API Key: AIzaSyD1gJ0bgj_dDm8if8n94zzd4tRWmKETqcg


*/


const GOOGLE_YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


function getDataFromApi(searchTerm, callBack) {
  console.log('got the data from the API');
  
  const query = {
    part: 'snippet',
    key: 'AIzaSyD1gJ0bgj_dDm8if8n94zzd4tRWmKETqcg',
    q: searchTerm,
    type: 'video'
  }

  $.getJSON(GOOGLE_YOUTUBE_SEARCH_URL, query, callBack); 


/*
 $.getJSON(GOOGLE_YOUTUBE_SEARCH_URL, query, function() {
  console.log( "success" );
  console.log(query);

  
  }); 


let theJSON = JSON.stringify(hey, null, 2);
  

$('.js-search-results').html(theJSON);

console.log(theJSON);

*/


}

function resultIntoHtml(result) {
  console.log('resultIntoHtml running');
  /*return `<img src="${result.snippet.thumbnails.medium.url}" alt="image from youtube thumbnail">`;*/ 
  return `<a class="yt_thumbnails" href="https://www.youtube.com/watch?v=${result.id.videoId}"><img src="${result.snippet.thumbnails.medium.url}" alt="${result.snippet.title}"></a>`



}

function displayData(data) {
  console.log('displayData running');
  console.log(data.items);
  const results = data.items.map((item, index) =>
  resultIntoHtml(item));
  console.log("these are... " + results);
  $('main').prop('hidden', false);
  $('.js-search-results').html(`<p>You just got back ${results.length} results.</p>` + results);
  //$('.js-search-results').html(`You just got back ${results.length} results.`);
  console.log('displayData ran through');


}



function listenForSubmit() {
  console.log('listenForSubmit running');
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const userSearch = $(event.currentTarget).find('.js-query');
    const userSearchCleaned = userSearch.val();
    console.log(userSearchCleaned);
    userSearch.val("");
    getDataFromApi(userSearchCleaned, displayData);
  });
}





$(listenForSubmit);



