let bag = [];
let circuloMaster = [];
let mesao;
let tilesDiscard = [];
let megaDiv = document.querySelector("#mainBoardArea");
let tiles;
let numPlayers = 2;
let pid;
let nid
let factDisplayNum;
let factDisplayColor;
let allPlayerBoards = [];
let valueA;
let valueB;
let tilesSameColor;
let tileRow;
let playerButtons;
let jogadorInicial = Math.floor(Math.random() * numPlayers);
let endRound = false;

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

// Cria div que vai representar o mesao (factory display especial que recebe os tiles nao coletados pelo jogador da vez)
function createMesaoFactoryDisplay() {
  mesao = ["Firstplayer"];
  // let factDisplay = [];
  // circuloMaster.push(factDisplay);
  let div = document.createElement('div');
  div.setAttribute('id', 'mesao');
  div.setAttribute('class', 'mesaoFactoryDisplay');
  // let factoryImage = document.createElement('img');
  // factoryImage.setAttribute('src', 'assets/factoryDisplay.png');
  // factoryImage.setAttribute('class', 'factoriesImages');
  // div.appendChild(factoryImage);
  let drawTile = document.createElement("img");
  drawTile.setAttribute("src", "assets/FirstPlayer.jpg");
  drawTile.setAttribute("id", "firstPlayer");
  div.appendChild(drawTile);
  megaDiv.appendChild(div);
}

//Pega os tiles dentro da sacola, e distribui aleatoriamente nos factories displays
function distributeTiles() {
  for(let i = 0; i < circuloMaster.length; i++) {
    for(let j = 0; j < 4; j++) {
      if (bag.length <= 0) {
        bag = tilesDiscard;
        tilesDiscard = [];
      }
      let randomIndex = Math.floor(Math.random() * bag.length);
      circuloMaster[i].push(bag[randomIndex]);
      bag.splice(randomIndex, 1);
      let variavelzinha = "<input type='image' src='assets/" + circuloMaster[i][j] + ".jpg' class='tilesImage " + circuloMaster[i][j] + "' id='" + circuloMaster[i][j] + randomIndex + "'>"
      document.getElementById('factory' + i).innerHTML += variavelzinha;
    }
    tiles = document.querySelectorAll(".tilesImage");
  }
}

//Essa função retorna a cor do tile selecionado.
function selectTileColor() {
  for(i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function() {
      for (let k = 0; k < tiles.length ; k++) {
        tiles[k].selected = false;
        tiles[k].setAttribute("style", "border: none;");
      }
      playerButtons = document.querySelectorAll(".playerRowsButtons");
      for (let l = 0; l < playerButtons.length; l++) {
          playerButtons[l].disabled = false;
      }
      pid = this.parentNode.id;
      factDisplayNum = pid.substr(-1, 1);
      nid = this.id;
      factDisplayColor = nid.replace(/[0-9]/g, '');
      console.log(factDisplayColor);
      tilesSameColor = document.querySelectorAll("#" + pid + ">." + factDisplayColor);
      for (j = 0; j < tilesSameColor.length; j++) {
        tilesSameColor[j].setAttribute("style", "border: 2px solid red;");
        tilesSameColor[j].selected = true;
      };
    });
  }
}

// Essa função esta responsavel por tirar os tiles da array dos factory displays e mover pra array selecionada do jogador
function moveTileSelected(){
  for( let i = 0; i < circuloMaster[factDisplayNum].length; i++) {
    // Seleciona todas os tiles com a mesma cor do tile clicado
    if(circuloMaster[factDisplayNum][i] == factDisplayColor) {
      // adiciona o tile da cor selecionada para a linha do tabuleiro do jogador
      if (allPlayerBoards[valueA][valueB].length == 0) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else if (allPlayerBoards[valueA][valueB].length < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor)) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else {
        // Envia o excesso dos tiles para a linha de pontos negativos do jogador
        if (allPlayerBoards[valueA][5].length < 7) {
          allPlayerBoards[valueA][5].push(factDisplayColor);
        // Se a linha de pontos negativos do jogador ja estiver lotada, envia o excesso de tiles que iria para lá direto para o descarte.
        } else {
          tilesDiscard.push(factDisplayColor);
        }
      }
      // Deleta o tile da cor movida do factory display
      circuloMaster[factDisplayNum].splice(i, 1);
      i--;
    } else {
        mesao.push(circuloMaster[factDisplayNum][i]);
        let corAtual = circuloMaster[factDisplayNum][i];
        drawMesao(corAtual);
        circuloMaster[factDisplayNum].splice(i, 1);
        i--;
    }
  }
}

function moveTileSelectedMesao(){
  for(let i = 0; i < mesao.length; i++) {
    if(mesao[i] == "Firstplayer") {
      allPlayerBoards[valueA][5].push(mesao[i]);
      jogadorInicial = valueA;
      let tileFirstPlayer = document.querySelector("#firstPlayer");
      tileFirstPlayer.remove();
      mesao.splice(i, 1);
      i--;
    }
    // Seleciona todas os tiles com a mesma cor do tile clicado
    if(mesao[i] == factDisplayColor) {
      // adiciona o tile da cor selecionada para a linha do tabuleiro do jogador
      if (allPlayerBoards[valueA][valueB].length == 0) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else if (allPlayerBoards[valueA][valueB].length < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor)) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else {
        // Envia o excesso dos tiles para a linha de pontos negativos do jogador
        if (allPlayerBoards[valueA][5].length < 7) {
          allPlayerBoards[valueA][5].push(factDisplayColor);
        // Se a linha de pontos negativos do jogador ja estiver lotada, envia o excesso de tiles que iria para lá direto para o descarte.
        } else {
          tilesDiscard.push(factDisplayColor);
        }
      }
      // Deleta o tile da cor movida do factory display
      mesao.splice(i, 1);
      i--;
    }
  }
}

