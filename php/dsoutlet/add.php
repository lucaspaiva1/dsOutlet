<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id     	  = $request->id;
		$precoS	      = $request->precoSaidaPadrao;
		$quantidade   = $request->quantidade;
		$usuarioID    = $request->usuarioId;
		
		date_default_timezone_set('America/Sao_Paulo');
		$today = date('Y-m-d H:i:s');
		
		$sql = "SELECT * FROM produto WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$dados = $result->fetch_assoc();
			$amount = $dados['quantidade'];
			$amount = $amount + $quantidade;
			$sql = "UPDATE produto SET quantidade = '$amount', precoSaidaPadrao = '$precoS' WHERE id = '$id'";
			$con->query($sql);
			
			$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo) VALUES ('$today', '0', '$usuarioID', 'e')";
			$con->query($sql);
				
			$sql = "SELECT * FROM registro WHERE tempo = '$today' AND loja_id = '0' AND usuario_id = '$usuarioID' AND tipo = 'e'";
			$result = $con->query($sql);
			$dados  = $result->fetch_assoc();
			$regID = $dados['id'];
				
			$sql = "INSERT INTO registro_entrada (quantidade, produtoIDProduto, registro_id) VALUES ('$quantidade', '$id', '$regID')";
			$con->query($sql);
			
			echo json_encode(true);
		}
	}
?>