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
  var boxCount1 = "";
  var boxCount2 = "";
  var boxCount3 = "";
  var boxCount4 = "";
  var boxCount5 = "";
  var date = "";
  var itemInput = $(".itemInput").text();

  $("#submitOrder").on("click", function (event) {
    event.preventDefault();
    (email = $("#email").text()),
      (boxCount1 = $(".boxCount1").text()),
      (boxCount2 = $(".boxCount2").text()),
      (boxCount3 = $(".boxCount3").text()),
      (boxCount4 = $(".boxCount4").text()),
      (boxCount5 = $(".boxCount5").text()),
      (date = Date());
    database.ref().push({
      address: email,
      boxCount1: boxCount1,
      boxCount2: boxCount2,
      boxCount3: boxCount3,
      boxCount4: boxCount4,
      boxCount5: boxCount5,
      date: date,
    });
    console.log(date);
    alert("Order Submitted");
  });
  database.ref().on("child_added", function (childSnapshot) {
    var userMessage = $("<div>").append(
      $("<hr />"),
      $("<h3>").text(childSnapshot.val().address),
      $("<p>").text(childSnapshot.val().boxCount1),
      $("<p>").text(childSnapshot.val().boxCount2),
      $("<p>").text(childSnapshot.val().boxCount3),
      $("<p>").text(childSnapshot.val().boxCount4),
      $("<p>").text(childSnapshot.val().boxCount5),
      $("<p>").text(childSnapshot.val().date)
    );

    $("#messageCenter").append(userMessage);
  });

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
    var removeBox = sessionStorage.getItem("box1Count");
    removeBox -= 1;
    sessionStorage.setItem("box1Count", removeBox);
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys1;
    sessionStorage.setItem("total", newTotal);
    alert("Item Removed!");
    reloadPage();
    if (removeBox === 0) {
      sessionStorage.setItem("crys1", empty);
    }
  });
  $("#remove2").on("click", function (event) {
    event.preventDefault();
    var removeBox = sessionStorage.getItem("box2Count");
    removeBox -= 1;
    sessionStorage.setItem("box2Count", removeBox);
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys2;
    sessionStorage.setItem("total", newTotal);

    reloadPage();
    if (removeBox === 0) {
      sessionStorage.setItem("crys2", empty);
    }
  });
  $("#remove3").on("click", function (event) {
    event.preventDefault();
    var removeBox = sessionStorage.getItem("box3Count");
    removeBox -= 1;
    sessionStorage.setItem("box3Count", removeBox);
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys3;
    sessionStorage.setItem("total", newTotal);
    reloadPage();
    if (removeBox === 0) {
      sessionStorage.setItem("crys3", empty);
    }
  });
  $("#remove4").on("click", function (event) {
    event.preventDefault();
    var removeBox = sessionStorage.getItem("box4Count");
    removeBox -= 1;
    sessionStorage.setItem("box4Count", removeBox);
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys4;
    sessionStorage.setItem("total", newTotal);
    reloadPage();
    if (removeBox === 0) {
      sessionStorage.setItem("crys4", empty);
    }
  });
  $("#remove5").on("click", function (event) {
    event.preventDefault();
    var removeBox = sessionStorage.getItem("box5Count");
    removeBox -= 1;
    sessionStorage.setItem("box5Count", removeBox);
    var subtractPrice = sessionStorage.getItem("total");
    var newTotal = subtractPrice - crys5;
    sessionStorage.setItem("total", newTotal);
    reloadPage();
    if (removeBox === 0) {
      sessionStorage.setItem("crys5", empty);
    }
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
  var box1Count = 0;
  var box2Count = 0;
  var box3Count = 0;
  var box4Count = 0;
  var box5Count = 0;
  $(".crystal1").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box1Count += 1;
    sessionStorage.setItem("box1Count", box1Count);
    sessionStorage.setItem("crys1", crys1);
    sessionStorage.setItem("total", userScore);
    alert("Added to cart!");
    console.log(box1Count);
  });
  $(".crystal2").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box2Count += 1;
    sessionStorage.setItem("box2Count", box2Count);
    sessionStorage.setItem("crys2", crys2);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys2"));
    alert("Added to cart!");
  });
  $(".crystal3").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box3Count += 1;
    sessionStorage.setItem("box3Count", box3Count);
    sessionStorage.setItem("crys3", crys3);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys3"));
    alert("Added to cart!");
  });
  $(".crystal4").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box4Count += 1;
    sessionStorage.setItem("box4Count", box4Count);
    sessionStorage.setItem("crys4", crys4);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys4"));
    alert("Added to cart!");
  });
  $(".crystal5").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box5Count += 1;
    sessionStorage.setItem("box5Count", box5Count);
    sessionStorage.setItem("crys5", crys5);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys5"));
    createCustomAlert();
  });
  $(".crystal6").on("click", function () {
    userScore = userScore + parseFloat($(this).attr("value"));
    box6Count += 1;
    sessionStorage.setItem("box6Count", box6Count);
    sessionStorage.setItem("crys6", crys6);
    sessionStorage.setItem("total", userScore);
    $("#menuItem").append(sessionStorage.getItem("crys6"));
    alert("Added to cart!");
  });
  function crystalValue() {
    $(".crystal1").attr("value", crys1);
    $(".crystal2").attr("value", crys2);
    $(".crystal3").attr("value", crys3);
    $(".crystal4").attr("value", crys4);
    $(".crystal5").attr("value", crys5);
    $(".crystal6").attr("value", crys6);
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
  $("#box1Count").append(sessionStorage.getItem("box1Count") + "x");
  $("#item1").append(sessionStorage.getItem("crys1"));
  $("#box2Count").append(sessionStorage.getItem("box2Count") + "x");
  $("#item2").append(sessionStorage.getItem("crys2"));
  $("#box3Count").append(sessionStorage.getItem("box3Count") + "x");
  $("#item3").append(sessionStorage.getItem("crys3"));
  $("#box4Count").append(sessionStorage.getItem("box4Count") + "x");
  $("#item4").append(sessionStorage.getItem("crys4"));
  $("#box5Count").append(sessionStorage.getItem("box5Count") + "x");
  $("#item5").append(sessionStorage.getItem("crys5"));
  $("#tax").append(tax);
  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
  var ALERT_TITLE = "Kitsune";
  var ALERT_BUTTON_TEXT = "Ok";

  if (document.getElementById) {
    window.alert = function (txt) {
      createCustomAlert(txt);
    };
  }

  function createCustomAlert(txt) {
    d = document;

    if (d.getElementById("modalContainer")) return;

    mObj = d
      .getElementsByTagName("body")[0]
      .appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    if (d.all && !window.opera)
      alertObj.style.top = document.documentElement.scrollTop + "px";
    alertObj.style.left =
      (d.documentElement.scrollWidth - alertObj.offsetWidth) / 2 + "px";
    alertObj.style.visiblity = "visible";

    h1 = alertObj.appendChild(d.createElement("h1"));
    h1.appendChild(d.createTextNode(ALERT_TITLE));

    msg = alertObj.appendChild(d.createElement("p"));
    //msg.appendChild(d.createTextNode(txt));
    msg.innerHTML = txt;

    btn = alertObj.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btn.appendChild(d.createTextNode(ALERT_BUTTON_TEXT));
    btn.href = "#";
    btn.focus();
    btn.onclick = function () {
      removeCustomAlert();
      return false;
    };

    alertObj.style.display = "block";
  }

  function removeCustomAlert() {
    document
      .getElementsByTagName("body")[0]
      .removeChild(document.getElementById("modalContainer"));
  }
});
