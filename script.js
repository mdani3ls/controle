    // Criando o objeto com as propriedades especificadas
    let registroFinanceiro = {
        dinheiro_total: 0, // Substitua pelo valor desejado
        dinheiro_por_dia: 0 , // Substitua pelo valor desejado
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
    tituloElement.textContent =  ` Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total}`;
    dinheiroPorDia.textContent += `${registroFinanceiro.data}: ${(registroFinanceiro.qtd_dias)}`;
    qtd.textContent += ` ${calcularDiasAteProximoDia5(registroFinanceiro.data)}`;


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

            // Seleciona o dia 5 por padrão
        }
    }
    //FOCAR NESSE ERRO
    
    // Adicionar um event listener para atualizar o texto do dinheiroPorDia com a data selecionada
selectDia.addEventListener('change', function() {
    let selectedIndex = this.selectedIndex;
    let selectedOption = this.options[selectedIndex];
    registroFinanceiro.data = parseInt(selectedOption.value);
    registroFinanceiro.qtd_dias = calcularDiasAteProximoDia5(registroFinanceiro.data); // Atualiza a propriedade data no objeto
    registroFinanceiro.dinheiro_por_dia =  calcularValorQuePodeGastarPorDia(registroFinanceiro.dinheiro_total, registroFinanceiro.qtd_dias);
    dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: 
    ${registroFinanceiro.dinheiro_por_dia.toString().padStart(2, '0')}`;
    qtd.textContent = `Quantidade de dias até o próximo pagamento:  ${registroFinanceiro.qtd_dias}`;
});

function calcularValorQuePodeGastarPorDia(valorTotal, quantidadeDias){
    const x = parseFloat(valorTotal);
    const y = parseFloat(quantidadeDias);
    console.log(`valor de x: ${x} , valor de y : ${y}`);
    if (x == 0 || y == 0) {
        return 0;
    } else {
        const z = x / y;
    //     registroFinanceiro.dinheiro_por_dia = z;
    //     console.log(`z: ${z}`);
    //     dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.dinheiro_por_dia}: 
    // ${registroFinanceiro.dinheiro_por_dia}`;
    // console.log(`Dinheiro que está gastando por dia será dentro da função: ${registroFinanceiro.dinheiro_por_dia}`);
        return z.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
    }
}

    //quantidade de dias ate o próximo mes
    function calcularDiasAteProximoDia5(diaEscolhido) {
        // Obter a data atual
        const hoje = new Date();
        const dia_de_hoje = parseInt(hoje.getDay());

        // Validar se o dia escolhido é um número válido entre 1 e 31
        diaEscolhido = parseInt(diaEscolhido);
        if (isNaN(diaEscolhido) || diaEscolhido < 1 || diaEscolhido > 31) {
            throw new Error('O dia escolhido deve ser um número entre 1 e 31.');
        }
        
        if (dia_de_hoje < diaEscolhido){
            let x = diaEscolhido-dia_de_hoje; 
            registroFinanceiro.qtd_dias = x;
            return x;
        }
        // Obter o mês atual e o próximo mês
        const mesAtual = hoje.getMonth();
        const proximoMes = (mesAtual === 11) ? 0 : mesAtual + 1; // Janeiro é 0 em JavaScript
    
        // Determinar o ano do próximo mês
        const proximoAno = (mesAtual === 11) ? hoje.getFullYear() + 1 : hoje.getFullYear();
    
        // Criar uma data para o dia escolhido do próximo mês
        const proximaData = new Date(proximoAno, proximoMes, diaEscolhido);
    
        // Calcular a diferença em milissegundos entre as datas
        const diferencaEmMilissegundos = proximaData - hoje;
    
        // Calcular o número de dias
        const diasAteProximoDia = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
        
        return diasAteProximoDia;
    }
    
    // Exemplo de uso:
    const diaEscolhido = 15; // Aqui você pode usar o dia escolhido pelo usuário
    const diasAteProximoDia = calcularDiasAteProximoDia5(diaEscolhido);
    console.log(`Dias até o dia ${diaEscolhido} do próximo mês: ${diasAteProximoDia}`);
    
    
   
        //formatar valor
    function formatarValor(input) {
        // Remove tudo que não for dígito
        let valor = input.value.replace(/\D/g, '');

        // Formata como moeda brasileira
        valor = (valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Atualiza o valor no campo de entrada
        input.value = valor;
    }
    // //formatar valor
    // function formatarValor(input) {
    //     // Remove tudo que não for dígito
    //     let valor = input.value.replace(/\D/g, '');

    //     // Formata como moeda brasileira
    //     valor = (valor/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    //     // Atualiza o valor no campo de entrada
    //     input.value = valor;
    // }
    btnSalvar.addEventListener("click", function() {
        // Obter os valores dos campos input e textarea
        const valorInput = document.getElementById("valorInput");
        const descricao = document.getElementById("descricaoOperacao").value;
    
        // Verificar se os campos estão vazios ou nulos
        if (!valorInput.value || !descricao) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return; // Sair da função se algum campo estiver vazio
        }
        
        // Remover caracteres não numéricos do valor
        const valorNumerico = valorInput.value.replace(/[^\d,]/g, ''); // Remove tudo exceto dígitos e vírgula
    
        // Tentar converter o valor para float
        const valor = parseFloat(valorNumerico.replace(',', '.')); // Substitui vírgula por ponto para formatos brasileiros
        
        // Verificar o valor obtido antes de prosseguir
        console.log('Valor obtido:', valor);
        
        // Verificar se o valor é numérico válido
        if (isNaN(valor)) {
            alert('Por favor, insira um valor numérico válido.');
            return;
        }
        
        // Exibir a caixa de diálogo de confirmação padrão do navegador
        const userConfirmed = confirm(`Valor: R$ ${valorInput.value}\nDescrição: ${descricao}\n\nVocê tem certeza que deseja salvar os dados?`);
        
        // Verificar se o usuário confirmou
        if (userConfirmed) {
            // Atualizar os dados do registroFinanceiro
            registroFinanceiro.dinheiro_total += valor;
            registroFinanceiro.descricao = descricao;
            registroFinanceiro.qtd_dias = calcularDiasAteProximoDia5(registroFinanceiro.data);
            console.log(`dinheior que está gastando por dia antes da função: ${registroFinanceiro.dinheiro_por_dia}`)
            registroFinanceiro.dinheiro_por_dia = calcularValorQuePodeGastarPorDia(registroFinanceiro.dinheiro_total, 
                registroFinanceiro.qtd_dias
            );
            //problema qui talvez
            //dinheiroPorDia.textContent += `${registroFinanceiro.data}: ${(registroFinanceiro.qtd_dias)}`;
            // Atualizar o texto do elemento tituloElement
            console.log(`Dinheiro que está gastando por dia será: ${registroFinanceiro.dinheiro_por_dia}`);
            tituloElement.textContent = ` Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total.toFixed(2).replace('.', ',')}`;
            

            dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: 
    ${registroFinanceiro.dinheiro_por_dia}`;
            // Limpar os campos de entrada e textarea
            valorInput.value = "";
            document.getElementById("descricaoOperacao").value = "";
    
            // Exibir mensagem de sucesso
            alert("Dados salvos com sucesso...");
            
            // Aqui você pode adicionar código para salvar os dados em um banco de dados, por exemplo
        } else {
            alert("Ação de salvamento cancelada...");
        }
        salvarLocalStorage();
    });
    
    //funções para atualização de ganhos e gastos
    function ganho() {

    }

    function ganho() {
        
    }
    // Adicionar um event listener para atualizar o texto do porDia com a data selecionada
    selectDia.addEventListener('change', function() {
        let selectedIndex = this.selectedIndex;
        let selectedOption = this.options[selectedIndex];
        // atualizando qtd_dias
        registroFinanceiro.qtd_dias = calcularDiasAteProximoDia5(selectedOption);
        console.log(`${registroFinanceiro.qtd_dias}`);
        qtd.textContent = `Quantidade de dias até o próximo pagamento:  ${registroFinanceiro.qtd_dias}`;
        registroFinanceiro.data = selectedOption;
        dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data.text}: ${registroFinanceiro.dinheiro_por_dia}`;
    });

    function salvarLocalStorage() {
        localStorage.setItem(key, JSON.stringify(registroFinanceiro));
    }
    
    // Carregar os dados do localStorage ao carregar a página
    window.onload = function() {
        // Verificar se a chave existe no localStorage
        if (localStorage.getItem(key)) {
            // Recuperar o objeto do localStorage e convertê-lo de volta para um objeto JavaScript
            registroFinanceiro = JSON.parse(localStorage.getItem(key));
    
            // Atualizar os elementos da página com os dados recuperados
            tituloElement.textContent = ` Dinheiro Total: R$ ${registroFinanceiro.dinheiro_total}`;
            dinheiroPorDia.textContent = `Dinheiro que pode gastar por dia até o dia ${registroFinanceiro.data}: ${registroFinanceiro.dinheiro_por_dia}`;
            qtd.textContent = `Quantidade de dias até o próximo pagamento: ${registroFinanceiro.qtd_dias}`;
            selectDia.value = registroFinanceiro.data.toString().padStart(2, '0');
        } else {
            // Se a chave não existir no localStorage, inicializar com valores padrão
            salvarLocalStorage(); // Salvar no localStorage pela primeira vez
        }
    };
    
