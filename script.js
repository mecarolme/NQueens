const TabTamanhos = document.querySelector('#TabTamanhos');
const tabuleiro = document.querySelector('#tab');
const btnClean = document.querySelector('#btnClean');
const btnSolution = document.querySelector('#btnSolution');
const msg = document.querySelector('#msgs');

let tabSize = 8;
let Rodadas = 0;

TabTamanhos.addEventListener('change', (c) => {
  let { target: { value } } = c;
  value = Number(value);
  Rodadas = 0;
  dropTab(value);
  limpaMsg()
})

btnClean.addEventListener('click', () => {
  Rodadas = 0;
  dropTab();
  limpaMsg();
})

btnSolution.addEventListener('click', () => {
  console.log('Não consegui desenvolver essa parte então optei por deixar vazia.')
})

function clickTab(event) {
  let { target } = event;

  if (target.classList.contains('marc')) {
    msgsErro('Movimento inválido!', true);
    return;
  }

  if (target.classList.contains('selec')) {
    msgsErro("Aqui já tem uma dama!", true);
    return;
  }

  msg.innerHTML = '';

  target.classList.add('selec');
  target.innerHTML = QUEEN_ICON
  Rodadas++;

  drawLines()

  checarFinalDeJogo()
}

function clickTabDireito(event) {
  limpaMsg();

  let { target } = event;

  if (target.classList.contains('selec')) {
    target.classList.remove('selec');
    target.innerHTML = '';
    drawLines();
    Rodadas--;
    event.preventDefault();
  }
}

function msgsErro(mensagem, error = false) {
  limpaMsg();
  let span = document.createElement('span');
  if (error) {
    span.classList.add('mensagem-erro');
  }

  span.innerText = mensagem;

  msg.appendChild(span);
}

function msgsWin(msgswin, win = true) {
  limpaMsg();
  let span = document.createElement('span');
  if (win) {
    span.classList.add('mensagem-win');
  }

  span.innerText = msgswin;

  msg.appendChild(span);
}

function limpaMsg() {
  msg.innerHTML = '';
}

function limpaMarcados() {
  let allmarc = document.querySelectorAll('#tab > div.marc') || []
  allmarc.forEach(el => {
    el.classList.remove('marc');
  })
}

function drawLines() {
  limpaMarcados()

  let allselec = document.querySelectorAll('#tab > div.selec') || []
    allselec.forEach(el => {
    let [posiX, posiY] = el.id
      .substr(1).split('-').map(val => Number(val))

    let diagonal = []

    for (let i = 0; i < tabSize; i++) {
      diagonal.push(`${i}-${posiY}`)
    }

    for (let i = 0; i < tabSize; i++) {
      diagonal.push(`${posiX}-${i}`)
    }

    let x = posiX;
    let y = posiY;

    while (x > 0 && y < tabSize) {
      y++;
      x--;
 
      diagonal.push(`${x}-${y}`)
    }

    while (x < tabSize && y > 0) {
      x++
      y--;
      diagonal.push(`${x}-${y}`)
    }

    x = posiX;
    y = posiY;

    while (x > 0 && y > 0) {
      x--;
      y--;
      diagonal.push(`${x}-${y}`)
    }

    while (x < tabSize && y < tabSize) {
      x++;
      y++;
      diagonal.push(`${x}-${y}`)
    }

    diagonal = [...new Set([...diagonal])]

    diagonal.forEach(diag => {
      let aux = document.querySelector(`#p${diag}`)
      if (aux && !aux.classList.contains('selec')) {
        aux.classList.add(`marc`)
      }
    })
    })
}

function checarFinalDeJogo() {
  let dispo = document.querySelectorAll('#tab > div:not(.marc, .selec)').length;

  if (Rodadas === tabSize && dispo === 0) {
    msgsWin("Combinação encontrada, você ganhou! :D");
  }

  if (dispo === 0 && Rodadas < tabSize) {
    msgsErro("Combinação errada, tente de novo! :c", true);
  }
}

function dropTab(size = tabSize) {
  tab.innerHTML = '';
  tabSize = size;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let cont = (i + j) % 2 === 0;

      let tabuleiro = document.createElement('div');
      tabuleiro.id = `p${i}-${j}`;

      tabuleiro.classList.add(cont ? 'black' : 'white');
      tab.appendChild(tabuleiro);

      tabuleiro.onclick = clickTab;
      tabuleiro.oncontextmenu = clickTabDireito;
    }
  }

  let style = `repeat(${size}, 48px)`;
  tabuleiro.style.gridTemplateColumns = style;
  tabuleiro.style.gridTemplateRows = style;
}

function me() {
  console.log("Feito por Caroline Medeiros.")
}

dropTab();
me();