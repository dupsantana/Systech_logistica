<?php
//ESSA CLASSE FAZ A CONEXÃO COM O BANCO DE DADOS SYSTECH
class ConnectionFactory{
    static $connection; // 

    public static function getConnection(){
        if(!isset($connection)){
            $port = 3306;         // porta do SGBD
            $dbName = "SYSTECH"; // Nome do banco de dados
            $userDb = "root";     // usuário do banco
            $host = "localhost";  // local de hospedagem do SGBD
            $pass = "";
            try{
                $connection = new PDO("mysql:host=$host;dbname=$dbName;port=$port",$userDb, $pass);
                echo "Conectado com sucesso!";
                return $connection;
            }catch(PDOException $ex){
                echo "Erro!! ".$ex->getMessage();
            }
        }
        return $connection;
    }
}

?>