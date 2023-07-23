var bookMarkName = document.getElementById('bookMarkName')
var websiteURL = document.getElementById('websiteURL')
var Mainindex = 0

var listOfBookMark = []

if (localStorage.getItem('list') != null) {
    listOfBookMark = JSON.parse(localStorage.getItem('list'))
    displayProducts()
} else {
    listOfBookMark = []
}

function clearFunction() {
    bookMarkName.value = "";
    websiteURL.value = "";
}
function isValid(name, uri) {
    var NameRegex = /[a-zA-Z0-9]{3}/
    var urlRexeg = /^(www\.)[a-zA-Z0-9]{3,20}(\.com)$/

    console.log(NameRegex.test(name))
    console.log(urlRexeg.test(uri))
    if (NameRegex.test(name) && urlRexeg.test(uri)) {
        console.log("Trueeee");
        return false
    }
}
function addBookMark() {
    if (isValid(bookMarkName.value, websiteURL.value) == false) {
        var bookMark = {
            name: bookMarkName.value,
            url: websiteURL.value,
        }
        listOfBookMark.push(bookMark)
        localStorage.setItem('list', JSON.stringify(listOfBookMark))
        displayProducts()
        clearFunction()
    } else {
        window.alert(`Site Name or Url is not valid, Please follow the rules below :
        Site name must contain at least 3 characters
        Site URL must be a valid one`)
    }

}

function deleteProduct(index) {
    listOfBookMark.splice(index, 1)
    console.log(listOfBookMark);
    localStorage.setItem("list", JSON.stringify(listOfBookMark))
    displayProducts()
}

function displayProducts() {
    var list = ``;
    for (var i = 0; i < listOfBookMark.length; i++) {
        list += `<tr>
            <td>${listOfBookMark[i].name}</td>
            <td>${listOfBookMark[i].url}</td>
            <td>
            <a class="btn btn-success" href="${listOfBookMark[i].url}" role="button" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
            </td>
            <td>
            <button type="button" class="btn btn-danger " onclick="deleteProduct(${i})"
                    style="width: 100px;"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </td>
        </tr>`
    }
    document.getElementById('myData').innerHTML = list
}