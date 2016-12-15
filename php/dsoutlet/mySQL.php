<?php
	
	date_default_timezone_set('America/Bahia');
    header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: Content-Type");
	header("Content-Type: application/json; charset=UTF-8");

	$hostname = "localhost";
	$username = "root";
	$password = "lucas123";
	$database = "dsoutlet";
	//conectando ao banco
	$con = mysqli_connect($hostname, $username, $password, $database) or die (mysqli_error());
?>