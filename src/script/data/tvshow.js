$(document).ready(function () {
    $.ajax({
        type: 'get',
        url: 'https://api.themoviedb.org/3/discover/tv',
        datatype: 'json',
        data: {
            'api_key': 'ae0bdd8f96c5b4e84b43e17aa8a01dca',
            'sort_by': 'popularity.desc',
            'page': 1
        },
        success: function (result) {
            let tvshow = result.results;
            $.each(tvshow, function (i, data) {
                $('#movie-list').append(`
                    <div class="col-md-2 mb-4 ">
                        <div class="card bg-warning">
                            <a href="#" class="card-link" data-toggle="modal" data-target=".bd-example-modal-lg">
                                <img class="card-img-top" src="https://image.tmdb.org/t/p/w185` + data.poster_path + `" alt="` + data.name + `">
                            </a>
                        </div>
                    </div>
                `)
            });
        }
    });
});

$('#search-button').on('click', function () {
    $.ajax({
        type: 'get',
        url: 'https://api.themoviedb.org/3/search/tv',
        datatype: 'json',
        data: {
            'api_key': 'ae0bdd8f96c5b4e84b43e17aa8a01dca',
            'query': $('#search-input').val()
        },
        success: function (result) {
            if (result.total_results === 0) {
                $('#movie-list').html(`
                <div class="col">
                <h1 class="text-center">Movie not Found</h1>
                </div>`);
            } else {
                let tvshow = result.results;
                $.each(tvshow, function (i, data) {
                    if (data.poster_path != null) {
                        $('#movie-list').append(`
                            <div class="col-md-2 mb-4 ">
                                <div class="card bg-warning">
                                    <a href="#" class="card-link" data-toggle="modal" data-target=".bd-example-modal-lg">
                                        <img class="card-img-top" src="https://image.tmdb.org/t/p/w185` + data.poster_path + `" alt="` + data.name + `">
                                    </a>
                                </div>
                            </div>   
                        `)
                    } else {
                        $.each(tvshow, function (i, data) {
                            $('#movie-list').append(`
                                <div class="col-md-2 mb-4 ">
                                    <div class="card bg-warning">
                                        <a href="#" class="card-link" data-toggle="modal" data-target=".bd-example-modal-lg">
                                            <img class="card-img-top" src="../src/img/no-poster.jpg" alt="` + data.name + `">
                                        </a>
                                    </div>
                                </div>
                            `)
                        })
                    }
                });
            }
        }
    });
});