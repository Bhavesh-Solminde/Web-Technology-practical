<?php
session_start();
include "db.php";

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {

    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {

        $_SESSION['username'] = $row['username'];
        header("Location: dashboard.php");

    } else {
        echo "Invalid Password";
    }

} else {
    echo "User Not Found";
}

$conn->close();
?>