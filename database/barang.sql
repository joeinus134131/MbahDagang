-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 02 Nov 2022 pada 21.01
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toko_indonesia`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `barang`
--

CREATE TABLE `barang` (
  `id_barang` varchar(11) NOT NULL,
  `categori` text NOT NULL,
  `nama_barang` varchar(30) NOT NULL,
  `harga` int(10) NOT NULL,
  `stok` int(11) NOT NULL,
  `supplier` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `barang`
--

INSERT INTO `barang` (`id_barang`, `categori`, `nama_barang`, `harga`, `stok`, `supplier`) VALUES
('BR1001', 'Makanan', 'Keripik', 25000, 65, 'PD'),
('BR1002', 'Makanan', 'Keripik', 15000, 60, 'PD'),
('BR1003', 'Makanan', 'Keripik pisang', 40000, 25, 'PD'),
('BR2001', 'Kosmetik', 'Sabun', 10000, 40, 'Herborist'),
('BR2002', 'Kosmetik', 'Masker', 17000, 40, 'Herborist'),
('BR2003', 'Kosmetik', 'Lulur', 30000, 25, 'Herborist'),
('BR3001', 'Aksesoris', 'Jam', 320000, 15, 'Indocraft'),
('BR3002', 'Aksesoris', 'Jam', 270000, 20, 'Indocraft'),
('BR3003', 'Aksesoris', 'Kalung Etnik', 175000, 10, 'Indocraft'),
('BR3004', 'Aksesoris', 'Kalung', 155000, 12, 'Onecraft'),
('BR3005', 'Aksesoris', 'Kalung Batu Akik', 200000, 20, 'Onecraft'),
('BR3008', 'Mainan', 'Mobilan', 50000, 20, 'Hotwells'),
('BR4001', 'Sayuran', 'Terong Ungu', 5000, 40, 'Tanihub'),
('BR4002', 'Sayuran', 'Sledri', 50000, 65, 'Tanihub'),
('BR4005', 'Buah', 'Apel Manalagi', 18000, 140, 'MbahTani'),
('BR4003', 'Mainan', 'Exavator', 10000, 12, 'ChiaTown');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
