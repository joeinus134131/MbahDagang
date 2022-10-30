<?php 
	$host = "localhost";
	$user = "root"; 
	$pass = ""; 
	$db   = "toko_indonesia";

	$conn = mysqli_connect($host, $user, $pass, $db);

	if(!$conn) die("error".mysqli_connect_errno());

	$query = mysqli_query($conn, "SELECT * FROM barang");
?>