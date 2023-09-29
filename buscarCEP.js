function maskTel() {
    const element = document.getElementById('tel');
    const maskOptions = {
        mask: '00000-0000'
    };
    const mask = IMask(element, maskOptions);
}

function maskCep() {
    const element = document.getElementById('cep');
    const maskOptions = {
        mask: '00000-000'
    };
    const mask = IMask(element, maskOptions);
}

document.addEventListener('DOMContentLoaded', function () {
    const mostrarSenhaCheckbox = document.getElementById('mostrarSenha');
    const senhaInput = document.getElementById('senha');

    mostrarSenhaCheckbox.addEventListener('change', () => {
        if (mostrarSenhaCheckbox.checked) {
            senhaInput.type = 'text';
        } else {
            senhaInput.type = 'password';
        }
    });
});


function limpa_formulário() {
    document.getElementById('uf').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('rua').value = ("");
}

function buscarCep() {
    var cep = document.getElementById('cep').value;
    cep = cep.replace(/\D/g, '');

    const apiUrl = 'https://viacep.com.br/ws/' + cep + '/json/';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('verifique o valor do CEP e tente novamente');
            }
            const retorno = response.json();
            console.log(retorno);
            return retorno;
        })

        .then(data => {
            document.getElementById('uf').value = data.uf;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('rua').value = data.logradouro;
            document.getElementById('ddd').value = data.ddd;
        })

        .catch(error => {
            limpa_formulário();
            alert(error);
        });
}

function complete$(){
    var freteValue = document.getElementById('freteValue');
    var totalToPay = document.getElementById('totalToPay');
    var cep = document.getElementById('cep').value;
    cep = cep.replace(/\D/g, '');

    const apiUrl = 'https://www.cepcerto.com/ws/json-frete/01153000/'+cep+'/1200/20/27/50';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('verifique o valor do CEP e tente novamente');
            }
            const retorno1 = response.json();
            console.log(retorno1);
            return retorno1;
        })

        .then(data => {
            freteValue.textContent += parseFloat(data.valorpac.replace(',','.'));
            totalToPay.textContent += (parseFloat(data.valorpac.replace(',','.')) + 399.99);
        })

        .catch(error => {
            limpa_formulário();
            alert(error);
        });
}


