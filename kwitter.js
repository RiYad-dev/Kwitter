function addUser() {
    if (document.getElementById("user_name").value.length == 0) {
        document.getElementById("user_name").placeholder = "Please enter a username!";
    } else {
    user_name= document.getElementById("user_name").value;
    localStorage.setItem("User_Name", user_name);
    window.location= "kwitter_room.html";
    }
}