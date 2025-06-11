    <?php

    $n = $_POST["first_name"];
    $sn = $_POST["last_name"];
    $btdt = $_POST["birthdate"];
    $email = $_POST["email"];
    $pass = $_POST["password"];
    $cpass = $_POST["confirm_password"];
    $gender = $_POST["gender"];

    if (empty($nome)) {
        $erros['first_name'] = "Nome é obrigatório";
    }

    if (empty($sobrenome)) {
        $erros['last_name'] = "Sobrenome é obrigatório";
    }

    echo "<p> É um prazer, $n $sn seu gênero é: $gender";



    ?>


