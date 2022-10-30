<?php 
	$host = "localhost";
	$user = "root"; //sesuai dengan username kalian 
	$pass = "";  //sesuai dengan password kalian
	$db   = "gaji"; //sesuai databse yang kalian buat

	$conn = mysqli_connect($host, $user, $pass, $db);

	if(!$conn) die("error".mysqli_connect_errno());

	$query = mysqli_query($conn, "SELECT * FROM arif_gaji");
	$cari  = $_POST['cari'];
    $data  = mysqli_query($conn, "SELECT * FROM arif_gaji WHERE nim LIKE '%$cari%' OR nama_pegawai LIKE '%$cari%' OR bln_gajian LIKE '%$cari%' OR total_gaji LIKE '%$cari%' ");
?>
