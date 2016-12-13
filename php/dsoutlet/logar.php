<?php
	include 'mySQL.php';
	require 'mySQL.php';
	
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$login = $request->login;
		$senha = $request->senha;
		
		$sql = "SELECT * FROM usuario WHERE login = '$login' AND senha = '$senha'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1){
				echo json_encode(false);
			}else{
				$dados = $result->fetch_assoc();
				$ativo = $dados['ativo'];
				
				if ($ativo == 0)
					echo json_encode($dados);
				else
					echo json_encode("desativo");
			}
	}
?>