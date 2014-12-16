 $(document).ready(function() {


//   var search_function = function() {
//     var search_input  = $(this).val();
//     if (search_input.length < 3) return; // use return to exit function early

//     var keyword       = encodeURIComponent(search_input);
//     // Youtube API 
//     var yt_url        ='http://gdata.youtube.com/feeds/api/videos?q='+
//                         keyword+'&format=5&max-results=40&v=2&duration=long&orderby=viewCount&category=music%2Cconcert%2dMusic%2dConcert&alt=jsonc'; 
//     // Wiki API
//     var wiki_url      ='http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+keyword+'&rvsection=0';
//     //var wiki_url='http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles='+keyword;

//     $.ajax ({
//       type: "GET",   //you can also use Method: instead of type
//       url: yt_url,
//       dataType:"jsonp",
//       success: function(response) {
//         $("#results").html('');

//         if(response.data.items) {
//           $.each(response.data.items.slice(0,20), function(i, item) {
//             // var all_videos=response.item.items; 
//             var video_id = item.id;
//             var video_title = item.title;
//             var video_viewCount = item.viewCount;

//             // IFRAME Embed for YouTube
//             var video_frame="<iframe width='900' height='600' data-video-id="+video_id+" src='http://www.youtube.com/embed/"+video_id+"' frameborder='2' type='text/html' allowfullscreen></iframe>";
//             var search_vids="\
//               <div class='result'> \
//                 <div id='title'>" + video_title + "</div> \
//                 <div class='vid_div'>" + video_frame + "</div> \
//                 <div id='count'>" + video_viewCount + " Views</div> \
//               </div>";

//             console.log("appending "+video_title);
//             $("#results").append(search_vids);
//           });
//         } else {
//           $("#results").html("<div class='no'>No Videos</div>");
//         }
//       }
//     });
//   }//////////////////////////////////////////////////////////
    var search_function = function() {
    var search_input  = $(this).val();
    if (search_input.length < 3) return; // use return to exit function early

    var keyword       = encodeURIComponent(search_input);
    // Youtube API 
    var yt_url        = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+keyword+'%2Cmusic%2C+full%2C+concert%2C+festival&key=AIzaSyB7iyk1ZqMmVn2EaSK6Nfnb0nsGuIZDa2A&'
  
    $.ajax ({
      crossDomain: true,
      type: "GET",   //you can also use Method: instead of type
      url: yt_url,
      dataType:"json",
      success: function(data) {
      $.each(data.feed.entry, function(i, item) {                                
        var title    = item['title']['$t'];
        var videoid  = item['id']['$t'];
        var htmlString  = '<ul id="videoslisting">';

        var pubdate  = item['published']['$t'];
        var fulldate = new Date(pubdate).toLocaleDateString();
      
        var thumbimg = item['media$group']['media$thumbnail'][0]['url'];
        var tinyimg1 = item['media$group']['media$thumbnail'][1]['url'];
        var tinyimg2 = item['media$group']['media$thumbnail'][2]['url'];
        var tinyimg3 = item['media$group']['media$thumbnail'][3]['url'];
      
        var vlink    = item['media$group']['media$content'][0]['url'];
        var ytlink   = item['media$group']['media$player'][0]['url'];
        var numviews = item['yt$statistics']['viewCount'];
        var numcomms = item['gd$comments']['gd$feedLink']['countHint'];
      
        htmlString  += '<li class="clearfix"><h2>' + title + '</h2>';
        htmlString  += '<div class="videothumb"><a href="#" target="_blank"><img src="' + thumbimg + '" width="480" height="360"></a></div>';
        htmlString  += '<div class="meta"><p>Published on <strong>' + fulldate + '</strong></p><p>Total views: <strong>' + commafy(numviews) + '</strong></p><p><a href="#" class="external" target="_blank">View on YouTube</a></p><p><a href="'+ vlink +'" class="external" target="_blank">View in Fullscreen</a></p><p><strong>Alternate Thumbnails</strong>:<br><img src="'+ tinyimg1 +'"> <img src="' + tinyimg2 + '"> <img src="'+ tinyimg3 +'"></p></div></li>';
        $('#videos').html(htmlString + "</ul>");
      }); // end each loop
    
      
    }
    }); // end json parsing
  
  // commafy function source
  // http://stackoverflow.com/a/6785438/477958
  function commafy( arg ) {
   arg += '';
   var num = arg.split('.'); 
   if (typeof num[0] !== 'undefined'){
      var int = num[0];
      if (int.length > 3){
         int     = int.split('').reverse().join('');
         int     = int.replace(/(\d{3})/g, "$1,");
         int     = int.split('').reverse().join('')
      }
   }
   if (typeof num[1] !== 'undefined'){
      var dec = num[1];
      if (dec.length > 4){
         dec     = dec.replace(/(\d{3})/g, "$1 ");
      }
   }

   return (typeof num[0] !== 'undefined'?int:'') 
        + (typeof num[1] !== 'undefined'?'.'+dec:'');
  }
};
  /////////////////////////////////////////////////////////////////

  // had to throttle search function as too many requests were being made on every keyup
  var throttled_search_function = $.throttle(300, search_function);
  $(".search_input").keyup(throttled_search_function);


//////////////////////////////////////////////////////////////////////////////
//   $('#next_page').click(function() {
  
//     var search_input = $('.search_input').val();
//     //if (search_input) return; // use return to exit function early

//     var keyword= encodeURIComponent(search_input);
//     // Youtube API 
//     var yt_url='http://gdata.youtube.com/feeds/api/videos?q='+keyword+'&format=5&max-results=40&v=2&duration=long&orderby=viewCount&category=music%2Cconcert%2dMusic%2dConcert&alt=jsonc'; 
//     // Wiki API
//     var wiki_url='http://en.wikipedia.org/w/api.php?action=query&prop=revisions&rvprop=content&format=json&titles='+keyword+'&rvsection=0';
//     //var wiki_url='http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles='+keyword;

//     $.ajax ({
//       type: "GET",   //you can also use Method: instead of type
//       url: yt_url,
//       dataType:"jsonp",
//       success: function(response) {
//         $("#results").html('');

//         if(response.data.items) {
//           $.each(response.data.items.slice(21,40), function(i, item) {
//             // var all_videos=response.item.items; 
//             var video_id = item.id;
//             var video_title = item.title;
//             var video_viewCount = item.viewCount;
      

//             // IFRAME Embed for YouTube
//             var video_frame="<iframe width='900' height='600' data-video-id="+video_id+" src='http://www.youtube.com/embed/"+video_id+"'fs=1 frameborder='2' type='text/html'></iframe>";
//             var search_vids="\
//               <div class='result'> \
//                 <div id='title'>" + video_title + "</div> \
//                 <div class='vid_div'>" + video_frame + "</div> \
//                 <div id='count'>" + video_viewCount + " Views</div> \
//               </div>";

//             console.log("appending "+video_title);
//             $("#results").append(search_vids);
//           });
//         } else {
//           $("#results").html("<div class='no'>No Videos</div>");
//         }
//       }
//     });
  

//   });

}); // and here