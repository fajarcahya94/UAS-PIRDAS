<?php
    $conn = mysqli_connect('localhost', 'root', '', 'uaspirdas');
    if (!$conn) {
        die('Could not connect to database: ' . mysqli_error());
    }
    $query = "DELETE FROM data_gas";
    $result = mysqli_query($conn, $query);

    header("Location: http://192.168.43.77/proguas/index.html");
?>