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
		
		if ($tipo == "1" && $inicio == "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) ORDER BY v.id DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 'e' ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "2" && $inicio == "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) ORDER BY v.id DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 's' ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "3" && $inicio == "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) ORDER BY v.id DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "1" && $inicio != "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 'e' and r.tempo >= timestamp('$inicio','YYYY-MM-DD') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "1" && $inicio != "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 'e' and r.tempo >= timestamp('$inicio','YYYY-MM-DD') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "2" && $inicio != "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 's' and r.tempo >= timestamp('$inicio','YYYY-MM-DD') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "3" && $inicio != "null" && $fim == "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tempo >= timestamp('$inicio','YYYY-MM-DD') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "1" && $inicio == "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 'e' and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "2" && $inicio == "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 's' and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "3" && $inicio == "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "1" && $inicio != "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') and v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 'e' and r.tempo >= timestamp('$inicio','YYYY-MM-DD') and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "2" && $inicio != "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') and v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tipo = 's' and r.tempo >= timestamp('$inicio','YYYY-MM-DD') and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		else if ($tipo == "3" && $inicio != "null" && $fim != "null"){
			$sql = "SELECT v.dataVenda, v.tipoDePagamento, v.valor, u.nome usuario, c.nome cliente FROM venda v join usuario u on (u.id = v.usuario_IDUsuario) left join cliente c on (c.id = v.cliente_IDCliente) where v.dataVenda >= timestamp('$inicio','YYYY-MM-DD') and v.dataVenda <= timestamp('$fim','YYYY-MM-DD') ORDER BY v.dataVenda DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$venda[] = $row;
			}
			
			$sql = "SELECT r.tempo, r.tipo, r.quantidade, p.marca, p.modelo, p.tamanho, p.precoEntrada, u.nome usuario FROM registro r, usuario u, produto p where p.id = produto_id and u.id = usuario_id and r.tempo >= timestamp('$inicio','YYYY-MM-DD') and r.tempo <= timestamp('$fim 23:59:59','YYYY-MM-DD HH:MI:SS') ORDER BY r.tempo DESC";
			$result = $con->query($sql);
			
			while ($row=$result->fetch_assoc()){
				$estoque[] = $row;
			}
		}
		
		for ($i = 0; $i < count($estoque); $i++){
			if ($estoque[$i]['tipo'] == 'e')
				$estoque[$i]['tipo'] = "Entrada";
			else if ($estoque[$i]['tipo'] == 's')
				$estoque[$i]['tipo'] = "Saida";
		}
		
		$dados = array();
		array_push($dados, $venda, $estoque);
		echo json_encode($dados);
	}
?>