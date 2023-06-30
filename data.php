<?php
    $conn = mysqli_connect('localhost', 'root', '', 'uaspirdas');
    if (!$conn) {
        die('Could not connect to database: ' . mysqli_error());
    }
    $query = "SELECT * FROM data_gas";
    $result = mysqli_query($conn, $query);

    $data = array();
    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row;
    }
    echo json_encode($data);
?>