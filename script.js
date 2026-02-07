let flatpickrInstance;
let servicoSelecionado = '';
let agendamentos = [];

document.addEventListener('DOMContentLoaded', function () {
    flatpickrInstance = flatpickr('#dataHoraCustom', {
        enableTime: true,           // habilita seleção de hora
        dateFormat: "d/m/Y H:i",   // formato: dia/mês/ano hora:minuto
        time_24hr: true,           // formato 24 horas
        minDate: "today",          // data mínima é hoje
        maxDate: new Date().fp_incr(365), // máximo 1 ano à frente
        locale: "pt",              // idioma português
        minuteIncrement: 30,       // incrementos de 30 minutos
        defaultHour: 9,            // hora padrão 9h
        defaultMinute: 0,          // minuto padrão 00
        disable: [
            function (date) {
                // Desabilita segundas (1 = segunda)
                return (date.getDay() === 1);
            }
        ],
        minTime: "08:00",          // horário mínimo 8h
        maxTime: "18:00"           // horário máximo 18h
    });

    // Adiciona evento para todos os botões de serviço 
    // Nesse código ele armazera o serviço e guarda na váriavel
    const botoes = document.querySelectorAll('.button');
    botoes.forEach(botao => {
        botao.addEventListener('click', function () {
            servicoSelecionado = this.value;
        });
    });

});

const DataHora = document.getElementById('dataHoraCustom');
const nomeCliente = document.getElementById('nomeCliente');

function fuiclicado() {
    const nome = nomeCliente.value.trim();
    const proc = servicoSelecionado;
    const dataHora = flatpickrInstance ? flatpickrInstance.input.value.trim() : DataHora.value.trim();
    console.log(`Serviço: ${proc}, Data e Hora: ${dataHora}, Nome do Cliente: ${nome}`);

    // Validação: verifica se o horário já está ocupado
    const horarioOcupado = agendamentos.some(agendamento => agendamento.dataHora === dataHora);

    if (!nome || !proc || !dataHora) {
        const campo = document.querySelector('.campo-mensagem');
        campo.style.visibility = 'visible';
        campo.innerHTML = `<p>Por favor, preencha todos os campos antes de agendar.</p>`;
        setTimeout(() => {
            campo.style.visibility = 'hidden'; // esconde após 2 segundos
        }, 2000);
        return;
    }
    else if (horarioOcupado) {
        const filtro = document.querySelector('.filtro');
        filtro.style.visibility = 'visible';
        filtro.innerHTML = `<p>Horário indisponível. Por favor, escolha outro horário.</p>`;
        setTimeout(() => {
            filtro.style.visibility = 'hidden'; // esconde após 2 segundos
        }, 5000);
        return;
    }
    else {
        let confirmacao = '';
        agendamentos.forEach((item, posicao) => {

        });

        const div = document.querySelector('.status-agendamento');
        div.style.visibility = 'visible';
        div.innerHTML = `Agendamento confirmado para ${nome} <br> Serviço: ${proc} <br> Data e Hora: ${dataHora}`;
        setTimeout(() => {
            div.style.visibility = 'hidden'; // esconde após 2 segundos
        }, 5000);
    }

    const novoAgendamento = {
        servico: proc,
        dataHora: dataHora,
        nomeCliente: nome
    };
    agendamentos.push(novoAgendamento);

    nomeCliente.value = '';
    dataHora.value = '';

}


const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('ativo');
        } else {
            entry.target.classList.remove('ativo');
        }
    });
},
    {
        threshold: 0.2
    });

const element = document.querySelectorAll('.animation');

element.forEach(el => {
    observer.observe(el);
});