<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request          = json_decode($postdata);
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

		$sql = "INSERT INTO endereco (cep, logradouro, numero, uf, cidade) VALUES ('$cep', '$logradouro', '$numero', '$uf', '$cidade')";
		$con->query($sql);
		$sql = "SELECT * FROM endereco WHERE cep = '$cep' AND logradouro = '$logradouro' AND numero = '$numero' AND uf ='$uf'AND cidade = '$cidade'";
		$result = $con->query($sql);
		$dado = $result->fetch_assoc();
		$id = $dado['id'];
		
		$sql = "SELECT * FROM cliente WHERE cpf = '$cpf'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		
		if ($numrow !== 1 && $nome != ""){
			$sql = "INSERT INTO cliente (cpf, nome, nascimento, email, enderecoIDEndereco, telefone) VALUES ('$cpf', '$nome', '$nascimento', '$email', '$id', '$telefone')";
			$con->query($sql);
			echo json_encode(true);
		} else {
			echo json_encode(false);
		}
	}
?>