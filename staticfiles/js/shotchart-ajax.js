jQuery(document).ready( function() {

  function getAllPlayers () {
    $.ajax(
    {
        type:"GET",
        url: "/all-players",
        data:{
                 msg: message
        },
        success: function( data )
        {
            $( '#results' ).attr('src', 'data:image/png;base64, ' + data);
        }
     })
  }

  $('#select-player').click(function(){
    var message = 'Hello!';
    console.log("function called");
});
})
