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

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Fungsi Cari</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

	<!-- Optional theme -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<h2 class="text-info">Fungsi Search</h2>
				<form action="" method="post">	
					<input class="form-control" type="text" placeholder="cari disini .." name="cari"> <br>
					<input class="form-control" type="submit" name="ss" value="Cari"> <br>
				</form>
				<div class="table-responsive">
					<table class="table table-hover ">
						<tr>
							<th>No</th>
							<th>Nim</th>
							<th>Nama Pegawai</th>
							<th>Bulan Gajian</th>
							<th>Total Gaji</th>
						</tr>
						<?php $no=1; ?>
						<?php if(mysqli_num_rows($data)>0){ ?>
						<?php while($row=mysqli_fetch_array($data)){ ?>
						<tr>
							<td><?php echo $no++ ?></td>
							<td><?php echo $row['nim'] ?></td>
							<td><?php echo $row['nama_pegawai'] ?></td>
							<td><?php echo $row['bln_gajian'] ?></td>
							<td><?php echo $row['total_gaji'] ?></td>
						<?php } ?>
						<?php }else{ ?>
						<tr>
							<td colspan="5"><h3 class="text-danger text-center">Data Kosong</h3></td>
						</tr>
						<?php } ?>
						</tr>	
					</table>
				</div>
			</div>	
			<div class="col-md-2"></div>	
		</div>
	</div> 
</body>
</html>