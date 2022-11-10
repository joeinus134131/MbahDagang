<!DOCTYPE html>
<head>
	<link rel="stylesheet" href="action/style.css" >
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
			</ul> 
		</nav>
	</header>
	<div>
		<div>
			<div>
				<h2 class="text-info">Pencarian berdasarkan Nama Barang</h2>
				<form action="" method="POST">	
					<input class="form-control" name="cari" id="cari" type="text" placeholder="cari nama barang .." > <br>
					<input class="form-control" type="submit" value="Cari"> <br>
				</form>
				<?php 
					include 'koneksi.php';  
				?>
				<?php 	
					if(isset($_POST['cari'])){
						$cari  = $_POST['cari'];
						$data  = mysqli_query($conn, "SELECT * FROM barang WHERE nama_barang LIKE '%$cari%'");
						$jumlah = mysqli_query($conn, "SELECT COUNT(*) FROM barang WHERE nama_barang LIKE '%$cari%'");
						$jumlah = mysqli_fetch_array($jumlah);
						echo "<h3 class='text-info'>Hasil pencarian : ".$jumlah[0]."</h3>";
					}else{
						$data  = mysqli_query($conn, "SELECT * FROM barang");
						$jumlah = mysqli_query($conn, "SELECT COUNT(*) FROM barang");
					}
				?>
				<form action="add.php" method="get">
					<button onclick="location.href= 'login.php';" id="myButton" type="button" class="btn btn-primary">Masuk Admin</button>
				</form>
				<tr> </tr>
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
				<div class='tengah'>
					<a target="_blank" href="action/cetak.php">Cetak PDF</a>
				</div>
			</div>
		</div>
	</div>
</body>
</html>