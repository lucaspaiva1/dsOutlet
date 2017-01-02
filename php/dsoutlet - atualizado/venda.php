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
		
		date_default_timezone_set('America/Bahia');
		$today = date('Y-m-d');
		$hora  = date('H:i:s');
		if ($divida->tipoVenda == "4") {
			$tipo = "fiado";
			$sql = "INSERT INTO venda (valor, tipoDePagamento, usuario_IDUsuario, cliente_IDCliente, dataVenda, horaVenda) VALUES ('$valor', '$tipo', '$idU', '$idC', '$today', '$hora')";
			$con->query($sql);
			
			$sql = "SELECT * FROM venda WHERE valor = '$valor' AND tipoDePagamento = '$tipo' AND usuario_IDUsuario = '$idU' AND cliente_IDCliente = '$idC' AND dataVenda = '$today' AND horaVenda = '$hora'";
			$result = $con->query($sql);
			$dado  = $result->fetch_assoc();
			$idV = $dado['id'];
			
			foreach ($linha as $l){
				$idP = $l->idProduto;
				$qnt = $l->quantidade;
				$sql = "INSERT INTO linha_de_venda (produto_IDProduto, venda_IDVenda, quantidade) VALUES ('$idP', '$idV', '$qnt')";
				$con->query($sql);
				
				$sql = "SELECT * FROM produto WHERE id = '$idP'";
				$result = $con->query($sql);
				$dados  = $result->fetch_assoc();
				$amount = $dados['quantidade'];
				$amount = $amount - $qnt;
				
				$sql = "UPDATE produto SET quantidade = '$amount' WHERE id = '$idP'";
				$con->query($sql);
				
				$hoje = date('Y-m-d H:i:s');
				$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) VALUES ('$hoje', '1', '$idU', 's', '$qnt', '$idP')";
				$con->query($sql);
			}
			
			$parcela = $divida->parcelasAPagar;
			$venc    = $divida->vencimento;
			
			$sql = "INSERT INTO divida (valor, parcelasAPagar, vencimento, cliente_IDCliente, dataCompra) VALUES ('$valor', '$parcela', '$venc', '$idC', '$today')";
			$con->query($sql);
			
			echo json_encode($idV);
			
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
			
			$sql = "INSERT INTO venda (valor, tipoDePagamento, usuario_IDUsuario, dataVenda, horaVenda) VALUES ('$valor', '$tipo', '$idU', '$today', '$hora')";
			$con->query($sql);
			
			$sql = "SELECT * FROM venda WHERE valor = '$valor' AND tipoDePagamento = '$tipo' AND usuario_IDUsuario = '$idU' AND dataVenda = '$today' AND horaVenda = '$hora'";
			$result = $con->query($sql);
			$dado  = $result->fetch_assoc();
			$idV = $dado['id'];
			
			foreach ($linha as $l){
				$idP = $l->idProduto;
				$qnt = $l->quantidade;
				$sql = "INSERT INTO linha_de_venda (produto_IDProduto, venda_IDVenda, quantidade) VALUES ('$idP', '$idV', '$qnt')";
				$con->query($sql);
				
				$sql = "SELECT * FROM produto WHERE id = '$idP'";
				$result = $con->query($sql);
				$dados  = $result->fetch_assoc();
				$amount = $dados['quantidade'];
				$amount = $amount - $qnt;
				
				$sql = "UPDATE produto SET quantidade = '$amount' WHERE id = '$idP'";
				$con->query($sql);
				
				$hoje = date('Y-m-d H:i:s');
				$sql = "INSERT INTO registro (tempo, loja_id, usuario_id, tipo, quantidade, produto_id) VALUES ('$today', '1', '$idU', 's', '$qnt', '$idP')";
				$con->query($sql);
			}
			$vetor   = array();
			$sql = "SELECT * FROM produto WHERE ativo = '0' ORDER BY marca ASC";
			$result = $con->query($sql);
			while($row=$result->fetch_assoc()){
				$maxx   = $row['maximo'];
				$minn   = $row['minimo'];
				$qnt    = $row['quantidade'];
				$estado = "";
				
				if ($qnt <= $minn){
					$estado = "Falta";
				} else if ($qnt > $maxx){
					$estado = "excesso";
				} else {
					$estado = "certo";
				}
				
				$row['estado'] = $estado;
				$vetor[] = $row;
				}
				$resposta = array();
				$resposta[] = $idV;
				$resposta[] = $vetor;
			
			echo json_encode($resposta);
		}
	}
?>