# Spotify con AJAX (jQuery) 🎵  

En este proyecto he decidido practicar las peticiones a un JSON mediante el AJAX de jQuery. El JSON que he creado son de solo unos pocos artistas, a pesar de haberme llevado más de 800 líneas de código.

El programa es muy simple, cuando carga la página llama al JSON pidiéndo únicamente los artistas (nombre, descripción e imagen).
Una vez cargada esa petición podremos seleccionar uno de los artistas, esto provocará otra petición ajax, la cual filtrará por los álbumes solo y únicamente de ese artista.
Tras haberse completado esa segunda petición podremos elegir el álbum, lo cual llamará al json para devolver las canciones de ese álbum con su nombre, duración y enlace de youtube.
Al hacer click en los álbumes cambiará totalmente el diseño del contenedor, mostrando los datos del álbum arriba y las canciones abajo.


## Scripts del Head:
```html
<script src="https://kit.fontawesome.com/c5a69afab5.js" crossorigin="anonymous"></script>
<link rel="stylesheet" href="./css/styles.css">
<link rel="stylesheet" href="./css/media.css">
<script src="./js/jquery-3.6.2.min.js"></script>
<script src="./js/main.js"></script>
```
El primer script es facilitado desde el apartado 


## HTML & CSS
Para desarrollar esta barra lateral he utilizado la etiqueta \<aside\> y he añadido las listas y logo dentro, todo contenido en \<header\>.

Para mostrar el diseño en 2 secciones necesitamos solo y unicamente 2 secciones hijas en el body. En caso de tener tres, el diseño se romperá por completo ya que el body tiene la propiedad "grid" con un template-columns "1fr 3fr", lo cual significa que si dividimos el ancho total en 4 secciones, una de ellas (la primera) corresponderá con el primer div/section/aside/... y las otras tres secciones corresponderan con el otro div/section/aside/...

En mi caso, el primer elemento es \<header\> y el segundo \<div class="content"\>
```css
body{
    display: grid;
    grid-template-columns: 1fr 3fr;
    overflow-x: hidden;
    ...
}
header{
    min-width: 350px;
}
header aside{
    width: 100%;
    display: flex;
    flex-direction: column;
    position: fixed;
    ...
}
.content{
    width: 100%;
    min-height: 100vh;
    ...
}
```

En el div .content he dividido el espacio en diferentes bloques, una barra superior:
```css
.top-bar{
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ...
}
```
<img width="100%" src="https://jcerme.com/spotify/img/top-bar.png">
Los elementos de la barra lateral no tienen ninguna acción, solo el logotipo y el elemento "Inicio". Tampoco añadí funcionalidad a la barra superior del contenido.


## jQuery
La petición ajax con jQuery es muy simple, en este caso he utilizado ".getJSON" porque hago la solicitud a un archivo json. En caso de que sea cualquier otro, se puede utilizar directamente .ajax y, dentro, añadir "dataType:'json'".

```js
$.getJSON({
    url: './js/artistas.json',
    success: function(data) {
        data.forEach(function(value){
            artistCard += ...
        });
    },
    error: function(xhr, status) {
        alert('Ha habido algún problema al hacer la petición');
    },
}).done(function(){
    $('#artists-sect').append(artistCard);
    addEvent2();
});
```

Dentro de la función tenemos:
· El elemento "success" que ejecutará el código en caso de que la petición se realice correctamente.
· El elemento "error" que ejecutará el código en caso de que la petición sea errónea.
· El elemento "complete" que ejecutará el código haya sido una petición correcta o errónea.

Y luego tenemos la propiedad .done del .getJSON/.ajax, que sirve para ejecutar el código cuando la petición sea correcta y el código dentro del success se haya ejecutado.


## JSON:
```json
[
    {
        "id":0,
        "name":"Bad Bunny",
        "img":"./img/artists/bad-bunny.jpg",
        "desc":"Es un cantantante, compositor y productor puertorriqueño...",
        "albums":[{
            "id":0,
            "name":"Un verano sin tí",
            "year":2022,
            "img":"./img/albums/un-verano-sin-ti.jpeg",
            "songs":[
                {
                    "name":"Moscow Mule",
                    "duration":"4:06",
                    "link":"https://www.youtube.com/watch?v=p38WgakuYDo"
                }
```


## Artistas:
Estos son los artistas que he utilizado, cada uno de los artistas tiene sus álbumes y sus respectivas canciones:
<table>
  <tr>
    <td>
      <img width="100%" src="https://jcerme.com/spotify/img/badbunny-card.png">
    </td>
    <td>
      <img width="100%" src="https://jcerme.com/spotify/img/kiddkeo-card.png">
    </td>
    <td>
      <img width="100%" src="https://jcerme.com/spotify/img/kaze-card.png">
    </td>
    <td>
      <img width="100%" src="https://jcerme.com/spotify/img/kaseo-card.png">
    </td>
  </tr>
</table>
