// exampe request using ajax get.
$.get('data/condensed_data.json', function(data){
  for (var i = 0; i < data.data.length; i++) {
    var element = document.createElement("div");
    var inner = document.createTextNode(data.data[i].author);
    element.appendChild(inner);
    document.getElementById('demo').appendChild(element);
  }
})

// can do a XMLHttpRequest but since they are using jquery for bootstrap can we
// make use of it?
