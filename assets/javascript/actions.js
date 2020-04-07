$(document).ready(function () {
  // hidden page password bttn
  $("#passwordBttn").on("click", function (event) {
    var password = prompt("password: ");
    var title = $("#hiddenTitle");
    var returnLink = $("<a href=index.html id='menuTitle'>Home</a>");
    var messageCenterLink = $(
      "<a href=message_center.html id='menuTitle'>Order Center</a>"
    );
    var welcomeSam = $("<h1 id='menuTitle'>Welcome Sam<h1>");
    var addItemTitle = $("<h2 id='menuTitle'>add menu item</h2>");
    var menuInput = $("<input id='menuInput' placeholder='Item Title'>");
    var menuInput2 = $(
      "<textarea id='menuInput2' placeholder='Item Description' rows = '3'>"
    );
    var priceInput = $("<input id='priceInput' placeholder='Item Price'>");
    var submit = $("<button id='submitBttn'>Add Item</button>");
    var failWarning = "failed to load page";
    if (password === "123456") {
      alert("Correct");
      $("#hiddenTitle").append(welcomeSam);
      $("#messageLink").append(messageCenterLink);
      $("#hiddenInputDiv").append(menuInput);
      $("#hiddenInputDiv2").append(menuInput2);
      $("#priceInputDiv").append(priceInput);
      $("#hiddenSubmit").append(submit);
      $("#addItem").append(addItemTitle);
      $("#returnHome").append(returnLink);
    } else {
      alert("Invalid Password");
      $(title).text(failWarning);
      $("#returnHome").append(returnLink);
    }
  });
  //   -------------------------------------------------
  //   Firebase
  var Config = {
    apiKey: "AIzaSyDBxfyP1heCdJd93PMeQp5OTs0Pl8_0lKE",
    authDomain: "kitsune-225ac.firebaseapp.com",
    databaseURL: "https://kitsune-225ac.firebaseio.com",
    projectId: "kitsune-225ac",
    storageBucket: "kitsune-225ac.appspot.com",
    messagingSenderId: "758996715956",
    appId: "1:758996715956:web:14e17df35f6a50e31b0ae1",
  };
  firebase.initializeApp(Config);
  var database = firebase.database();
  var itemTitle = "";
  var itemDescription = "";
  var itemPrice = "";
  $("#hiddenSubmit").on("click", function (event) {
    event.preventDefault();
    (itemTitle = $(menuInput).val().trim()),
      (itemDescription = $(menuInput2).val().trim()),
      (itemPrice = $(priceInput).val().trim());
    database.ref().push({
      itemTitle: itemTitle,
      itemDescription: itemDescription,
      itemPrice: itemPrice,
    });
    alert("Item Added!");
  });
  database.ref().on(
    "child_added",
    function (childSnapshot) {
      var menuItem = $("<div>").append(
        $("<h3 id = 'specialsTitle'>").text(childSnapshot.val().itemTitle),
        $("<p id = 'specialsDescription'>").text(
          childSnapshot.val().itemDescription
        ),
        $("<p id = 'price'>").text(childSnapshot.val().itemPrice)
      );
      $("article").append(menuItem);
    },
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
  //   --------------------------------
  // Order center
  var email = "";
  var message = "";
  var orderItem2 = "";
  var orderItem3 = "";
  var orderItem4 = "";
  var orderItem5 = "";
  var itemInput = $(".itemInput").text();

  $("#submitOrder").on("click", function (event) {
    event.preventDefault();

    (email = $("#email").text()),
      (message = $("#item1").text()),
      (orderItem2 = $("#item2").text()),
      (orderItem3 = $("#item3").text()),
      (orderItem4 = $("#item4").text()),
      (orderItem5 = $("#item5").text());
    database.ref().push({
      email: email,
      message: message,
      orderItem2: orderItem2,
      orderItem3: orderItem3,
      orderItem4: orderItem4,
      orderItem5: orderItem5,
    });
    alert("Order Submitted");
  });
  database.ref().on("child_added", function (childSnapshot) {
    var userMessage = $("<div>").append(
      $("<hr />"),
      $("<h3>").text(childSnapshot.val().email),
      $("<p>").text(childSnapshot.val().message),
      $("<p>").text(childSnapshot.val().orderItem2),
      $("<p>").text(childSnapshot.val().orderItem3),
      $("<p>").text(childSnapshot.val().orderItem4),
      $("<p>").text(childSnapshot.val().orderItem5)
    );
    $("#messageCenter").append(userMessage);
  });
  // $("#submitBttn").on("click", function (event) {
  //   event.preventDefault();
  //   message = $("#messageInput").val().trim();
  //   orderItem2 = $("#item2Input").val().trim();
  //   orderItem3 = $("#item3Input").val().trim();
  //   orderItem4 = $("#item4Input").val().trim();
  //   orderItem5 = $("#item5Input").val().trim();
  //   console.log(message);
  //   console.log(orderItem2);
  //   console.log(orderItem3);
  //   console.log(orderItem4);
  //   console.log(orderItem5);
  //   // sessionStorage.clear();
  //   sessionStorage.setItem("message", message);
  //   sessionStorage.setItem("orderItem2", orderItem2);
  //   sessionStorage.setItem("orderItem3", orderItem3);
  //   sessionStorage.setItem("orderItem4", orderItem4);
  //   sessionStorage.setItem("orderItem5", orderItem5);
  //   alert("Added to cart!");
  // });

  // $("#item1").text(sessionStorage.getItem("message"));
  // $("#item2").text(sessionStorage.getItem("orderItem2"));
  // $("#item3").text(sessionStorage.getItem("orderItem3"));
  // $("#item4").text(sessionStorage.getItem("orderItem4"));
  // $("#item5").text(sessionStorage.getItem("orderItem5"));

  $("#addAddress").on("click", function (event) {
    event.preventDefault();
    email = $("#emailInput").val().trim();
    console.log(email);
    sessionStorage.setItem("email", email);
    $("#email").text(sessionStorage.getItem("email"));
  });
  $("#email").text(sessionStorage.getItem("email"));

  // remove item buttons
  var empty = "";
  $("#remove1").on("click", function () {
    $("#item1").remove();
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys1;
    sessionStorage.setItem("total", newTotal);
    sessionStorage.setItem("crys1", empty);

    alert("Item Removed!");
    reloadPage();
  });
  $("#remove2").on("click", function (event) {
    event.preventDefault();
    $("#item2").remove();
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys2;
    sessionStorage.setItem("total", newTotal);
    sessionStorage.setItem("crys2", empty);
    reloadPage();
  });
  $("#remove3").on("click", function (event) {
    event.preventDefault();
    $("#item3").remove();
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys3;
    sessionStorage.setItem("total", newTotal);
    sessionStorage.setItem("crys3", empty);
    reloadPage();
  });
  $("#remove4").on("click", function (event) {
    event.preventDefault();
    $("#item4").remove();
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys4;
    sessionStorage.setItem("total", newTotal);
    sessionStorage.setItem("crys4", empty);
    reloadPage();
  });
  $("#remove5").on("click", function (event) {
    event.preventDefault();
    $("#item5").remove();
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys5;
    sessionStorage.setItem("total", newTotal);
    sessionStorage.setItem("crys5", empty);
    reloadPage();
  });
  function reloadPage() {
    location.reload(true);
  }
  var crys1 = 15.0;
  var crys2 = 16.0;
  var crys3 = 18.0;
  var crys4 = 20.0;
  var crys5 = 23.0;
  var crys6 = 14.0;
  var userScore = 0;
  var box1 = "Box 1";
  var box2 = "Box 2";
  var box3 = "Box 3";
  var box4 = "Box 4";
  var box5 = "Box 5";
  var box6 = "Box 6";
  $(".crystal1").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys1", crys1);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys1"));
    alert("Added to cart!");
  });
  $(".crystal2").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys2", crys2);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys2"));
    alert("Added to cart!");
  });
  $(".crystal3").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys3", crys3);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys3"));
    alert("Added to cart!");
  });
  $(".crystal4").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys4", crys4);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys4"));
    alert("Added to cart!");
  });
  $(".crystal5").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys5", crys5);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys5"));
    alert("Added to cart!");
  });
  $(".crystal6").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    sessionStorage.setItem("crys6", crys6);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys6"));
    alert("Added to cart!");
  });

  function crystalValue() {
    $(".crystal1").attr("value", crys1, box1);
    $(".crystal2").attr("value", crys2, box2);
    $(".crystal3").attr("value", crys3, box3);
    $(".crystal4").attr("value", crys4, box4);
    $(".crystal5").attr("value", crys5, box5);
    $(".crystal6").attr("value", crys6, box6);
    $(".userScore").text(userScore);
  }
  $("#clearTotal").on("click", function () {
    sessionStorage.clear();
    $("#total").text("0");
    $("#tax").text("0");
    $(".userScore").text("0");
    reloadPage();
  });
  crystalValue();
  $(".userScore").text(sessionStorage.getItem("total"));
  var subTotal = parseFloat(sessionStorage.getItem("total"));
  var tax = parseFloat(sessionStorage.getItem("total") * 0.1);
  var taxTotal = subTotal + tax;
  console.log(tax);
  console.log(subTotal);
  $("#total").append(taxTotal);
  $("#item1").append(sessionStorage.getItem("crys1"));
  $("#item2").append(sessionStorage.getItem("crys2"));
  $("#item3").append(sessionStorage.getItem("crys3"));
  $("#item4").append(sessionStorage.getItem("crys4"));
  $("#item5").append(sessionStorage.getItem("crys5"));
  $("#tax").append(tax);
});
