$(document).ready(function () {

    initialize();

    function initialize(){
        getMovies();
    }

    function postMovie(id, name, description, category, yt_id){
        $.ajax({
          url: 'http://ignacio.apidone.com/movies',
          type: 'POST',
          dataType: 'json',
          data: { "name": name, "category": category, "description": description, "yt_id": yt_id},
          success: function(data, textStatus, xhr) {
            alert("Id:"+data.id);
          }
        });
    }

    function getMovies(category){

        var urlString = 'http://ignacio.apidone.com/movies';

        if(category){
            urlString += '?category=' + category
        }

        $.ajax({
          url: urlString,
          success: function(data, textStatus, xhr) {
            showMovies(data);
          }
        });
    }

    function showMovies(movies){
        var moviesHTML = '<ul class="thumbnails">';

        for (var i=0; i<movies.length ; i++) {
            moviesHTML += '<li class="span4">'+
                '<div class="thumbnail">'+
                  '<img src="http://placehold.it/320x200" alt="ALT NAME">'+
                  '<div class="caption">'+
                    '<h3>Header Name</h3>'+
                    '<p>Description</p>'+
                    '<p align="center"><a href="http://bootsnipp.com/" class="btn btn-primary btn-block">Open</a></p>'+
                  '</div>'+
                '</div>'+
              '</li>';
        }

        moviesHTML += '</ul>';

        $('#movies').append(moviesHTML );
    }
});