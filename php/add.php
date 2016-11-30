<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		$id     = $request->id;
		$quantidade   = $request->quantidade;
		
		$sql = "SELECT * FROM produto WHERE id = '$id'";
		$result = $con->query($sql);
		
		$numrow = $result->num_rows;
		if($numrow !== 1){
			echo json_encode(false);
		}else{
			$dados = $result->assoc_fetch();
			$amount = $dados['quantidade'];
			$amount = $amount + $quantidade;
			$sql = "UPDATE usuario SET quantidade = '$amount' WHERE id = '$id'";
			$con->query($sql);
			echo json_encode(true);
		}
	}
?>