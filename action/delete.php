<?php
// include database connection file
include_once("koneksi2.php");

// ambil id dari url untuk menghapus data
$id_barang = $_GET['id_barang'];
 
// hapus data berdasarkan id_barang
$result = mysqli_query($conn, "DELETE FROM barang WHERE id_barang='$id_barang'");
 
// redirect proses
header("Location:admin.php");
?>