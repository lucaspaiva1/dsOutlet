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
		
		$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho ='$tamanho'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1 && $marca != ""){
				$sql = "INSERT INTO produto (marca, modelo, tamanho, quantidade, precoEntrada, precoSaidaPadrao, maximo, minimo) VALUES ('$marca', '$modelo', '$tamanho', '$quantidade','$precoE', '$precoS', '$max', '$min')";
				$con->query($sql);
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
	}
?>