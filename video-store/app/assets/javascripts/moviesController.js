$(document).ready(function () {

    initialize();

    $('#addMovie').click(createMovie);
    $('#deleteAll').click(clearMovies);

    function initialize(){
        getMovies(showMovies);
    }

    function clearMovies(){
        getMovies(deleteAll);
    }

    function createMovie(){
        postMovie('test', 'test', 'test', 'KrVC5dm5fFc');
    }

    function deleteAll(movies){
        for (var i=0; i<movies.length ; i++) {
            $.ajax({
              url: 'http://ignacio.apidone.com/movies/' + movies[i].id,
              type: 'DELETE',
              dataType: 'json',
              data: { },
              success: function(data, textStatus, xhr) {
                console.log('Deleted movie');
              }
            });
        }
    }

    function postMovie( name, description, category, yt_id){
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

    function getMovies(callback, category){

        var urlString = 'http://ignacio.apidone.com/movies';

        if(category){
            urlString += '?category=' + category
        }

        $.ajax({
          url: urlString,
          success: function(data, textStatus, xhr) {
            callback(data);
          }
        });
    }

    function showMovies(movies){
        var moviesHTML = '<ul class="thumbnails">';

        for (var i=0; i<movies.length ; i++) {
            moviesHTML += '<li class="span4">'+
                '<div class="thumbnail">'+
                  '<img src="http://img.youtube.com/vi/' + movies[i].yt_id + '/0.jpg" alt="' + movies[i].name + '">'+
                  '<div class="caption">'+
                    '<h3>' + movies[i].name + '</h3>'+
                    '<p>' + movies[i].description + '</p>'+
                    '<div align="right">' + 
                        '<a href="http://bootsnipp.com/" class="btn">Edit</a> \n'+
                        '<a href="http://bootsnipp.com/" class="btn btn-danger">Delete</a>'+
                    '</div>' +
                  '</div>'+
                '</div>'+
              '</li>';
        }

        moviesHTML += '</ul>';

        $('#movies').append(moviesHTML );
    }
});