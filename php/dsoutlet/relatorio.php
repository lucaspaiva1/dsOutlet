<?php
	include 'mySQL.php';
	require 'mySQL.php';
	
?>

<?php
	
	$the_request = &$_POST;

	$postdata = file_get_contents("php://input");
	
	if (isset($postdata)){
		$request = json_decode($postdata);
		
		$tipo  = $request->tipo;
		$inicio  = $request->inicio;
		$fim  = $request->fim;
		
		$venda   = array();
		$estoque = array();
		
		if ($tipo == "3" & $inicio == "null" & $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente)";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		$dados = array();
		array_push($dados, $venda, $estoque);
		echo json_encode($dados);
	}
?>