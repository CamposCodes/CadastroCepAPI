// 'use strict';

let cep = document.querySelector('#cep');
let end = document.querySelector('#endereco');
let bairro = document.querySelector('#bairro');
let cidade = document.querySelector('#cidade');
let estado = document.querySelector('#estado');

const limpaForm = (endereco) => {
    document.querySelector('#endereco').value = '';
    document.querySelector('#bairro').value = '';
    document.querySelector('#cidade').value = '';
    document.querySelector('#estado').value = '';
}
const preencherForm = (endereco) =>{
    const endValue = end.value = endereco.logradouro;
    const bairroValue = bairro.value = endereco.bairro;
    const cidadeValue = cidade.value = endereco.localidade;
    const estadoValue = estado.value = endereco.uf;
}
const eNumero = (numero) => /^[0-9]+$/.test(numero); 
const cepValido = (cep) => cep.length == 8 && eNumero(cep);
// /^[0-9]+$ /.test(cep) = tem que iniciar com numero (^)-  casa com um num de 0 a 9 ([0-9]) - tem que terminar com numero {o mais permite 1 ou mias numeros}(+$) - verifica isso no cep (.test(cep)) 

const pesquisarCep = async() => {
    limpaForm();
    const cepDigitado = cep.value;
    const url = `http://viacep.com.br/ws/${cepDigitado}/json/`;
    // fetch(url).then(responde => responde.json()).then(console.log);
    if(cepValido(cepDigitado)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if(endereco.hasOwnProperty('erro')){
            end.value = 'CEP não encontrado!';
        }
        else{
            preencherForm(endereco);
        }
    }
    else{
        end.value = 'CEP incorreto!';
    }
}

cep.addEventListener('focusout', pesquisarCep);

let doneScreen = document.querySelector('.done');
let button = document.querySelector('#btn');

button.addEventListener('click', (endereco) =>{
    if(completo(endereco)){
        limpaAllForm();
        button.style.display = 'none';
        doneScreen.style.display = 'flex';
    }
    else{
        alert('Complete seu cadastro!');
    }
});

function completo (endereco){
    if( document.querySelector('#nome').value       != ''   &&
        document.querySelector('#email').value      != ''   &&
        document.querySelector('#cep').value        != ''   &&
        document.querySelector('#numero').value     != ''   &&
        document.querySelector('#endereco').value   != ''   &&
        document.querySelector('#bairro').value     != ''   &&
        document.querySelector('#cidade').value     != ''   &&
        document.querySelector('#estado').value     != ''   ){
            return true;
    }
    else{
        return false;
    }
}


function limpaAllForm(endereco){
    document.querySelector('#nome').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#cep').value = '';
    document.querySelector('#numero').value = '';
    limpaForm();
}

  

  
