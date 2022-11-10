<?php
$username = $_POST["username"];
$password = $_POST["password"];
$email = $_POST["email"];

echo "<h1>Anda sudah terdaftar sebagai ".$username."!</h1>";
?>

<!DOCTYPE HTML>
<html>
    <head>
        <title>Halaman Login</title>
        <link rel="stylesheet" href="action/style.css">
    </head>
    <body>
        <div class="container">
          <h1>Daftar</h1>
            <form method="POST" action="action/admin.php">

                <input type="hidden" name="tujuan" value="DAFTAR">

                <label>Username</label>
                <br>
                <input name="username" type="text">
                <br>
                <label>Email</label>
                <br>
                <input name="email" type="text">
                <br>
                <label>Password</label>
                <br>
                <input name="password" type="password">
                <br>
                <button>Daftar</button>
                <p> Sudah punya akun?
                  <a href="login.php">Login di sini</a>
                </p>
            </form>
        </div>
    </body>
</html>