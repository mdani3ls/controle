// Criando o objeto com as propriedades especificadas
let registroFinanceiro = {
    dinheiro_total: 0, // Substitua pelo valor desejado
    dinheiro_por_dia: 0, // Substitua pelo valor desejado
    data: 5, // Substitua pela data desejada
    qtd_dias: 0, // Substitua pela quantidade de dias desejada
    descricao: "Descrição do registro financeiro" // Substitua pela descrição desejada
};

// Nome da chave no localStorage
const key = 'registroFinanceiro';

const diaPadrao = 5;

// Selecionar os elementos pelo seu id
let tituloElement = document.getElementById("dinheiro");
let dinheiroPorDia = document.getElementById("porDia");
let qtd = document.getElementById("qtdDias");
let selectDia = document.getElementById('diaMes');
let btnSalvar = document.getElementById('salvarButton');

// Atualizar o conteúdo dos elementos com as propriedades do objeto
tituloElement.textContent = `Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total}`;
dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: ${registroFinanceiro.dinheiro_por_dia}`;
qtd.textContent = `Quantidade de dias até o próximo pagamento: ${calcularDiasAteProximoDia5(registroFinanceiro.data)}`;

// Deixar dia 5 como padrão
selectDia.value = diaPadrao.toString().padStart(2, '0');

// Gerar as opções dos dias do mês e deixar dia 5 como padrão
for (let dia = 1; dia <= 31; dia++) {
    let option = document.createElement('option');
    option.text = dia.toString().padStart(2, '0'); // Formato "01", "02", ..., "31"
    option.value = dia.toString().padStart(2, '0'); // O valor também pode ser o dia
    selectDia.add(option);
    if (dia === registroFinanceiro.data) {
        option.selected = true;
    }
}

// Adicionar um event listener para atualizar o texto do dinheiroPorDia com a data selecionada
selectDia.addEventListener('change', function() {
    let selectedIndex = this.selectedIndex;
    let selectedOption = this.options[selectedIndex];
    registroFinanceiro.data = parseInt(selectedOption.value);
    registroFinanceiro.qtd_dias = calcularDiasAteProximoDia5(registroFinanceiro.data); // Atualiza a propriedade data no objeto
    registroFinanceiro.dinheiro_por_dia = calcularValorQuePodeGastarPorDia(registroFinanceiro.dinheiro_total, registroFinanceiro.qtd_dias);
    dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: ${registroFinanceiro.dinheiro_por_dia}`;
    qtd.textContent = `Quantidade de dias até o próximo pagamento: ${registroFinanceiro.qtd_dias}`;
});

function calcularValorQuePodeGastarPorDia(valorTotal, quantidadeDias) {
    const x = parseFloat(valorTotal);
    const y = parseFloat(quantidadeDias);
    if (x === 0 || y === 0) {
        return 0;
    } else {
        const z = x / y;
        return z.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
}

function calcularDiasAteProximoDia5(diaEscolhido) {
    const hoje = new Date();
    const diaAtual = hoje.getDate();

    // Validar se o dia escolhido é um número válido entre 1 e 31
    diaEscolhido = parseInt(diaEscolhido);
    if (isNaN(diaEscolhido) || diaEscolhido < 1 || diaEscolhido > 31) {
        throw new Error('O dia escolhido deve ser um número entre 1 e 31.');
    }

    if (diaAtual < diaEscolhido) {
        return diaEscolhido - diaAtual;
    }

    const mesAtual = hoje.getMonth();
    const proximoMes = (mesAtual === 11) ? 0 : mesAtual + 1;
    const proximoAno = (mesAtual === 11) ? hoje.getFullYear() + 1 : hoje.getFullYear();
    const proximaData = new Date(proximoAno, proximoMes, diaEscolhido);
    const diferencaEmMilissegundos = proximaData - hoje;
    const diasAteProximoDia = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    
    return diasAteProximoDia;
}

btnSalvar.addEventListener("click", function() {
    const valorInput = document.getElementById("valorInput");
    const descricao = document.getElementById("descricaoOperacao").value;

    if (!valorInput.value || !descricao) {
        alert("Por favor, preencha todos os campos antes de salvar.");
        return;
    }
    
    const valorNumerico = valorInput.value.replace(/[^\d,]/g, '');
    const valor = parseFloat(valorNumerico.replace(',', '.'));

    if (isNaN(valor)) {
        alert('Por favor, insira um valor numérico válido.');
        return;
    }
    
    const userConfirmed = confirm(`Valor: R$ ${valorInput.value}\nDescrição: ${descricao}\n\nVocê tem certeza que deseja salvar os dados?`);

    if (userConfirmed) {
        registroFinanceiro.dinheiro_total += valor;
        registroFinanceiro.descricao = descricao;
        registroFinanceiro.qtd_dias = calcularDiasAteProximoDia5(registroFinanceiro.data);
        registroFinanceiro.dinheiro_por_dia = calcularValorQuePodeGastarPorDia(registroFinanceiro.dinheiro_total, registroFinanceiro.qtd_dias);

        tituloElement.textContent = `Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total.toFixed(2).replace('.', ',')}`;
        dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: ${registroFinanceiro.dinheiro_por_dia}`;
        qtd.textContent = `Quantidade de dias até o próximo pagamento: ${registroFinanceiro.qtd_dias}`;

        valorInput.value = "";
        document.getElementById("descricaoOperacao").value = "";

        alert("Dados salvos com sucesso...");
        salvarLocalStorage();
    } else {
        alert("Ação de salvamento cancelada...");
    }
});

function salvarLocalStorage() {
    localStorage.setItem(key, JSON.stringify(registroFinanceiro));
}

window.onload = function() {
    if (localStorage.getItem(key)) {
        registroFinanceiro = JSON.parse(localStorage.getItem(key));
        tituloElement.textContent = `Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total}`;
        dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: ${registroFinanceiro.dinheiro_por_dia}`;
        qtd.textContent = `Quantidade de dias até o próximo pagamento: ${registroFinanceiro.qtd_dias}`;
        selectDia.value = registroFinanceiro.data.toString().padStart(2, '0');
    } else {
        salvarLocalStorage();
    }
};
