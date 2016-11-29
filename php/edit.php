<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		$id     = $request->id;
		$nome   = $request->nome;
		$email  = $request->email;
		$login  = $request->login;
		$senha  = $request->senha;
		$acesso = $request->admin;
		
		if ($acesso)
			$acesso = 'A';
		else
			$acesso = 'C';
		
		$sql = "SELECT * FROM usuario WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "UPDATE usuario SET nome = '$nome', email = '$email', login = '$login', senha = '$senha', acesso = '$acesso' WHERE id = '$id'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>