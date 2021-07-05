var firebaseConfig = {
      apiKey: "AIzaSyAbeJN_aUWDFCpfhk5sIwzJe5Ipd6KXZnU",
      authDomain: "kwitter-710a2.firebaseapp.com",
      databaseURL: "https://kwitter-710a2-default-rtdb.firebaseio.com",
      projectId: "kwitter-710a2",
      storageBucket: "kwitter-710a2.appspot.com",
      messagingSenderId: "96880418949",
      appId: "1:96880418949:web:776d310eb1cb7b8484c9ec",
      measurementId: "G-9W1J9XDWLR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//ADD YOUR FIREBASE LINKS HERE

user_name = localStorage.getItem("User_Name");
document.getElementById("User_namE").innerHTML = "Welcome " + user_name + "!";

function addRoom() {
      if (document.getElementById("room_name").value.length == 0) {
            document.getElementById("room_name").placeholder = "Please enter a room name!";
        } else {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "Adding Room Name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name- " + Room_names);
                  row = "<div class= 'room_name' id=" + Room_names + ">#" + Room_names + "</div>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();
function logout() {
      localStorage.removeItem("User_Name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}