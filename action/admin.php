<?php
// memanggil koneksi ke database
include_once("koneksi2.php");
 
// ambil semua data dari tabel barang
$result = mysqli_query($conn, 'SELECT * FROM barang');
?>
 
<html>
<head>    
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="style.css" >
    <link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
    

</head>
<header>
    <h1>Dashboard Admin Data</h1>
    <nav class="navbar navbar-expand-lg bg-light">
        <ul>
            <li class="nav-item"><a href="http://localhost/MbahDagang/index.php">Home</a></li>
            <li class="nav-item"><a href="#">Kontak</a></li>
            <li class="nav-item"><a href="#">Tentang</a></li>
            <li class="nav-item"><a href="#">Cari</a></li>
        </ul>
        
    </nav>
</header>
<body>
    <!-- Tombol tambah data -->
    <!-- <form action="add.php" method="get"> -->
        <button type="button" class="btn btn-outline-primary">Tambah Data</button>
    <!-- </form>     -->
    <table>
        <thead>
            <tr>
                <th>ID Barang</th> 
                <th>Kategori</th> 
                <th>Nama Barang</th> 
                <th>Harga</th>
                <th>Stok</th>
                <th>Supplier</th>
            </tr>
        </thead>
        <?php  
        while($row = mysqli_fetch_array($result)) {         
            echo "<tr>";
            echo "<td>".$row['id_barang']."</td>";
            echo "<td>".$row['categori']."</td>";
            echo "<td>".$row['nama_barang']."</td>";
            echo "<td>".$row['harga']."</td>"; 
            echo "<td>".$row['stok']."</td>";
            echo "<td>".$row['supplier']."</td>";      
            echo "<td><a href='edit.php?id_barang=$row[id_barang]'>Edit</a> | <a href='delete.php?id_barang=$row[id_barang]'>Delete</a></td></tr>";        
        }
        ?>
    </table>
    <a href="http://localhost/madeagusandigunawan/index.php">Halaman Depan</a>
</body>
</html>