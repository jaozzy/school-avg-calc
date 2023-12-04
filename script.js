function atualizarMedia(trimestre) {
    const notas = ['n1', 'n2', 'n3', 'recp', 'sim'];

    notas.forEach(nota => {
        const inputField = document.getElementById(`${nota}-${trimestre}`);
        let maxValue = 10; // Valor máximo para notas das provas

        let currentValue = parseFloat(inputField.value) || 0;

        if (currentValue > maxValue) {
            inputField.value = maxValue; // Define o valor máximo se for excedido
            currentValue = maxValue; // Atualiza o valor para o máximo permitido
        }

        if (nota === 'sim') {
            if (currentValue < 0) {
                inputField.value = 0; // Define o valor mínimo como 0 se for menor que 0
                currentValue = 0; // Atualiza o valor para 0
            } else if (currentValue > 1) {
                inputField.value = 1; // Define o valor máximo como 1 se for maior que 1
                currentValue = 1; // Atualiza o valor para 1
            }
        }
    });

    let n1 = parseFloat(document.getElementById(`n1-${trimestre}`).value) || 0;
    let n2 = parseFloat(document.getElementById(`n2-${trimestre}`).value) || 0;
    const n3 = parseFloat(document.getElementById(`n3-${trimestre}`).value) || 0;
    const recp = parseFloat(document.getElementById(`recp-${trimestre}`).value) || 0;
    const sim = parseFloat(document.getElementById(`sim-${trimestre}`).value) || 0;

    if (recp > n1 && recp > n2) {
        if (n1 < n2) {
            n1 = recp;
        } else {
            n2 = recp;
        }
    } else if (recp > n1) {
        n1 = recp;
    } else if (recp > n2) {
        n2 = recp;
    }

    const media = (((n1 + n2 + n3) / 3) + sim);


    document.getElementById(`media-${trimestre}`).textContent = media.toFixed(2);

    validarMedia();
}

// Função para calcular a média anual
function calcularMediaAnual() {
    // Coletando notas
    let n1t1 = parseFloat(document.getElementById('n1-1t').value) || 0;
    let n2t1 = parseFloat(document.getElementById('n2-1t').value) || 0;
    const n3t1 = parseFloat(document.getElementById('n3-1t').value) || 0;
    const simt1 = parseFloat(document.getElementById('sim-1t').value) || 0;
    const recpt1 = parseFloat(document.getElementById('recp-1t').value) || 0;

    if (recpt1 > n1t1) {
        n1t1 = recpt1;
    } else if (recpt1 > n2t1) {
        n2t1 = recpt1;
    }


    let n2t2 = parseFloat(document.getElementById('n2-2t').value) || 0;
    let n1t2 = parseFloat(document.getElementById('n1-2t').value) || 0;
    const n3t2 = parseFloat(document.getElementById('n3-2t').value) || 0;
    const simt2 = parseFloat(document.getElementById('sim-2t').value) || 0;
    const recpt2 = parseFloat(document.getElementById('recp-2t').value) || 0;

    if (recpt2 > n1t2) {
        n1t2 = recpt2;
    } else if (recpt2 > n2t2) {
        n2t2 = recpt2;
    }

    let n1t3 = parseFloat(document.getElementById('n1-3t').value) || 0;
    let n2t3 = parseFloat(document.getElementById('n2-3t').value) || 0;
    const n3t3 = parseFloat(document.getElementById('n3-3t').value) || 0;
    const simt3 = parseFloat(document.getElementById('sim-3t').value) || 0;
    const recpt3 = parseFloat(document.getElementById('recp-3t').value) || 0;

    if (recpt3 > n1t3) {
        n1t3 = recpt3;
    } else if (recpt3 > n2t3) {
        n2t3 = recpt3;
    }

    const m1 = (((n1t1 + n2t1 + n3t1) / 3) + simt1);
    const m2 = (((n1t2 + n2t2 + n3t2) / 3) + simt2);
    const m3 = (((n1t3 + n2t3 + n3t3) / 3) + simt3);

    const ma = ((m1 + m2 + m3) / 3);

    return ma;
}

// Função para validar a situação do aluno
function validarMedia() {
    const ma = calcularMediaAnual();

    document.getElementById('final').style.display = 'block';
    document.getElementById('media-anual').textContent = ma.toFixed(2);

    if (ma >= 7) {
        document.getElementById('final').style.color = '#155724';
        document.getElementById('final').style.backgroundColor = '#d4edda';
        document.getElementById('resultado').textContent = 'Aprovado';
        document.getElementById('rec').style.display = 'none';
    } else {
        document.getElementById('final').style.color = '#721c24';
        document.getElementById('final').style.backgroundColor = '#f8d7da';
        document.getElementById('resultado').textContent = 'Recuperação Final';
        calcularRecuperacao(ma);
    }
}

// Função para calcular a recuperação final
function calcularRecuperacao(ma) {
    const nr = ((50 - (7 * ma)) / 3);

    document.getElementById('rec').style.display = 'block';

    document.getElementById('nota-nec').textContent = nr.toFixed(2);
}

// Adicionando eventos de input para todos os campos de notas em cada trimestre
['1t', '2t', '3t'].forEach(trimestre => {
    ['n1', 'n2', 'n3', 'recp', 'sim'].forEach(nota => {
        document.getElementById(`${nota}-${trimestre}`).addEventListener('input', () => {
            atualizarMedia(trimestre);
            validarMedia();
        });
    });
});
