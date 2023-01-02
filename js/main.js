$(document).ready(function(){
    $('#artists-sect').empty();
    let artistCard = "";
    $.getJSON({
        url : './js/artistas.json',
        success : function(data) {
            data.forEach(function(value){
                artistCard += '<div class="artist" id="artist">'
                artistCard += '<div class="image">'
                artistCard += '<img id="thumbnail" src="'+value.img+'">'
                artistCard += '<button class="play">'
                artistCard += '<i class="fa-solid fa-play"></i>'
                artistCard += '</button>'
                artistCard += '</div>'
                artistCard += '<span id="'+value.id+'" style="display:none;"></span>'
                artistCard += '<h3 id="name">'+value.name+'</h3>'
                artistCard += '<p id="desc">'+value.desc+'</p>'
                artistCard += '</div>'
            });
        },
        error : function(xhr, status) {
            alert('Ha habido algún problema al hacer la petición');
        },
    }).done(function(){
        $('#artists-sect').append(artistCard);
        addEvent2();
    });
})

function addEvent2(){
    $('.artist#artist').on("click",function(e){
        idArtist = $(this).children("span")[0].id;
        $('#albums-sect').empty();
        
        let albumCard = "";
        $.getJSON({
            url : "./js/artistas.json",
            success : function(data) {
                let albums = data[idArtist].albums;
                albums.forEach(function(value){
                    albumCard += '<div class="album" id="album">'
                    albumCard += '<div class="image">'
                    albumCard += '<img id="thumbnail" src="'+value.img+'">'
                    albumCard += '<button class="play">'
                    albumCard += '<i class="fa-solid fa-play"></i>'
                    albumCard += '</button>'
                    albumCard += '</div>'
                    albumCard += '<span id="'+value.id+'" style="display:none;"></span>'
                    albumCard += '<h3 id="name">'+value.name+'</h3>'
                    albumCard += '<p id="year">'+value.year+'</p>'
                    albumCard += '</div>'
                });
            },
            error : function(xhr, status) {
                alert('Ha habido algún problema al hacer la petición');
            }
        }).done(function(){
            $('#albums-sect').append(albumCard);
            window.scrollTo(0,800)
            addEvent3()
        });
    });
};

let idAlbum;

function addEvent3(){
    $('.album#album').on("click",function(e){
        let element = $(this);
        idAlbum = element.children("span")[0].id;
        $.getJSON({
            url : "./js/artistas.json",
            success : function(data) {
                let songs = data[idArtist].albums[idAlbum].songs;
                let contentAfter = "";
                contentAfter += '<div class="sections">';
                contentAfter += '<div id="albumHeader"><img src="'+data[idArtist].albums[idAlbum].img+'">';
                contentAfter += '<div><span id="type">Álbum</span>';
                contentAfter += '<h2 id="name">'+data[idArtist].albums[idAlbum].name+'</h2>';
                contentAfter += '<span class="year">Año: '+data[idArtist].albums[idAlbum].year+'</span>';
                contentAfter += '<span class="nsongs">'+data[idArtist].albums[idAlbum].songs.length+' canciones</span>';
                contentAfter += '</div></div>';
                contentAfter += '<div id="songs">';

                $('.content').css("padding", "0px");

                contentAfter += '<div class="songsContent"><ul class="songs-list">';
                
                songs.forEach(function(value){
                    contentAfter += '<a href="'+value.link+'" target="_blank">';
                    contentAfter += '<li>';
                    contentAfter += '<h4>'+value.name+'</h4>';
                    contentAfter += '<div><span>'+value.duration+'</span>';
                    contentAfter += '<i id="like" class="fa-regular fa-heart"></i></div>'; // fa-solid fa-heart
                    contentAfter += '</li></a>';
                });
                contentAfter += '</ul></div></div></div>';
                let contentBefore = $('.sections').detach();
                $('.content').append(contentAfter);
            },
            error : function(xhr, status) {
                alert('Ha habido algún problema al hacer la petición');
            }
        }).done(       
            window.scrollTo(0,0)
        );
    });
}