//Essa função está sendo responsavel por desenhar nas fileiras do tabuleiro do jogador os tiles que foram adicionados para a fileira.
function drawTileSelected() {
  for(let m = 0; m < tilesSameColor.length; m++) {
    if (document.getElementById('fileira' + valueA + valueB).childElementCount == 0) {
      let variavelzinha2 = document.createElement("img");
      variavelzinha2.setAttribute("src", "assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg");
      //let variavelzinha2 = "<img src='assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg' class='tilesImage'>";
      document.getElementById('fileira' + valueA + valueB).appendChild(variavelzinha2);
    }
    else if (document.getElementById("fileira" + valueA + valueB).childElementCount < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor)) {
      let variavelzinha2 = document.createElement("img");
      variavelzinha2.setAttribute("src", "assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg");
      //let variavelzinha2 = "<img src='assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg' class='tilesImage'>";
      document.getElementById('fileira' + valueA + valueB).appendChild(variavelzinha2);
    }
  }
}

function drawMesao(corAtual) {
    let div = document.querySelector("#mesao");
    let drawTile = document.createElement("input");
    drawTile.setAttribute("type", "image");
    drawTile.setAttribute("src", "assets/" + corAtual + ".jpg");
    drawTile.setAttribute("class", "tilesImage " + corAtual);
    // drawTile.setAttribute("id", corAtual + );
    drawTile.addEventListener("click", function() {
      tiles = document.querySelectorAll(".tilesImage");
      factDisplayColor = corAtual;
      for (let k = 0; k < tiles.length ; k++) {
        tiles[k].setAttribute("style", "border: none;");
      }
      playerButtons = document.querySelectorAll(".playerRowsButtons");
      for (let l = 0; l < playerButtons.length; l++) {
          playerButtons[l].disabled = false;
      }
      tilesSameColor = document.querySelectorAll("#mesao>." + corAtual);
      for (j = 0; j < tilesSameColor.length; j++) {
        tilesSameColor[j].setAttribute("style", "border: 2px solid red;");
      };
    });
    div.appendChild(drawTile);
}

function moveNotSelectedTiles() {
  // Essa função move os tiles que NAO foram selecionados do factory display para o meio da mesa, que eh um tipo de factory display especial;
}

// cria cada board dos jogadores com 5 fileiras em cada um
function createPlayerBoards(numPlayers) {
  let div = document.querySelector("#playerAreas");
  //cria uma div pra cada board de jogador
  for (let i = 0; i < numPlayers; i++) {
    let div2 = document.createElement("div");
    div2.setAttribute("id", "playerBoard" + i);
    allPlayerBoards[i] = [];
    //cria 5 fileiras pra cada board de jogador
    for (let j = 0; j < 5; j++) {
      tileRow = document.createElement("button");
      tileRow.disabled = true;
      tileRow.addEventListener("click", function() {
        valueA = i;
        valueB = j;
          if (tilesSameColor[0].parentNode.id == "mesao") {
            console.log(factDisplayColor);
            console.log("deu certo!");
            moveTileSelectedMesao();
            let tilesInMesaoOfSameColor = document.querySelectorAll("#mesao>." + factDisplayColor + "");
            console.log(tilesInMesaoOfSameColor);
            for (let n = 0; n < tilesInMesaoOfSameColor.length; n++) {
              console.log("deleetooou");
              tilesInMesaoOfSameColor[n].remove();
            }
          } else {
            moveTileSelected();
            // Remove todos os azulejos selecionados dos factory displays
            let allTilesInThisFactDisplay = document.querySelectorAll("#" + pid + ">.tilesImage");
            for (l = 0; l < allTilesInThisFactDisplay.length; l++) {
              allTilesInThisFactDisplay[l].remove();
            }
          }

        // Adiciona os azulejos selecionados ao player board do jogador
        drawTileSelected();
        // Desativa todos os botões novamente
        playerButtons = document.querySelectorAll(".playerRowsButtons");
        for (let l = 0; l < playerButtons.length; l++) {
            playerButtons[l].disabled = true;
        }

        // Checa se a rodada ja terminou
        endRound = checkEnd();

        function checkEnd() {
          for (let o = 0; o < circuloMaster.length; o++) {
            if (circuloMaster[o].length > 0) {
              return false;
            }
          };
          return true;
        }

        if (mesao.length == 0 && endRound == true) {
          console.log("ACABOU A RODADA RAPAZEWADA uWu");
        }

      });
      tileRow.setAttribute("class", "playerRowsButtons");
      tileRow.textContent = "butao";
      div2.appendChild(tileRow);
    }
    //cria 5 fileiras em cada playerboard presente dentro do allPlayerBoards
      for (let k = 0; k < 6; k++) {
        let div3 = document.createElement("div");
        div3.setAttribute("id", "fileira" + i + k);
        div2.appendChild(div3);
        allPlayerBoards[i][k] = [];
    }
    //coloca a img de cada board de jogador
    let playerImage = document.createElement("img");
    playerImage.setAttribute("class", "boards");
    playerImage.setAttribute("src", "assets/playerBoard.jpg")
    div2.appendChild(playerImage);
    div.appendChild(div2);
  }
}

// console.log(circuloMaster);
createPlayerBoards(numPlayers);
createBag();
createCirculos(numPlayers);
createMesaoFactoryDisplay();
distributeTiles();
selectTileColor();
// console.log(bag);
// console.log(circuloMaster);
