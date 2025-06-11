const passwordIcons = document.querySelectorAll('.password-icon');

passwordIcons.forEach(icon => {
    icon.addEventListener('click', function(){
        const input = this.parentElement.querySelector('.form-control');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye');
    })
})

const toggleMenu = document.getElementById("toggleMenu");
const menu = document.querySelector(".menu_vertical")


toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("hidden");

    
});


//-----------------------------------------------------------------------------

//REGRAS DOS BOTÕES

//-------------BOTÃO DE LOGÍSTICA-------------//
const btn_logistica = document.getElementById('btn_logistica');

btn_logistica.addEventListener('click', () => {

    window.location.href = 'logistica.html';
});
//-------------------------------------------//


//-------------BOTÃO DE ORCAMENTO-------------//
const btn_orcamento = document.getElementById('btn_orcamento');

btn_orcamento.addEventListener('click', () => {

    window.location.href = 'orcamento.html';
});
//-------------------------------------------//


//-------------BOTÃO DE FUNCIONÁRIOS-------------//

const btn_funcionarios = document.getElementById('btn_funcionarios');

btn_funcionarios.addEventListener('click', () => {

    window.location.href = 'funcionarios.html';
});

//-------------------------------------------//

//-------------BOTÃO DE FUNCIONÁRIOS-------------//

const btn_config = document.getElementById('btn_config');

btn_config.addEventListener('click', () => {

    window.location.href = 'config.html';
});

//-------------------------------------------//

