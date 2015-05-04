//GET and PUT features implemented--currently working on POST and DELETE features

$('.item-edit').hide();

var currentLongboards = [];
var selectedLongboards = [];
var boardObj;

//source: http://stackoverflow.com/questions/7364150/find-object-by-id-in-array-of-javascript-objects
function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i]._id == id) {
      return source[i];
    }
  }
}

function saveChanges(id, dataObj) {
    var dataObject = dataObj;
    $.ajax({
        type: 'PUT',
        url: 'http://mean.codingcamp.us:8888/sarahg/longboard/' + id,
        data: dataObject,
        success:function(data){
        console.log(data);
        //alert('Updated!');
        },
    });
}

//how do I refactor this into separate functions?... 
//I want to make a getBoards function but can't update global variables--pass in array (currentLongBoards) as an argument?
$.ajax(	{
      type: "GET",
      url: "http://mean.codingcamp.us:8888/sarahg/longboards",
      success: function(response) { 
        
      	for(var i = 0; i < response.length; i++) {
          //The returned JSON was throwing up an 'unexpected token' error when I tried to parse it,
          //so I first stringified and then parsed it, as shown here: 
          //http://stackoverflow.com/questions/26334964/json-parse-unexpected-token-error
          var forShizzleJson = JSON.stringify(response[i]);
          var parsedJson = JSON.parse(forShizzleJson);
          currentLongboards.push(parsedJson);
          
          var itemHTML = 
      			'<div class="item" id="' + parsedJson._id + '">' +
    					'<div class="item-image">' +
    						'<img class="bottom" src="' + response[i].bottom_img_url + '">' +
    						'<img class="top" src="' + response[i].top_img_url + '">' +
    					'</div>' +
    					'<div class="name">' + response[i].brand + ' ' + response[i].length + '" ' + 
                    response[i].name + '</div>' +        	
       				'<div class="price"> $' + response[i].price + '</div>' + 
				    '</div>';
      		$('.items').append(itemHTML);
          
      	}
        
        $('.item').click(function() {
            $(this).toggleClass('highlight');
            var clickedID = $(this).attr('id');
            //alert(clickedID);
          });

        //click listener for taking user to edit page
        $('.edit').click(function() {
            $('.item').hide();
            $('.edit').hide();
            $('.preview-edit').append('<button class="add">add</button>');
            $('.preview-edit').append('<button class="done">done</button>');
            $('.item-edit').show();
            $('.highlight').each(function(index) {
                var idAtIndex = $(this).attr('id');
                selectedLongboards.push(idAtIndex);
            });
            
            for (var i = 0; i < selectedLongboards.length; i++) {

                boardObj = findById(currentLongboards, selectedLongboards[i]);
                
                var itemEditHTML = 
                      '<div class="item-edit" id="' + boardObj._id + '">' + 
                        '<table>' +
                          '<tr>' +
                            '<td> Brand:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-brand" value="' + boardObj.brand + '"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Name:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-name" value="' + boardObj.name + '"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Length:</td>' + 
                            '<td class="text-right"><input type="number" class="edit-length" value="' + boardObj.length + '">"</td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Style:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-style" value="' + boardObj.style + '"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Price:</td>' + 
                            '<td class="text-right">$<input type="number" class="edit-price" value="' + boardObj.price + '"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Bottom Image:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-btmimg" value="' + boardObj.bottom_img_url + '" placeholder="(url)"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Top Image:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-topimg" value="' + boardObj.top_img_url + '" placeholder="(url)"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td><a class="delete" href="#">delete</a></td>' + 
                            '<td class="text-right"><button class="save">save</button></td>' + 
                          '</tr>' + 
                        '</table>' + 
                      '</div>';

                $('.items').append(itemEditHTML);              

            }

            $('.save').click(function() { 
                //if has the property of class="added", do addBoard function that calls POST method. Else...
                var updateID = $(this).closest('div').attr('id');
                
                //console.log(updateID);
                var updateObj = new Object();
                updateObj.brand = $(this).closest('div').find('.edit-brand').val();
                updateObj.name = $(this).closest('div').find('.edit-name').val();
                updateObj.length = $(this).closest('div').find('.edit-length').val();
                updateObj.style = $(this).closest('div').find('.edit-style').val();
                updateObj.price = $(this).closest('div').find('.edit-price').val();
                updateObj.bottom_img_url = $(this).closest('div').find('.edit-btmimg').val();
                updateObj.top_img_url = $(this).closest('div').find('.edit-topimg').val(); 
                //console.log(updateObj);  
                saveChanges(updateID, updateObj);

              });

            $('.add').click(function() {
              //need to assign it an id through the POST method?
              var itemAddHTML = 
                      '<div class="item-edit" class="added">' + 
                        '<table>' +
                          '<tr>' +
                            '<td> Brand:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-brand"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Name:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-name"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Length:</td>' + 
                            '<td class="text-right"><input type="number" class="edit-length">"</td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Style:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-style"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Price:</td>' + 
                            '<td class="text-right">$<input type="number" class="edit-price"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Bottom Image:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-btmimg" placeholder="(url)"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td>Top Image:</td>' + 
                            '<td class="text-right"><input type="text" class="edit-topimg" placeholder="(url)"></td>' + 
                          '</tr>' + 
                          '<tr>' + 
                            '<td><a class="delete" href="#">delete</a></td>' + 
                            '<td class="text-right"><button class="save">save</button></td>' + 
                          '</tr>' + 
                        '</table>' + 
                      '</div>';

                $('.items').append(itemAddHTML);              

            });

            $('.done').click(function() {

                location.reload();
            });
            
        });  //listener for edit button click
               
      }
  } );








