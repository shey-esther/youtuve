"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
   result: {
      videos: [],
      selectedVideo: null,
      searchTerm: "iPhone X"
   },

   init: function() {
      //app.videoSearch("iPhone");
      app.youtubeSearch("iPhone X");
      $('#buscar').click(app.buscarvideo);
   },

   getVideoList: function(videos) {
      return videos.map((video, index) => {
         const imageUrl = video.snippet.thumbnails.default.url;
         const url = `https://www.youtube.com/embed/${video.id.videoId}`;
         return `<div class ='row'>\
                    <div class = 'col-sm-12'>
                    <img src="${imageUrl}" alt="">
                        <p class = "letra">${video.snippet.title}</p>
                    </div>
               </div>`;
      });
   },
   mostrarVideo : (video) => {
      const url = `https://www.youtube.com/embed/${video.id.videoId}`;
       $('#videomostrar').html(`<iframe className="embed-responsive-item" src='${url}'> </iframe>`)

   },

   buscarvideo : () => {
      let capturar = $('#valor').val();
      app.youtubeSearch(capturar);
   },

   youtubeSearch: function(searchTerm) {
      console.log(searchTerm);

      YTSearch({ key: API_KEY, term: searchTerm }, data => {
         console.log("result", data);
         app.result = {
            videos: data,
            selectedVideo: data[0],
            searchTerm: searchTerm
         };
         app.mostrarVideo(app.result.videos[0]);
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").html(list);
         $('img').click(app.seclecionarimg);
      });
   },

   seclecionarimg : (event) => {
      
       let sours = event.target.src;
       console.log(sours);
       let inicio;
      app.result.videos.map((video, i) => {
            const imageUrl = video.snippet.thumbnails.default.url;
            return (sours == imageUrl)?inicio = i : '';
         });
         app.mostrarVideo(app.result.videos[inicio]);
   },
   videoSearch: function(searchTerm) {
      jQuery.getJSON("list.json", data => {
         console.log("result", data.items);
         app.result = {
            videos: data.items,
            selectedVideo: data.items[0],
            searchTerm: searchTerm
         };
         var list = app.getVideoList(app.result.videos);
         console.log("lis: ", list);
         $("#root").append(list);
      });
   }
};

$(document).ready(app.init);
