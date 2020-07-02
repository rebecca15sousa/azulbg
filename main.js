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
let allPlayerPointsBoards = [];
let playerPoints = [];
let valueA;
let valueB;
let tilesSameColor;
let tileRow;
let playerButtons;
let jogadorInicial = Math.floor(Math.random() * numPlayers);
let endRound = false;
let endGame = false;
let endGameCounter = 0;
let placement = 0;
let fileiraCompletada = 0;
let colunaCompletada = 0;
let quantAzul = 0;
let quantVermelho = 0;
let quantAmarelo = 0;
let quantPreto = 0;
let quantBranco = 0;

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
      if (allPlayerBoards[valueA][valueB].length == 0 && !allPlayerPointsBoards[valueA][valueB].includes(factDisplayColor)) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else if (allPlayerBoards[valueA][valueB].length < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor) && !allPlayerPointsBoards[valueA][valueB].includes(factDisplayColor)) {
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
      if (allPlayerBoards[valueA][valueB].length == 0 && !allPlayerPointsBoards[valueA][valueB].includes(factDisplayColor)) {
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
    } else if (allPlayerBoards[valueA][valueB].length < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor) && !allPlayerPointsBoards[valueA][valueB].includes(factDisplayColor)) {
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

// cria cada board dos jogadores com 5 fileiras em cada um
function createPlayerBoards(numPlayers) {
  let div = document.querySelector("#playerAreas");
  //cria uma div pra cada board de jogador
  for (let i = 0; i < numPlayers; i++) {
    let div2 = document.createElement("div");
    div2.setAttribute("id", "playerBoard" + i);
    let div4 = document.createElement("div");
    div4.setAttribute("id", "playerPointsBoards" + i);
    allPlayerBoards[i] = [];
    allPlayerPointsBoards[i] = [];
    playerPoints[i] = [0];
    for (let j = 0; j < 5; j++) {
      // Cria fileiras de pontuação e arrays dessas fileiras
      let div5 = document.createElement("div");
      div5.setAttribute("id", "pointsRow" + i + j);
      div4.appendChild(div5);
      allPlayerPointsBoards[i][j] = [, , , , ,];
      // Resto
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
          fimDaRodada();
        }

      });
      tileRow.setAttribute("class", "playerRowsButtons");
      tileRow.textContent = "butao";
      div2.appendChild(tileRow);
    }
    //cria 6 fileiras em cada playerboard presente dentro do allPlayerBoards
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

