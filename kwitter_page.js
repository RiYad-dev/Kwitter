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

user_name = localStorage.getItem("User_Name");
room_name = localStorage.getItem("room_name");

function scrolltoBottom() {
    var objDiv = document.getElementById("output");
    objDiv.scrollTop = objDiv.scrollHeight;
}
function send() {
    if (document.getElementById("msg").value.length == 0) {
        document.getElementById("msg").placeholder = "Please enter a message!";
    } else {
        msg = document.getElementById("msg").value;
        firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            likes: 0
        });
        document.getElementById("msg").value = "";
    }
    scrolltoBottom();
}
function logout() {
    localStorage.removeItem("User_Name");
    localStorage.removeItem("room_name");
    window.location.replace("kwitter_room.html");
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);
                // fetching data
                Name = message_data['name'];
                Message = message_data['message'];
                Likes = message_data['likes'];

                name_with_tag = "<h4>" + Name + "<img src='tick.png' class= 'user_tick'></h4>";
                message_with_tag = "<h4 class='message_h4'>" + Message + "</h4>";
                likes_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value= " + Likes + " onclick= 'updateLike(this.id)'>";
                span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: " + Likes + "<span></button><hr>";
                row = name_with_tag + message_with_tag + likes_button + span_with_tag;
                if (Name == user_name) {
                    document.getElementById("output").innerHTML += "<div class='alignright'>" + row + "</div>";
                } else {
                    document.getElementById("output").innerHTML += "<div class='alignleft'>" + row + "</div>";
                }
                scrolltoBottom();
            }
        });
    });
}
getData();

function updateLike(message_id) {
    console.log("clicked on like button- " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
    firebase.database().ref(room_name).child(message_id).update({
        likes: updated_likes
    });
}