//For this project I am going for all the meets expectations.



const $searchContainerDiv = $("div.search-container");
const $gallery = $("div#gallery");
const $form = $("<form action='#' method='get'>");
const $search = $('<input type="search" id="search-input" class="search-input" placeholder="Search...">');
const $button = $('<input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">');
$form.append($search);
$form.append($button);
const $body = $("body");



$(document).ready(function() {
  $.getJSON("https://randomuser.me/api/?results=12&nat=us", function(data){
    $.each(data.results, (index, person) => {
      let image = person.picture.large;
      let name = person.name;
      let email = person.email;
      let location = person.location;
      let $imageDIV = $("<div class='card-img'>");
      $imageDIV.append(`<img class='card-img' src=${image} alt='profile picture'>`);
      let $container = $("<div class='card-info-container'>");
      $container.append(`<h3 id='name' class='card-name cap'>${name.first} ${name.last}</h3>`);
      $container.append(`<p class='card-text'>${email}</p><p class='card-text cap'>${location.city}, ${location.state}</p>`);
      let $div = $("<div>").addClass("card").append($imageDIV);
      $div.append($container);
      $gallery.append($div);
      $div.on("click", ()=> updateView(person));
    });
  });

  function updateView(person) {
    console.log(person);
    let $outerDiv = $("<div class='modal-container'>");
    let $modal = $("<div class='modal'>");
    let $button = $("<button type='button' id='modal-close-btn' class='modal-close-btn'><strong>X</strong></button>");
    let $infoContainer = $("<div class='modal-info-container'>");
    $infoContainer.append($(`<img class='modal-img' src=${person.picture.large} alr='profile picture'>`));
    $infoContainer.append($(`<h3 id='name' class='modal-name cap'>${person.name.first} ${person.name.last}</h3>`));
    $infoContainer.append($(`<p class='modal-text'>${person.email}</p>`));
    $infoContainer.append($(`<p class='modal-text cap'>${person.location.city}</p>`));
    $infoContainer.append($(`<hr>`));
    $infoContainer.append($(`<p class='modal-text'>${person.cell}</p>`));
    console.log(person.location.street);
    $infoContainer.append($(`<p class='modal-text'>${person.location.street}, ${person.location.city}, ${person.location.state} ${person.location.postcode}</p>`));
    let dob = person.dob.date.substring(0, 10).split("-");
    let formatDOB = dob[1]+"/"+dob[2]+"/"+dob[0].substring(2);
    $infoContainer.append($(`<p class='modal-text'>Birthday: `+ formatDOB + "</p>")) ;
    console.log($infoContainer);
    $modal.append($button);
    $modal.append($infoContainer);
    $outerDiv.append($modal);
    $body.append($outerDiv);
    $button.on("click", ()=> $outerDiv.remove());
  }

});
