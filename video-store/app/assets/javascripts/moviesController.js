$(document).ready(function () {

  var elementName = 'tests4';
    initialize();

    $('#about').removeClass('active');
    $('#home').addClass('active');
    $('#deleteAll').click(clearMovies);

    $( '#addMovieForm' ).on( 'submit', function( event ) {
      
      var name = $('#inputName').val();
      var description = $('#inputDescription').val();
      var category = $('#inputCategory').val();
      var yt_id = $('#inputYoutubeId').val();
      var id = $('#inputId').val();
      
      $('#addVideoModal').modal('hide');
      cleanModalForm();

      postMovie(name, description, category, yt_id, id );
    });

    $('.categorySelector').click(function(){

      if($(this).html() != 'All'){
        getMovies(showMovies, $(this).html());
      } else{
        getMovies(showMovies);
      } 
    });

    $('#playVideoModal .stopPlaying').click(function(){
      stopMovie();
    });

    function initialize(){
        getMovies(showMovies);
    }

    function cleanModalForm(){
      $('#inputId').val('');
      $('#inputName').val('');
      $('#inputDescription').val('');
      $('#inputYoutubeId').val('');
    }

    function clearMovies(){
        getMovies(deleteAll);
    }

    function deleteAll(movies){
        for (var i=0; i<movies.length ; i++) {
            deleteMovie(movies[i].id);
        }
    }

    function deleteMovie(id){
      $.ajax({
        url: 'http://ignacio.apidone.com/' + elementName + '/' + id,
        type: 'DELETE',
        dataType: 'json',
        data: { },
        success: function(data, textStatus, xhr) {
          getMovies(showMovies);
        }
      });
    }

    function postMovie( name, description, category, yt_id, id){

      var parameters = { "name": name, "category": category, "description": description, "yt_id": yt_id};
      var type = 'POST';
      var url = 'http://ignacio.apidone.com/' + elementName + ''

      if(id){
        parameters.id = id;
        type = 'PUT';
        url += '/' + id;
      }

      $.ajax({
        url: url,
        type: type,
        dataType: 'json',
        data: parameters,
        success: function(data, textStatus, xhr) {
          //alert("Id:"+data.id);
          getMovies(showMovies );
        }
      });
    }

    function getMovie(id, callback){
      $.ajax({
          url: 'http://ignacio.apidone.com/' + elementName + '/' + id,
          success: function(data, textStatus, xhr) {
            callback(data);
          }
        });
    }

    function getMovies(callback, category){

        var urlString = 'http://ignacio.apidone.com/' + elementName + '';

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

    function editMovie(id){
      $('#addVideoModal').modal('show');
      getMovie(id, fillmodalForm);
    }

    function fillmodalForm(movie){
      $('#inputId').val(movie.id);
      $('#inputName').val(movie.name);
      $('#inputDescription').val(movie.description);
      $('#inputYoutubeId').val(movie.yt_id);
    }

    function playMovie(yt_id){
      $('#playVideoModal').modal('show');

      var videoWidth = $('#playVideoModal').width() - 30;
      var html = '<iframe width="' + videoWidth + '" height="315" src="http://www.youtube.com/embed/' + yt_id + '"' +
                    'frameborder="0" allowfullscreen></iframe>';
      $('#playVideoModal .modal-body').html(html);
    }

    function stopMovie(){
      $('#playVideoModal .modal-body').html('');
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
                        '<a href="#" movie_yt_id="' + movies[i].yt_id + '" class="btn playMovie">Play</a> \n'+
                        '<a href="#" movie_id="' + movies[i].id + '" class="btn editMovie">Edit</a> \n'+
                        '<a href="#" movie_id="' + movies[i].id + '" class="btn btn-danger deleteMovie">Delete</a>'+
                    '</div>' +
                  '</div>'+
                '</div>'+
              '</li>';
        }

        moviesHTML += '</ul>';

        $('#movies').html(moviesHTML);

        $('.deleteMovie').click(function(){
          deleteMovie($(this).attr('movie_id'));
        });

        $('.editMovie').click(function(){
          editMovie($(this).attr('movie_id'));
        });

        $('.playMovie').click(function(){
          playMovie($(this).attr('movie_yt_id'));
        });
    }
});