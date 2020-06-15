let bag = [];
let circuloMaster = [];
let mesa = [];
let discard = [];
let megaDiv = document.querySelector("#mainBoardArea");

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
    let circulo = [];
    circuloMaster.push(circulo);
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
      let variavelzinha = "<input type='image' src='assets/" + circuloMaster[i][j] + ".jpg' class='tilesImage'>"
      document.getElementById('factory' + i).innerHTML += variavelzinha;
    }
  }
}

// console.log(circuloMaster);
createBag();
createCirculos(4);
distributeTiles();
// console.log(bag);
// console.log(circuloMaster);
