<?php
	$hostname = "localhost";
	$username = "root";
	$password = "lucas123";
	$database = "dsoutlet";
	//conectando ao banco
	$con = mysqli_connect($hostname, $username, $password, $database) or die (mysqli_error());
?>