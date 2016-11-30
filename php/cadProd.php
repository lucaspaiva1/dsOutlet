<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		$quantidade   = $request->quantidade;
		$marca  = $request->marca;
		$modelo  = $request->modelo;
		$tamanho  = $request->tamanho;
		$preocS = $request->precoVenda;
		$precoE = 0;
		
		$sql = "SELECT * FROM produto WHERE marca = '$marca' AND modelo = '$modelo' AND tamanho ='$tamanho'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
			if($numrow !== 1 && $marca != ""){
				$sql = "INSERT INTO produto (quantidade, marca, modelo, tamanho, presoS, precoE) VALUES
											('$quantidade', '$marca', '$modelo', '$tamanho', '$presoS', '$precoE')";
				con->query($sql);
				echo json_encode(true);
			}else{
				echo json_encode(false);
			}
	}
?>