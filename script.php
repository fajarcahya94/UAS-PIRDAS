<?php
// Inisialisasi variabel untuk koneksi dengan database MySQL
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "uaspirdas";

// Mendapatkan nilai sensorValue menggunakan metode GET pada HTTP
if (isset($_GET["sensorValue"])) {
  $sensorValue = $_GET["sensorValue"];

  // Cek koneksi
  $conn = new mysqli($servername, $username, $password, $dbname);
  if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
  }

  // SQL insert into untuk memasukkan data sensorValue
  $sql = "INSERT INTO data_gas (sensorvalue) VALUES ($sensorValue)";

  // Menjalankan SQL
  if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
  exit();
}
?>