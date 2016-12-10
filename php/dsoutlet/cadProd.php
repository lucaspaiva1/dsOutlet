<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
		
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$marca 		= $request->marca;
		$modelo 	= $request->modelo;
		$tamanho  	= $request->tamanho;
		$quantidade = $request->quantidade;
		$precoE     = $request->precoEntrada;
		$precoS	    = $request->precoSaidaPadrao;
		$max	    = $request->maximo;
		$min	    = $request->minimo;
		$usuarioID  = $request->usuarioId;
		
		date_default_timezone_set('America/Sao_Paulo');
		$today = date('Y-m-d H:i:s');
		
		$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho = '$tamanho' AND precoEntrada = '$precoE'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1 && $marca != ""){
				$sql = "INSERT INTO produto (marca, modelo, tamanho, quantidade, precoEntrada, precoSaidaPadrao, maximo, minimo, dataUltimaCompra) VALUES ('$marca', '$modelo', '$tamanho', '$quantidade','$precoE', '$precoS', '$max', '$min', '$today')";
				$con->query($sql);
				
				$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho = '$tamanho' AND precoEntrada = '$precoE'";
				$result = $con->query($sql);
				$dados  = $result->fetch_assoc();
				$prodID = $dados['id'];
				
				$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo) VALUES ('$today', '0', '$usuarioID', 'e')";
				$con->query($sql);
				
				$sql = "SELECT * FROM registro WHERE tempo = '$today' AND loja_id = '0' AND usuario_id = '$usuarioID' AND tipo = 'e'";
				$result = $con->query($sql);
				$dados  = $result->fetch_assoc();
				$regID = $dados['id'];
				
				$sql = "INSERT INTO registro_entrada (quantidade, produtoIDProduto, registro_id) VALUES ('$quantidade', '$prodID', '$regID')";
				$con->query($sql);
				
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
	}
?>