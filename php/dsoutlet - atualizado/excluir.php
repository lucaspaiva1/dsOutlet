<?php
include 'mySQL.php';
require 'mySQL.php';
?>

<?php

$the_request = &$_POST;

$postdata = file_get_contents("php://input");

if (isset($postdata)){
	$idVenda  = json_decode($postdata);
	$itensExcluir = array();
	$excluidos = array();
	$sql = "SELECT * FROM linha_de_venda WHERE venda_IDVenda = '$idVenda'";
	$result = $con->query($sql);

	while($row=$result->fetch_assoc()){
		$idProduto = $row['produto_IDProduto'];
		$quantidadeVenda = $row['quantidade'];
		$sql = "SELECT * FROM produto WHERE id  = '$idProduto'";
		$resultItemAlterar = $con->query($sql);
		$resultItemAlterar = $resultItemAlterar->fetch_assoc();
		$novaQuantidade = $resultItemAlterar['quantidade'] + $quantidadeVenda;
		
		$sql = "SELECT * FROM venda WHERE id = '$idVenda'";
		$resultVenda = $con->query($sql);
		$rowV=$resultVenda->fetch_assoc();
		
		$sql = "SELECT * FROM registro WHERE produto_id='$idProduto' AND tipo = 's' AND quantidade='$quantidadeVenda'";
		$resultRegistos = $con->query($sql);

		while($rowR=$resultRegistos->fetch_assoc()){
			if( substr($rowR['tempo'], 0, -9) == $rowV['dataVenda']){
				$teste = true;
		
				foreach($excluidos as $atual){
					if($atual['produto_id'] == $rowR['produto_id']){
						$teste = false;
					}
				}
				if($teste){
					$excluidos[] = $rowR;
				}
			}

		}
		
		$sql = "UPDATE produto SET quantidade = '$novaQuantidade' WHERE id = '$idProduto'";
		$con->query($sql);
		
		$sql = "DELETE FROM linha_de_venda WHERE produto_IDProduto = '$idProduto' AND venda_IDVenda = '$idVenda'";
		$con->query($sql);
		
		$sql = "DELETE FROM venda WHERE id = '$idVenda'";
		$con->query($sql);
		
		foreach($excluidos as $atual){
			$idRegistroAtual = $atual['id'];
			$sql = "DELETE FROM registro WHERE id = '$idRegistroAtual'";
			$con->query($sql);
		}
		
	}
	echo json_encode(true);

}
?>