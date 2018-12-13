jQuery(document).ready( function() {

  let test = 'this is a test';
  console.log(test);

  $('#test-ajax').click(function(){
    var message = 'Hello!';
    console.log("function called");
    $.ajax(
    {
        type:"GET",
        url: "/test-plot",
        data:{
                 msg: message
        },
        success: function( data )
        {
            $( '#results' ).attr('src', 'data:image/png;base64, ' + data);
        },
        error: function(error) {
          console.log(error);
        }
     })
});

})
