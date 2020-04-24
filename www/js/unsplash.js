async function searchPhoto(query) {
    var accesKey = '9b5Caw71smFDUvbxMOZKIXkLcWaGMFnAnz7TxTki9Fw';
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    let response = await fetch("https://api.unsplash.com/search/photos?query=" + query + "&client_id=" + accesKey, requestOptions);
    let jsonResponse = await response.json();
    let imagesList = await jsonResponse.results;
    console.log('Result', imagesList);

    const a = document.getElementById("todo");
    a.innerHTML = '';


    for (var each in imagesList) {
        var x = document.createElement("LABEL");
        if (imagesList[each].description != null) {
            var t = document.createTextNode(imagesList[each].description);
        } else {
            if (imagesList[each].alt_description != null) {
                var t = document.createTextNode(imagesList[each].alt_description);
            } else {
                var t = document.createTextNode('No Description');
            }

        }

        x.setAttribute("class", "text");
        x.appendChild(t);

        a.appendChild(x);

        var z = document.createElement("img");
        z.setAttribute("width", "150");
        z.setAttribute("height", "150");
        z.setAttribute("class", "center");
        z.setAttribute("id", "img");
        z.setAttribute("src", imagesList[each].urls.small);

        a.appendChild(z);

        var x = document.createElement("LABEL");
        var t = document.createTextNode("Photo taked by: " + imagesList[each].user.name);
        x.appendChild(t);

        a.appendChild(x);

        var separator = document.createElement("div");
        separator.setAttribute("class", "theseparatorxd");
        a.appendChild(separator);



    }
}
