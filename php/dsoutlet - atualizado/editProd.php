<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$id         = $request->id;
		$marca 		= $request->marca;
		$modelo 	= $request->modelo;
		$tamanho  	= $request->tamanho;
		$quantidade = $request->quantidade;
		$precoE     = $request->precoEntrada;
		$precoS	    = $request->precoSaidaPadrao;
		$max	    = $request->maximo;
		$min	    = $request->minimo;
				
		$sql = "SELECT * FROM produto WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$sql = "UPDATE produto SET marca = '$marca', modelo = '$modelo', tamanho = '$tamanho', quantidade = '$quantidade', precoEntrada = '$precoE', precoSaidaPadrao = '$precoS', maximo = '$max', minimo = '$min' WHERE id = '$id'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>