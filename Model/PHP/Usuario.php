<?php

class Usuario{

    private String $nome;

    private String $sobrenome;
    private String $birthdate;

    private String $email;

    private String $password;

    private String $confirmpassword;

    private String $gender;



    



    
    public function getNome()
    {
        return $this->nome;
    }


    public function setNome($nome)
    {
        $this->nome = $nome;

        return $this;
    }

 
    public function getSobrenome()
    {
        return $this->sobrenome;
    }

    public function setSobrenome($sobrenome)
    {
        $this->sobrenome = $sobrenome;

        return $this;
    }

 
    public function getBirthdate()
    {
        return $this->birthdate;
    }

  
    public function setBirthdate($birthdate)
    {
        $this->birthdate = $birthdate;

        return $this;
    }

  
    public function getEmail()
    {
        return $this->email;
    }

  
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

   
    public function getPassword()
    {
        return $this->password;
    }

   
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

   
    public function getConfirmpassword()
    {
        return $this->confirmpassword;
    }

   
    public function setConfirmpassword($confirmpassword)
    {
        $this->confirmpassword = $confirmpassword;

        return $this;
    }

   
    public function getGender()
    {
        return $this->gender;
    }

  
    public function setGender($gender)
    {
        $this->gender = $gender;

        return $this;
    }
}

?>