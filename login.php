<?php
    include_once("koneksi.php");

    echo("Login Berhasil");
?>
<html>
    <head>

    </head>
    <body>
        <form  name="login" method="get" action="login.php">
            <fieldset>
                <legend>Login Admin</legend>
                <tr> 
                    <td>Username</td>
                    <td><input type="text" name="username"></td>
                </tr>
                <tr> 
                    <td>Password</td>
                    <td><input type="text" name="password"></td>
                </tr>
                <tr>
                    <td><input type="submit" name="login" value="login"></td>
                </tr>
            </fieldset>
        </form>
    </body>
</html>