const passwordIcons = document.querySelectorAll('.password-icon');

passwordIcons.forEach(icon => {
    icon.addEventListener('click', function(){
        const input = this.parentElement.querySelector('.form-control');
        input.type = input.type === 'password' ? 'text' : 'password';
        this.classList.toggle('fa-eye');
    })
})

const toggleMenu = document.getElementById("toggleMenu");
const menu = document.querySelector(".menu_vertical");

toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

//-----------------------------------------------------------------------------
// REGRAS DOS BOTÕES DE NAVEGAÇÃO
const btn_logistica     = document.getElementById('btn_logistica');
const btn_orcamento     = document.getElementById('btn_orcamento');
const btn_funcionarios  = document.getElementById('btn_funcionarios');
const btn_config        = document.getElementById('btn_config');

btn_logistica.addEventListener('click', () => {
    window.location.href = 'logistica.html';
});
btn_orcamento.addEventListener('click', () => {
    window.location.href = 'orcamento.html';
});
btn_funcionarios.addEventListener('click', () => {
    window.location.href = 'funcionarios.html';
});
btn_config.addEventListener('click', () => {
    window.location.href = 'config.html';
});

//-----------------------------------------------------------------------------
// CONTROLE DE TABELAS E FORMULÁRIOS

const btn_estoque        = document.getElementById("btn_estoque");
const container_form     = document.querySelector(".container_form_pesquisa");
const tabela_estoque     = document.getElementById("tabela_estoque");

const btn_cadastro       = document.getElementById("btn_cadastro");
const tabela_cadastros   = document.getElementById("tabela_cadastros");
const container_cadastro = document.getElementById("container_form_cadastro");

const btn_saida          = document.getElementById("btn_saida");
const tabela_saidas      = document.getElementById("tabela_saidas");
const container_saida    = document.getElementById("container_form_saida");

const btn_registro       = document.getElementById("btn_registro");
const tabela_registros   = document.getElementById("tabela_registros");

let tabelaAberta = null;

// Fecha todas as tabelas e formulários abertos
function fecharTodasTabelas() {
    tabela_estoque.classList.remove("tabela-show");
    tabela_cadastros.classList.remove("tabela-show");
    tabela_saidas.classList.remove("tabela-show");
    tabela_registros.classList.remove("tabela-show");
    container_form.classList.remove("tabela-show");
    container_cadastro.classList.remove("tabela-show");
    container_saida.classList.remove("tabela-show");
    tabelaAberta = null;
}

// Remove a classe .active de todos os botões
function resetarBotoes() {
    btn_estoque.classList.remove("active");
    btn_cadastro.classList.remove("active");
    btn_saida.classList.remove("active");
    btn_registro.classList.remove("active");
}

// Botão ESTOQUE
btn_estoque.addEventListener("click", () => {
    if (tabelaAberta === "tabela_estoque") {
        fecharTodasTabelas();
    } else {
        fecharTodasTabelas();
        tabela_estoque.classList.add("tabela-show");
        container_form.classList.add("tabela-show");
        tabelaAberta = "tabela_estoque";
    }
    configurarPesquisa();
    resetarBotoes();
    if (tabelaAberta === "tabela_estoque") {
        btn_estoque.classList.add("active");
    }
});

// Botão CADASTROS
btn_cadastro.addEventListener("click", () => {
    if (tabelaAberta === "tabela_cadastros") {
        fecharTodasTabelas();
    } else {
        fecharTodasTabelas();
        tabela_cadastros.classList.add("tabela-show");
        container_cadastro.classList.add("tabela-show");
        tabelaAberta = "tabela_cadastros";
    }
    resetarBotoes();
    if (tabelaAberta === "tabela_cadastros") {
        btn_cadastro.classList.add("active");
    }
});

// Botão SAÍDA
btn_saida.addEventListener("click", () => {
    if (tabelaAberta === "tabela_saidas") {
        fecharTodasTabelas();
    } else {
        fecharTodasTabelas();
        tabela_saidas.classList.add("tabela-show");
        container_saida.classList.add("tabela-show");
        tabelaAberta = "tabela_saidas";
    }
    configurarPesquisa();
    resetarBotoes();
    if (tabelaAberta === "tabela_saidas") {
        btn_saida.classList.add("active");
    }
});

// Botão REGISTRO
btn_registro.addEventListener("click", () => {
    if (tabelaAberta === "tabela_registros") {
        fecharTodasTabelas();
    } else {
        fecharTodasTabelas();
        tabela_registros.classList.add("tabela-show");
        container_form.classList.add("tabela-show");
        tabelaAberta = "tabela_registros";
    }
    configurarPesquisa();
    resetarBotoes();
    if (tabelaAberta === "tabela_registros") {
        btn_registro.classList.add("active");
    }
});


//LÓGICA DA BARRA DE PESQUISA

function configurarPesquisa() {
    const campoPesquisa = document.querySelector('input[name="campo_pesquisa"]');
    
    if (!campoPesquisa) return;

    campoPesquisa.addEventListener('input', function() {
        const pesquisa = this.value.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        let tabelaAtiva = null;

        
        const tabelas = {
            estoque: document.getElementById('tabela_estoque'),
            cadastros: document.getElementById('tabela_cadastros'), // Nome corrigido
            saidas: document.getElementById('tabela_saidas'),
            registros: document.getElementById('tabela_registros')
        };

        for (const [key, tabela] of Object.entries(tabelas)) {
            //Verificar se tabela existe antes de acessar classList
            if(tabela && tabela.classList.contains('tabela-show')) {
                tabelaAtiva = tabela;
                break;
            }
        }

        if(!tabelaAtiva) return;

        const linhas = tabelaAtiva.querySelectorAll('tbody tr');

        linhas.forEach(linha => {
            // CORREÇÃO 3: Usar 'linha' (elemento atual) e não 'linhas' (NodeList)
            const textoLinha = linha.textContent.toLowerCase() // Método correto
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');

            // CORREÇÃO 4: Propriedade correta para alterar o display
            linha.style.display = textoLinha.includes(pesquisa) ? '' : 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', configurarPesquisa);


