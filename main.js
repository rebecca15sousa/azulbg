let bag = [];
let circuloMaster = [];
let mesa = [];
let discard = [];
let megaDiv = document.querySelector("#mainBoardArea");
let buttons;
let playerTileSel = [];
let numPlayers = 2;

//array que contem todos os tiles do jogo
let tipoTiles = [
  { cor: "Azul", quantidadeTiles: 20, status: false },
  { cor: "Vermelho", quantidadeTiles: 20, status: false },
  { cor: "Amarelo", quantidadeTiles: 20, status: false },
  { cor: "Preto", quantidadeTiles: 20, status: false },
  { cor: "Branco", quantidadeTiles: 20, status: false }
];

//coloca todos os tiles dentro da array da sacola
function createBag() {
  for(let i = 0; i < tipoTiles.length; i++) {
    for(let j = 0; j < tipoTiles[i].quantidadeTiles; j++) {
      bag.push(tipoTiles[i].cor);
    }
  }
}

//cria factories displays de acordo com a quantidade de jogadores
function createCirculos(numPlayers) {
  let numCirculos = (numPlayers * 2) + 1;
  for(let i = 0; i < numCirculos; i++) {
    let factDisplay = [];
    circuloMaster.push(factDisplay);
    let div = document.createElement('div');
    div.setAttribute('id', 'factory' + i);
    div.setAttribute('class', 'factoriesDisplay');
    let factoryImage = document.createElement('img');
    factoryImage.setAttribute('src', 'assets/factoryDisplay.png');
    factoryImage.setAttribute('class', 'factoriesImages');
    div.appendChild(factoryImage);
    megaDiv.appendChild(div);
  }
}

//Pega os tiles dentro da sacola, e distribui aleatoriamente nos factories displays
function distributeTiles() {
  for(let i = 0; i < circuloMaster.length; i++) {
    for(let j = 0; j < 4; j++) {
      if (bag.length <= 0) {
        bag = discard;
        discard = [];
      }
      let randomIndex = Math.floor(Math.random() * bag.length);
      circuloMaster[i].push(bag[randomIndex]);
      bag.splice(randomIndex, 1);
      let variavelzinha = "<input type='image' src='assets/" + circuloMaster[i][j] + ".jpg' class='tilesImage' id='" + circuloMaster[i][j] + randomIndex + "'>"
      document.getElementById('factory' + i).innerHTML += variavelzinha;
    }
    buttons = document.querySelectorAll(".tilesImage");
  }
}

function coletarTiles() {

}

function eventos() {
  for(i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
      let pid = this.parentNode.id;
      let factDisplayNum = pid.substr(-1, 1);
      let nid = this.id;
      let factDisplayColor = nid.replace(/[0-9]/g, '');
      console.log(factDisplayColor);
      for( let i = 0; i < circuloMaster[factDisplayNum].length; i++) {
        if(circuloMaster[factDisplayNum][i] == factDisplayColor) {
          playerTileSel.push(circuloMaster[factDisplayNum][i]);
          circuloMaster[factDisplayNum].splice(i, 1);
          i--;
        }
      }
      // coletarTiles();
    });
  }
}

function createPlayerBoards(numPlayers) {
  let div = document.querySelector("#playerAreas");
  for (i = 0; i < numPlayers; i++) {
    let div2 = document.createElement("input");
    div2.setAttribute("class", "playerBoards");
    div2.setAttribute("type", "image")
    div2.setAttribute("src", "assets/playerBoard.jpg")
    div.appendChild(div2);
  }
}

// console.log(circuloMaster);
createPlayerBoards(numPlayers);
createBag();
createCirculos(numPlayers);
distributeTiles();
eventos();
// console.log(bag);
// console.log(circuloMaster);
