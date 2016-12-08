<?php
	include 'mySQL.php';
	require 'mySQL.php';
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request  = json_decode($postdata);
		
		$idC = $request->idCliente;
		$idU = $request->idUser;
		$linha = $request->linhaDeItem;
		$divida = $request->divida;
		
		$valor = $divida->valor;
		
		date_default_timezone_set('America/Sao_Paulo');
		$today = date('Y-m-d H:i:s');
		
		if ($divida->tipoVenda == "4") {
			$tipo = "fiado";
			$sql = "INSERT INTO venda (valor, tipoDePagamento, usuario_IDUsuario, cliente_IDCliente, dataVenda) VALUES ('$valor', '$tipo', '$idU', '$idC', '$today')";
			$con->query($sql);
			
			$sql = "SELECT * FROM venda WHERE valor = '$valor' AND tipoDePagame'nto = '$tipo' AND usuario_IDUsuario = '$idU' AND cliente_IDCliente = '$idC' AND dataVenda = '$today'";
			$result = $con->query($sql);
			$dado  = $result->fetch_assoc();
			$idV = $dado['id'];
			
			foreach ($linha as $l){
				$idP = $l->idProduto;
				$qnt = $l->quantidade;
				$sql = "INSERT INTO linha_de_venda (produto_IDProduto, venda_IDVenda, quantidade) VALUES ('$idP', '$idV', '$qnt')";
				$con->query($sql);
			}
			
			$sql = "SELECT * FROM cliente WHERE id = '$idC'";
			$result = $con->query($sql);
			$dado = $result->fetch_assoc();
			$cpf = $dado['cpf'];
			
			$parcela = $divida->parcelasAPagar;
			$venc    = $divida->vencimento;
			
			$sql = "INSERT INTO divida (valor, parcelasAPagar, vencimento, cliente_IDCliente, cliente_CPF) VALUES ('$valor', '$parcela', '$venc', '$idC', '$cpf')";
			$con->query($sql);
			
			echo json_encode(true);
			
		} else {
			$tipo = "";
			if ($divida->tipoVenda == "1")
				$tipo = "dinheiro";
			else if ($divida->tipoVenda == "2")
				$tipo = "debito";
			else if ($divida->tipoVenda == "3")
				$tipo = "credito";
			else if ($divida->tipoVenda == "5")
				$tipo = "cheque";
			
			$sql = "INSERT INTO venda (valor, tipoDePagamento, usuario_IDUsuario, cliente_IDCliente, dataVenda) VALUES ('$valor', '$tipo', '$idU', '$idC', '$today')";
			$con->query($sql);
			
			$sql = "SELECT * FROM venda WHERE valor = '$valor' AND tipoDePagamento = '$tipo' AND usuario_IDUsuario = '$idU' AND cliente_IDCliente = '$idC' AND dataVenda = '$today'";
			$result = $con->query($sql);
			$dado  = $result->fetch_assoc();
			$idV = $dado['id'];
			
			foreach ($linha as $l){
				$idP = $l->idProduto;
				$qnt = $l->quantidade;
				$sql = "INSERT INTO linha_de_venda (produto_IDProduto, venda_IDVenda, quantidade) VALUES ('$idP', '$idV', '$qnt')";
				$con->query($sql);
			}
			
			echo json_encode(true);
		}
	}
?>