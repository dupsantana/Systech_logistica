<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>


<body>
    <?php

    $nome = $_POST["first_name"];
    $sobrenome = $_POST["last_name"];
    $birthdate = $_POST["birthdate"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmpassword = $_POST["confirm_password"];
    $gender = $_POST["gender"];

    if (empty($nome)) {
        $erros['first_name'] = "Nome é obrigatório";
    }

    if (empty($sobrenome)) {
        $erros['last_name'] = "Sobrenome é obrigatório";
    }

    echo "<p> É um prazer, $nome $sobrenome seu gênero é: $gender";



    ?>
</body>
</html>


