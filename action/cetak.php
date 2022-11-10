<!DOCTYPE html>
<head>
    <link rel="stylesheet" href="style.css" >
    <link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> 
</head>
<body>
<header>
        <nav>
            <ul>
                <li><a href="http://localhost/MbahDagang/index.php">Home</a></li>
                <li><a href="#">Kontak</a></li>
                <li><a href="#">Tentang</a></li>
                <li><a href="#">Cari</a></li>
            </ul> s
        </nav>
</header>
<div>
    <?php 
		include 'koneksi2.php';
        $data  = mysqli_query($conn, "SELECT * FROM barang");  
	?>
    <table>
		<thead>
			<tr>
				<th>ID Barang</th>
				<th>Kategori</th>
				<th>Nama Barang</th>
				<th>Harga</th>
				<th>Stock</th>
				<th>Supplier</th>
			</tr>
		</thead>
		<?php if(mysqli_num_rows($data)>0){ ?>
		<?php while($row=mysqli_fetch_array($data)){ ?>
		<tr>
			<td><?php echo $row['id_barang'] ?></td>
			<td><?php echo $row['categori'] ?></td>
			<td><?php echo $row['nama_barang'] ?></td>
			<td><?php echo $row['harga'] ?></td>
			<td><?php echo $row['stok'] ?></td>
            <td><?php echo $row['supplier'] ?></td>
		<?php } ?>
		<?php }else{ ?>
		<tr>
			<td colspan="6"><h3 class="text-danger text-center">Data Tidak Ditemukan</h3></td>
		</tr>
		<?php } ?>	
	</table>
</div>
<script>
    window.print();
</script>
</body>
<html>