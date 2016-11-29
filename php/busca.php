<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php 
	$vetor = array();
	if ($_SERVER['REQUEST_METHOD']) == 'GET'){
		if (isset($_GET["id"])){
			if ($_GET["id"] == ""){
				$sql = "SELECT * FROM usuario";
				$result = $con->query($sql);
				while($row=$result->fetch_assoc()){
					$vetor[] = $row;
				}
				echo json_encode($vetor);
			}
		}
	}
?>