$(document).ready(function(){
    $('#encrypt').click(function(){
        $.ajax(
        	{ url: 'http://eagle.cs.wit.edu:44003',
         		data: {action: 'test'},
         		type: 'post',
         		success: function(output) {
              alert(output);
            }
				});
    });
})