<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request          = json_decode($postdata);
		$id               = $request->id;
		$nome             = $request->nome;
		$cpf	          = $request->cpf;
		$nascimento 	  = $request->nascimento;
		$email 	          = $request->email;
		$telefone	      = $request->telefone;
		$endereco         = $request->endereco;
		
		$cep              = $endereco->cep;
		$logradouro       = $endereco->logradouro;
		$numero           = $endereco->numero;
		$uf               = $endereco->uf;
		$cidade           = $endereco->cidade;
				
		$sql = "SELECT * FROM cliente WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$dados = $result->fetch_assoc();
			$endID = $dados['enderecoIDEndereco'];
			$sql    = "SELECT * FROM cliente WHERE cpf = '$cpf'";
			$result = $con->query($sql);
			$qnt = $result->num_rows;
			if ($qnt !== 1){
				$sql = "UPDATE endereco SET cep = '$cep', logradouro = '$logradouro', numero = '$numero', uf = '$uf', cidade = '$cidade' WHERE id = '$endID'";
				$con->query($sql);
				$sql = "UPDATE cliente SET nome = '$nome', cpf = '$cpf', nascimento = '$nascimento', email = '$email', telefone = '$telefone' WHERE id = '$id'";
				$con->query($sql);
				echo json_encode(true);
			} else {
				$dados = $result->fetch_assoc();
				if ($dados['id'] == $id){
					$sql = "UPDATE endereco SET cep = '$cep', logradouro = '$logradouro', numero = '$numero', uf = '$uf', cidade = '$cidade' WHERE id = '$endID'";
					$con->query($sql);
					$sql = "UPDATE cliente SET nome = '$nome', cpf = '$cpf', nascimento = '$nascimento', email = '$email', telefone = '$telefone' WHERE id = '$id'";
					$con->query($sql);
					echo json_encode(true);
				} else{
					echo json_encode(false);
				}
			}
		}
	}
?>