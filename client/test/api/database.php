<?php

session_start();
$user = $_SESSION['user'];

if($user == 'admin'){
    echo '{
        "message":"secret msg for admin",
        "success":true
    }';
} else {
    echo '{
        "message":"user not found",
        "success":false
    }';
}
?>