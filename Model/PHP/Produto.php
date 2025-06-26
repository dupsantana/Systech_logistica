<?php
class Produto{

private $nome;
private $marca;
private $quantidade;
private $alerta;


public function getNome(){
    return $this->nome;
}

public function setNome($nome){
    $this->nome = $nome;
}

public function getMarca(){
    return $this->marca;
}

public function setMarca($marca){
    $this->setMarca = $marca;
}

public function getQuantidade(){
    return $this->quantidade;
}

public function setQuantidade($quantidade){
    $this->setQuantidade = $quantidade;
}


}



?>

