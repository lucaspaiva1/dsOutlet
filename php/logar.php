<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	$postdata = file_get_contents("php://input");
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$login = $request->login;
		$senha = $request->senha;
		
		$sql = "SELECT * FROM usuario WHERE login = '$login' AND senha = '$senha'";
		$result = $con->query($sql);
		
		$dados = $result->fetch_assoc();
		
		if ($dados != null){
			echo json_encode($dado);
		} else {
			echo json_encode(false);
		}
	}
?>