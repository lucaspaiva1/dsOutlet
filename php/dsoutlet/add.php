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
		
		date_default_timezone_set('America/Bahia');
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
			
			$today = date('Y-m-d');
			$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) VALUES ('$today', '1', '$usuarioID', 'e', '$quantidade', '$id')";
			$con->query($sql);
			
			echo json_encode(true);
		}
	}
?>