<?php
include "db.php";

$username = $_POST['username'];
$email = $_POST['email'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO users (username, email, password)
VALUES ('$username', '$email', '$password')";

if ($conn->query($sql) === TRUE) {
    echo "Registration Successful!";
    echo "<br><a href='login.php'>Login Now</a>";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>