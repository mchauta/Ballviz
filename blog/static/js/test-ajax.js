jQuery(document).ready( function() {

  let test = 'this is a test';
  console.log(test);

  $('#test-ajax').click(function(){
    var message = 'Hello!';
    console.log("function called");
    $.ajax(
    {
        type:"GET",
        url: "/likepost",
        data:{
                 msg: message
        },
        success: function( data )
        {
            $( '#results' ).text(data);
        }
     })
});

})
