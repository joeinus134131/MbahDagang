<?php
    include_once("koneksi.php");
    error_reporting(0);
 
    session_start();
 
    if (isset($_SESSION['username'])) {
        header("Location: admin.php");
    }
    
    if (isset($_POST['submit'])) {
        $email = $_POST['email'];
        $password = md5($_POST['password']);
    
        $sql = "SELECT * FROM user WHERE email='$username' AND password='$password'";
        $result = mysqli_query($conn, $sql);
        if ($result->num_rows > 0) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION['username'] = $row['username'];
            header("Location: admin.php");
        } else {
            echo "<script>alert('Email atau password Anda salah. Silahkan coba lagi!')</script>";
        }
    }
?>
<html>
    <head>
        <link rel="stylesheet" href="action/style.css" >
        <link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <header>
        <nav>
            <ul>
                <li><a href="http://localhost/MbahDagang/index.php">Home</a></li>
                <li><a href="#">Kontak</a></li>
                <li><a href="#">Tentang</a></li>
                <li><a href="#">Cari</a></li>
            </ul> 
        </nav>
    </header>
    <body>
        <!-- <form  name="login" method="get" action="login.php">
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
        </form> -->
            <div>
            <div class="row">
            <!-- left column -->
            <div class="col-md-12">
                <!-- jquery validation -->
                <div class="card card-primary">
                <div class="card-header">
                    <h3 class="card-title">Login <small> Validasi Admin</small></h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form id="quickForm">
                    <div class="card-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="email" name="email" class="form-control" id="exampleInputEmail1" value="<?php echo $email; ?>" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" name="password" class="form-control" id="exampleInputPassword1"  value="<?php echo $_POST['password']; ?>" placeholder="Password">
                    </div>
                    <div class="form-group mb-0">
                        <div class="custom-control custom-checkbox">
                        <input type="checkbox" name="terms" class="custom-control-input" id="exampleCheck1">
                        <label class="custom-control-label" for="exampleCheck1">I agree to the <a href="#">terms of service</a>.</label>
                        </div>
                    </div>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
                </div>
                <!-- /.card -->
                </div>
            <!--/.col (left) -->
            <!-- right column -->
            <div class="col-md-6">

            </div>
            <!--/.col (right) -->
            </div>
            <!-- /.row -->
        </div><!-- /.container-fluid -->
        <script>
            $(function () {
            $.validator.setDefaults({
                submitHandler: function () {
                alert( "Form successful submitted!" );
                }
            });
            $('#quickForm').validate({
                rules: {
                email: {
                    required: true,
                    email: true,
                },
                password: {
                    required: true,
                    minlength: 5
                },
                terms: {
                    required: true
                },
                },
                messages: {
                email: {
                    required: "Please enter a email address",
                    email: "Please enter a valid email address"
                },
                password: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                terms: "Please accept our terms"
                },
                errorElement: 'span',
                errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
                },
                highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
                },
                unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
                }
            });
            });
        </script>
    </body>
</html>