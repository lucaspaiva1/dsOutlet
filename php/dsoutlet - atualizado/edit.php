<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id    	  = $request->id;
		$nome     = $request->nome;
		$email 	  = $request->email;
		$login 	  = $request->login;
		$senha    = $request->senha;
		$acesso   = $request->acesso;
		$admissao = $request->dataAdmissao;
		$telefone = $request->telefone;
		$ativo 	  = $request->ativo;
				
		$sql = "SELECT * FROM usuario WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			
			$sql = "SELECT * FROM usuario WHERE nome = '$nome'";
			$result = $con->query($sql);
			
			$isLogin = false;
			$isNome  = false;
			
			while ($row=$result->fetch_assoc()){
				if ($row['id'] != $id){
					$isNome = true;
				}
			}
			
			$sql = "SELECT * FROM usuario WHERE login = '$login'";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				if ($row['id'] != $id){
					$isLogin = true;
				}
			}
			
			if ($isLogin){
				echo json_encode("login");
			} else if ($isNome){
				echo json_encode("nome");
			} else {
				$sql = "UPDATE usuario SET nome = '$nome', email = '$email', login = '$login', senha = '$senha', acesso = '$acesso', dataAdmissao = '$admissao', telefone = '$telefone', ativo = '$ativo' WHERE id = '$id'";
				$con->query($sql);
				echo json_encode(true);
			}
		}
	}
?>