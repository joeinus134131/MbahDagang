<html>

<head>
    <title>Tambah data</title>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="   anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
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
        <br /><br />
        <form action="add.php" method="post" name="form1">
            <table class="table">
                <tr>
                    <td>ID Barang</td>
                    <td><input class="form-control" type="text" name="id_barang" placeholder="B3002"></td>
                </tr>
                <tr>
                    <td>Kategori</td>
                    <td><input class="form-control" type="text" name="categori"></td>
                </tr>
                <tr>
                    <td>Nama Barang</td>
                    <td><input class="form-control" type="text" name="nama_barang"></td>
                </tr>
                <tr>
                    <td>Harga</td>
                    <td><input class="form-control" type="text" name="harga"></td>
                </tr>
                <tr>
                    <td>Stok</td>
                    <td><input class="form-control" type="text" name="stok"></td>
                </tr>
                <tr>
                    <td>Supplier</td>
                    <td><input class="form-control" type="text" name="supplier"></td>
                </tr>
                <tr>
                    <td></td>
                    <td><input class="form-control" type="submit" name="Submit" value="Add"></td>
                </tr>
            </table>
        </form>

        <?php

        // cek form submitted dari data barang
        if (isset($_POST['Submit'])) {
            $id_barang = $_POST['id_barang'];
            $categori = $_POST['categori'];
            $nama_barang = $_POST['nama_barang'];
            $harga = $_POST['harga'];
            $stok = $_POST['stok'];
            $supplier = $_POST['supplier'];

            // masukan koneksi ke database
            include_once("koneksi.php");

            // cek apakah data inputnya valid
            echo ($id_barang);
            if ($id_barang == "") {
                // echo "Data tidak boleh kosong";
                echo "<script>alert('Data tidak boleh kosong')</script>";
            } else {
                // hasil Masukan data ke database
                $result = mysqli_query($conn, "INSERT INTO barang(id_barang, categori, nama_barang, harga, stok, supplier) VALUES('$id_barang','$categori','$nama_barang', '$harga','$stok','$supplier')");

                // Tampilkan pesan berhasil jika sudah masuk
                echo "Berhasil menambahkan data. <a href='admin.php'>Tampilkan data</a>";
            }
        }
        ?>
    </div>
</body>

</html>