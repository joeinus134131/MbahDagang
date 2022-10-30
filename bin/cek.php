<?php
    include('koneksi.php');
    echo '<tr>
        <td>'.$row[id_barang'].'</td>
        <td>'.$row['categori'].'</td>
        <td>'.$row['nama_barang'].'</td>
        <td>'.$row['harga'].'</td>
        <td>'.$tow['stok'].'</td>
        <td>'.$row['supplier'].'</td>
        </tr>';
?>