<?php
// include database connection file
include_once("koneksi2.php");
 
// update data
if(isset($_POST['update']))
{	
    $id_barang = $_POST['id_barang'];
    $categori = $_POST['categori'];
    $nama_barang = $_POST['nama_barang'];
    $harga = $_POST['harga'];
    $stok = $_POST['stok'];
    $supplier = $_POST['supplier'];
        
    // update data barang
    $result = mysqli_query($conn, "UPDATE barang SET id_barang='$id_barang', categori='$categori',nama_barang='$nama_barang',harga='$harga',stok='$stok',supplier='$supplier' WHERE id_barang='$id_barang'");
    // mengalihkan ke homepade
    header("Location: admin.php");
}
?>
<?php
// pilih data berdasarkan id barang
$id_barang = $_GET['id_barang'];
 
// menampilkan data berdasarkan dari id barang
$result = mysqli_query($conn, "SELECT * FROM barang WHERE id_barang='$id_barang'");
 
while($row = mysqli_fetch_array($result))
{
    $id_barang = $row['id_barang'];
    $categori = $row['categori'];
    $nama_barang = $row['nama_barang'];
    $harga = $row['harga'];
    $stok = $row['stok'];
    $supplier = $row['supplier'];
}
?>
<html>
<head>	
    <title>Edit Data Barang</title>
    <link rel = "stylesheet" href="style2.css">
    <link rel="stylesheet" href="node_modules\bootstrap\dist\css\bootstrap.min.css">
</head>
 
<body>
    <a href="admin.php">Home</a>
    <br/><br/>
    
    <form name="update_user" method="post" action="edit.php">
        <table>
            <tr> 
                <td>ID Barang</td>
                <td><input type="text" name="id_barang" value=<?php echo $id_barang;?>></td>
            </tr>
            <tr> 
                <td>Kategori</td>
                <td><input type="text" name="categori" value=<?php echo $categori;?>></td>
            </tr>
            <tr> 
                <td>Nama Barang</td>
                <td><input type="text" name="nama_barang" value=<?php echo $nama_barang;?>></td>
            </tr>
            <tr> 
                <td>Harga</td>
                <td><input type="text" name="harga" value=<?php echo $harga;?>></td>
            </tr>
            <tr> 
                <td>Stok</td>
                <td><input type="text" name="stok" value=<?php echo $stok;?>></td>
            </tr>
            <tr> 
                <td>Supplier</td>
                <td><input type="text" name="supplier" value=<?php echo $supplier;?>></td>
            </tr>
            <tr>
                <td><input type="hidden" name="id_barang" value=<?php echo $_GET['id_barang'];?>></td>
                <td><input type="submit" name="update" value="Update"></td>
            </tr>
        </table>
    </form>
</body>
</html>