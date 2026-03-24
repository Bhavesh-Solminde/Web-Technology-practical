<!DOCTYPE html>
<html>
<head>
<title>User Registration</title>
</head>
<body>

<h2>Register</h2>

<form method="POST" action="register_process.php">
Username: <input type="text" name="username" required><br><br>
Email: <input type="email" name="email" required><br><br>
Password: <input type="password" name="password" required><br><br>

<input type="submit" value="Register">
</form>

<a href="login.php">Login Here</a>

</body>
</html>