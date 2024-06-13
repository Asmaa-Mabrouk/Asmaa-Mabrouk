var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var dataWrapper = document.getElementById("tBody");
var submitBtn = document.getElementById("submitBtn");
var bookMarkToBeUpdated;
var bookMarks = [];
var searchInput = document.getElementById("search");

if (localStorage.allBookMarks != null) {
  bookMarks = JSON.parse(localStorage.allBookMarks);
  displayBookMark(bookMarks);
}
submitBtn.addEventListener("click", function () {
    if (validateURl() == true && siteNameInput.value != ""){
        var newBookMark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
          };
          bookMarks.push(newBookMark);
          localStorage.setItem("allBookMarks", JSON.stringify(bookMarks));
          displayBookMark(bookMarks);
    }else {
        Swal.fire({
            title: "Invalid Data",
            text: `${siteNameInput.value =="" ? "Please Enter the Site Name":""} ${validateURl() == false ? "Please Enter a Valid URL" : ""}`,
            icon: "error"
          });
    }
  clearFields()
});
function displayBookMark(bookMarksData) {
  var cartoona = "";
  for (var i = 0; i < bookMarksData.length; i++) {
    cartoona += `<tr>
<th scope="row">${i + 1}</th>
<td>${bookMarksData[i].siteName}</td>
<td>
<a class="btn btn-visit" href="${bookMarksData[i].siteUrl}" target="_blank">
<i class="fa-solid fa-eye pe-2"></i>Visit
</a> </td>
<td>
  <button class="btn btn-success" onclick="updateBookMark(${i})"> Update
  </button>
</td>
<td>
  <button class="btn btn-delete" onclick="deleteBookMark(${i})">
    <i class="fa-solid fa-trash-can"></i> Delete
  </button>
</td>
</tr>`;
  }
  dataWrapper.innerHTML = cartoona;
}
function updateBookMark(index) {
  bookMarkToBeUpdated = index;
  siteNameInput.value = bookMarks[index].siteName;
  siteUrlInput.value = bookMarks[index].siteUrl;
  displayUpdateBtn();
}
function displayUpdateBtn() {
  document.getElementById("submitBtn").classList.replace("d-block", "d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");
}
function displaySubmitBtn() {
  document.getElementById("submitBtn").classList.replace("d-none", "d-block");
  document.getElementById("updateBtn").classList.replace("d-block", "d-none");
}
function submitUpdate() {
  var updatedBookMark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };
  bookMarks.splice(bookMarkToBeUpdated, 1, updatedBookMark);
  localStorage.setItem("allBookMarks", JSON.stringify(bookMarks));
  displayBookMark(bookMarks);
  displaySubmitBtn();
  // clearFields()
}

function deleteBookMark(index) {
  bookMarks.splice(index, 1);
  localStorage.setItem("allBookMarks", JSON.stringify(bookMarks));
  displayBookMark(bookMarks);
}

function clearFields() {
    siteNameInput.value='';
    siteUrlInput.value = '';
}

searchInput.addEventListener("input", function (e) {
    var searchResult=[]; 
  for (var i = 0; i < bookMarks.length; i++) {
    if (bookMarks[i].siteName.toLowerCase().includes(e.target.value.toLowerCase())) 
        {
            searchResult.push(bookMarks[i]); 
    }
  }
  displayBookMark(searchResult); 
});

function validateURl (){
    var pattern = /^(https?|ftp|file):\/\/(?:\S+(?::\S*)?@)?(?:(?:(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,})|(?:\d{1,3}\.){3}\d{1,3})(?::\d{2,5})?(?:\/[^\s]*)?(?:\?[^\s#]*)?(?:#[^\s]*)?$/gi;
    return pattern.test(siteUrlInput.value);

}