function fimDaRodada() {
  // Hora de escorar as fileiras de cada jogador que já tiver completa
  for (let i = 0; i < allPlayerBoards.length; i++) {
    for (let j = 0; j < allPlayerBoards[i].length; j++) {
      if(allPlayerBoards[i][j].length == j + 1) {
        // Primeiro, descarta todos os tiles em excesso
        for (let k = 0; k < allPlayerBoards[i][j].length - 1; k++) {
          tilesDiscard.push(allPlayerBoards[i][j][k]);
          allPlayerBoards[i][j].splice(k, 1);
        }

        // Depois, move o tile que sobrou para pontuar
        if (allPlayerBoards[i][j][0] == "Azul") {
          placement = j;
          if (placement > 4) {
            placement = placement - 5;
          }
          console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Amarelo") {
          placement = j + 1;
          if (placement > 4) {
            placement = placement - 5;
          }
          console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Vermelho") {
          placement = j + 2;
          if (placement > 4) {
            placement = placement - 5;
          }
          console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Preto") {
          placement = j + 3;
          if (placement > 4) {
            placement = placement - 5;
          }
          console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Branco") {
          placement = j + 4;
          if (placement > 4) {
            placement = placement - 5;
          }
          console.log("placement value of white is:  " + placement);
        }

        allPlayerPointsBoards[i][j][placement] = allPlayerBoards[i][j][0];
        playerPoints[i]++;
        allPlayerBoards[i][j].splice(0, 1);
        if (placement > 0 ) {
          while (allPlayerPointsBoards[i][j][placement - 1]) {
            playerPoints[i]++;
            placement--;
          }
      }
        if (placement < 4) {
          while (allPlayerPointsBoards[i][j][placement + 1]) {
            playerPoints[i]++;
            placement++;
        }
      }
        if (j > 0) {

        while (allPlayerPointsBoards[i][j - 1][placement]) {
          playerPoints[i]++;
          j--;
        }
      }
        if (j < 4) {
            while (allPlayerPointsBoards[i][j + 1][placement]) {
            playerPoints[i]++;
            j++;
        }
      }
      }
    }
    let negativeRowSize = allPlayerBoards[i][5].length;
    console.log("a length de negativeRowSize eh: " + negativeRowSize);
    console.log("sua quantidade de pontos atual antes de perder pontos eh: " + playerPoints[i]);
    switch (negativeRowSize) {
      case 1:
        playerPoints[i]--;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 2:
        playerPoints[i] = playerPoints[i] - 2;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 3:
        playerPoints[i] = playerPoints[i] - 4;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 4:
        playerPoints[i] = playerPoints[i] - 6;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 5:
        playerPoints[i] = playerPoints[i] - 8;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 6:
        playerPoints[i] = playerPoints[i] - 11;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 7:
        playerPoints[i] = playerPoints[i] - 14;
        console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      default:
        console.log("Nao perdeu ponto, parabens meu filho");
    }

    for (let l = 0; l < allPlayerBoards[i][5].length; l++) {
      if (allPlayerBoards[i][5][l] == "Firstplayer") {
        jogadorInicial = i;
        allPlayerBoards[i][5].splice(l, 1);
        l--;
      } else {
        tilesDiscard.push(allPlayerBoards[i][5][l]);
        allPlayerBoards[i][5].splice(l, 1);
        l--;
      }
    }
  }
  // Vai fazer o check de se o jogo ja acabou
  for (let i = 0; i < allPlayerPointsBoards.length; i++) {
    for (let j = 0; j < allPlayerPointsBoards[i].length; j++) {
      endGameCounter = 0;
      for (let k = 0; k < allPlayerPointsBoards[i][j].length; k++) {
        if (allPlayerPointsBoards[i][j][k] != null) {
          endGameCounter++;
          console.log("tem peçaaaaaaaaaaa");
          console.log(endGameCounter);
        }
      }
      if (endGameCounter == 5) {
        endGame = true;
        console.log("É TETRA!");
      }
    }
  }
  if (endGame == true) {
    fimDoJogo();
  } else {
    inicioDaRodada();
  }
}

function fimDoJogo() {
  for (let i = 0; i < allPlayerPointsBoards.length; i++) {
    for (let j = 0; j < allPlayerPointsBoards[i].length; j++) {
      fileiraCompletada = 0;
      for (let k = 0; k < allPlayerPointsBoards[i][j].length; k++) {
        switch (allPlayerPointsBoards[i][j][k]) {
          case "Azul":
            quantAzul++;
            fileiraCompletada++;
            break;
          case "Vermelho":
          quantVermelho++;
          fileiraCompletada++;
            break;
          case "Amarelo":
          quantAmarelo++;
          fileiraCompletada++;
            break;
          case "Preto":
          quantPreto++;
          fileiraCompletada++;
            break;
          case "Branco":
          quantBranco++;
          fileiraCompletada++;
            break;
          default:
            break;
        }
      }
      if (fileiraCompletada == 5) {
        playerPoints[i] += 2;
      }
    }
    if (quantAzul == 5) {
      playerPoints[i] += 10;
    }
    if (quantVermelho == 5) {
      playerPoints[i] += 10;
    }
    if (quantAmarelo == 5) {
      playerPoints[i] += 10;
    }
    if (quantPreto == 5) {
      playerPoints[i] += 10;
    }
    if (quantBranco == 5) {
      playerPoints[i] += 10;
    }
    quantAzul = 0;
    quantVermelho = 0;
    quantAmarelo = 0;
    quantPreto = 0;
    quantBranco = 0;
    for (let l = 0; l < allPlayerPointsBoards[i].length; l++) {
      for (let m = 0; m < allPlayerPointsBoards[i][l].length; m++) {
        colunaCompletada = 0;
        if (allPlayerPointsBoards[i][l][m] != null) {
          colunaCompletada++;
          console.log("tem objeto nessa coluna");
        }
        if (colunaCompletada == 5) {
          playerPoints[i] += 7;
        }
      }
  }

  }
  console.log("Pontos do jogador 1: " + playerPoints[0]);
  console.log("Pontos do jogador 2: " + playerPoints[1]);
}

// console.log(circuloMaster);
createPlayerBoards(numPlayers);
createCirculos(numPlayers);

function inicioDaRodada() {

  createBag();
  createMesaoFactoryDisplay();
  distributeTiles();
  selectTileColor();
}

inicioDaRodada();
