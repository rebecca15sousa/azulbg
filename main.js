let bag = [];
let circuloMaster = [];
let mesao;
let tilesDiscard = [];
let megaDiv = document.querySelector("#mainBoardArea");
let centerTable = document.getElementById("centerTable");
let tiles;
let numPlayers = 0;
let numPlayersArray = [];
let pid;
let nid;
let factDisplayNum;
let factDisplayColor;
let allPlayerBoards = [];
let allPlayerPointsBoards = [];
let playerPoints = [];
let plusPoints = [];
let minusPoints = [];
let finalPoints = [];
let valueA;
let valueB;
let valueC;
let valueD;
let tilesSameColor;
let tileRow;
let playerButtons;
let jogadorInicial;
let turnPlayer;
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
let modalHome = document.getElementById("modalHome");
let modalBtnPlay = document.getElementById("modalBtnPlay");
let modal = document.getElementById("modalPlayers");
let modalBtn2 = document.getElementById("modalBtn2");
let modalBtn3 = document.getElementById("modalBtn3");
let modalBtn4 = document.getElementById("modalBtn4");
let modalBtnOK = document.getElementById("modalBtnOK");
let modalRoundOver = document.getElementById("modalRoundOver");
let modalRoundSummary = document.getElementById("modalRoundSummary");
let pointsTable = document.getElementById("pointsTable");
let modalBtnSummary = document.getElementById("modalBtnSummary");
let modalRoundStart = document.getElementById("modalRoundStart");
let firstPlayerText = document.getElementById("firstPlayerText");
let firstPlayerColour = document.getElementById("firstPlayerColour");
let modalBtnStart = document.getElementById("modalBtnStart");
let modalSettings = document.getElementById("modalSettings");
let playerSettings = document.getElementById("playerSettings");
let modalBtnSettings = document.getElementById("modalBtnSettings");
let names = [];
let colours = [];
let modalEndGame = document.getElementById("modalEndGame");
let endGameTable = document.getElementById("endGameTable");
let modalBtnSamePlayers = document.getElementById("modalBtnSamePlayers");
let modalBtnDifPlayers = document.getElementById("modalBtnDifPlayers");
let modalOptions = document.getElementById("modalOptions");
let modalBtnQuitGame = document.getElementById("modalBtnQuitGame");
let modalBtnResume = document.getElementById("modalBtnResume");
let modalQuitGame = document.getElementById("modalQuitGame");
let modalBtnYes = document.getElementById("modalBtnYes");
let modalBtnNo = document.getElementById("modalBtnNo");
let optionsBtn = document.getElementById("optionsBtn");

//play button function
modalBtnPlay.onclick = function() {
  modalHome.style.display = "none";
  modal.style.display = "block";
}

//turns bag and tilesDiscard in empty arrays
function resetBagAndDiscard() {
  bag = [];
  tilesDiscard = [];
}

//resets points won and points lost values every round
function resetPoints(numPlayers) {
  for (let i = 0; i < numPlayers; i++) {
    plusPoints[i] = 0;
    minusPoints[i] = 0;
  }
}

//opens options modal
optionsBtn.onclick = function() {
  modalOptions.style.display = "block";
}

//opens modal to quit game
modalBtnQuitGame.onclick = function() {
  modalOptions.style.display = "none";
  modalQuitGame.style.display = "block";
}

//closes options modal
modalBtnResume.onclick = function() {
  modalOptions.style.display = "none";
}

//quits current game and goes back to home modal
modalBtnYes.onclick = function() {
  modalQuitGame.style.display = "none";
  modalHome.style.display = "block";
}

//cancels quit game action and goes back to options modal
modalBtnNo.onclick = function() {
  modalQuitGame.style.display = "none";
  modalOptions.style.display = "block";
}

//opens window for colour selection, creates buttons for all colours and selects colour for player
function openColourWindow(window, colourBtn) {
  window.textContent = "";
  window.style.display = "inline-block";
  let redBtn = document.createElement("button");
  redBtn.setAttribute("type", "button");
  redBtn.classList.add("swatches");
  redBtn.style.backgroundColor = "#cc0000";
  window.appendChild(redBtn);
  let orangeBtn = document.createElement("button");
  orangeBtn.setAttribute("type", "button");
  orangeBtn.classList.add("swatches");
  orangeBtn.style.backgroundColor = "#ff6600";
  window.appendChild(orangeBtn);
  let yellowBtn = document.createElement("button");
  yellowBtn.setAttribute("type", "button");
  yellowBtn.classList.add("swatches");
  yellowBtn.style.backgroundColor = "#ffcc00";
  window.appendChild(yellowBtn);
  let darkGreenBtn = document.createElement("button");
  darkGreenBtn.setAttribute("type", "button");
  darkGreenBtn.classList.add("swatches");
  darkGreenBtn.style.backgroundColor = "#009933";
  window.appendChild(darkGreenBtn);
  let lightGreenBtn = document.createElement("button");
  lightGreenBtn.setAttribute("type", "button");
  lightGreenBtn.classList.add("swatches");
  lightGreenBtn.style.backgroundColor = "#79ff4d";
  window.appendChild(lightGreenBtn);
  let darkBlueBtn = document.createElement("button");
  darkBlueBtn.setAttribute("type", "button");
  darkBlueBtn.classList.add("swatches");
  darkBlueBtn.style.backgroundColor = "#0000cc";
  window.appendChild(darkBlueBtn);
  let lightBlueBtn = document.createElement("button");
  lightBlueBtn.setAttribute("type", "button");
  lightBlueBtn.classList.add("swatches");
  lightBlueBtn.style.backgroundColor = "#00ccff";
  window.appendChild(lightBlueBtn);
  let purpleBtn = document.createElement("button");
  purpleBtn.setAttribute("type", "button");
  purpleBtn.classList.add("swatches");
  purpleBtn.style.backgroundColor = "#6600cc";
  window.appendChild(purpleBtn);
  let pinkBtn = document.createElement("button");
  pinkBtn.setAttribute("type", "button");
  pinkBtn.classList.add("swatches");
  pinkBtn.style.backgroundColor = "#ff66ff";
  window.appendChild(pinkBtn);
  let aquaBtn = document.createElement("button");
  aquaBtn.setAttribute("type", "button");
  aquaBtn.classList.add("swatches");
  aquaBtn.style.backgroundColor = "#4dffb8";
  window.appendChild(aquaBtn);
  let swatches = document.getElementsByClassName("swatches");
  for (let i = 0; i < swatches.length; i++) {
    swatches[i].addEventListener("click", function() {
      window.style.display = "none";
      colourBtn.style.backgroundColor = this.style.backgroundColor;
    });
  }
}

//creates settings options based on player quantity
function makeSettings(numPlayers) {
  playerSettings.textContent = "";
  for (let i = 0; i < numPlayers; i++) {
    let colourAndName = document.createElement("div");
    colourAndName.classList.add("colourAndName");
    let colourBtn = document.createElement("button");
    colourBtn.setAttribute("type", "button");
    colourBtn.classList.add("colourBtn");
    colourBtn.setAttribute("id", "playerColour" + i);
    colourAndName.appendChild(colourBtn);
    let window = document.createElement("div");
    window.classList.add("colourWindow");
    window.style.display = "none";
    colourAndName.appendChild(window);
    colourBtn.addEventListener("click", function() {
      openColourWindow(window, colourBtn);
    });
    let playerName = document.createElement("input");
    playerName.setAttribute("type", "text");
    playerName.setAttribute("maxlength", "12");
    playerName.classList.add("playerName");
    playerName.setAttribute("id", "playerName" + i);
    colourAndName.appendChild(playerName);
    playerSettings.appendChild(colourAndName);
  }
}

//creates cells for summary points table
function createSummaryTable(numPlayers) {
  for (let i = 0; i < numPlayers; i++) {
    let cellColour = document.createElement("div");
    cellColour.setAttribute("id", "cellColour" + i);
    pointsTable.appendChild(cellColour);
    let cellPlayer = document.createElement("div");
    cellPlayer.setAttribute("id", "cellPlayer" + i);
    cellPlayer.classList.add("cell");
    pointsTable.appendChild(cellPlayer);
    let cellPointsWon = document.createElement("div");
    cellPointsWon.setAttribute("id", "cellPointsWon" + i);
    cellPointsWon.classList.add("cell");
    pointsTable.appendChild(cellPointsWon);
    let cellPointsLost = document.createElement("div");
    cellPointsLost.setAttribute("id", "cellPointsLost" + i);
    cellPointsLost.classList.add("cell");
    pointsTable.appendChild(cellPointsLost);
    let cellPointsTotal = document.createElement("div");
    cellPointsTotal.setAttribute("id", "cellPointsTotal" + i);
    cellPointsTotal.classList.add("cell");
    pointsTable.appendChild(cellPointsTotal);
  }
}

//inputs players data in the summary points table
function createSummaryRows(rows) {
  pointsTable.style.setProperty('--grid-rows', (rows + 1));
  for (let i = 0; i < rows; i++) {
    let cellColour = document.getElementById("cellColour" + i);
    cellColour.style.backgroundColor = colours[i];
    let cellPlayer = document.getElementById("cellPlayer" + i);
    cellPlayer.textContent = names[i];
    let cellPointsWon = document.getElementById("cellPointsWon" + i);
    cellPointsWon.textContent = plusPoints[i];
    let cellPointsLost = document.getElementById("cellPointsLost" + i);
    cellPointsLost.textContent = minusPoints[i];
    let cellPointsTotal = document.getElementById("cellPointsTotal" + i);
    cellPointsTotal.textContent = playerPoints[i];
  }
}

//buttons functions for modal that selects number of players
modalBtn2.onclick = function() {
  numPlayers = 2;
  numPlayersArray = [0, 1];
  modalBtn2.setAttribute("style", "border: 5px solid red;");
  modalBtn3.setAttribute("style", "border: none;");
  modalBtn4.setAttribute("style", "border: none;");
}

modalBtn3.onclick = function() {
  numPlayers = 3;
  numPlayersArray = [0, 1, 2];
  modalBtn3.setAttribute("style", "border: 5px solid red;");
  modalBtn2.setAttribute("style", "border: none;");
  modalBtn4.setAttribute("style", "border: none;");
}

modalBtn4.onclick = function() {
  numPlayers = 4;
  numPlayersArray = [0, 1, 2, 3];
  modalBtn4.setAttribute("style", "border: 5px solid red;");
  modalBtn2.setAttribute("style", "border: none;");
  modalBtn3.setAttribute("style", "border: none;");
}

modalBtnOK.onclick = function() {
  if (numPlayers != 0) {
    modal.style.display = "none";
    makeSettings(numPlayers);
    modalSettings.style.display = "block";
    createWarningDiv();
  }
}

//button on settings modal that calls start game function
modalBtnSettings.onclick = function() {
  startGame();
  modalSettings.style.display = "none";
}

//checks if there is a player colour repeated
function isColourRepeated() {
  for (let i = 0; i < numPlayers; i++) {
    for (let j = 0; j < numPlayers; j++) {
      let colourA = document.getElementById("playerColour" + i).style.backgroundColor;
      let colourB = document.getElementById("playerColour" + j).style.backgroundColor;
      if (i != j && colourA == colourB) {
        return true;
      }
    }
  }
  return false;
}

//checks if there is a player name repeated
function isNameRepeated() {
  for (let i = 0; i < numPlayers; i++) {
    for (let j = 0; j < numPlayers; j++) {
      let nameA = document.getElementById("playerName" + i).value;
      let nameB = document.getElementById("playerName" + j).value;
      if (i != j && nameA == nameB) {
        return true;
      }
    }
  }
  return false;
}

//creates divs for warning text about repeated names and colours and empty textboxes
function createWarningDiv() {
  document.getElementById("warningDivs").textContent = "";
  let colourWarning = document.createElement("div");
  colourWarning.setAttribute("id", "colourWarningDiv");
  colourWarning.classList.add("warnings");
  document.getElementById("warningDivs").appendChild(colourWarning);
  let nameWarning = document.createElement("div");
  nameWarning.setAttribute("id", "nameWarningDiv");
  nameWarning.classList.add("warnings");
  document.getElementById("warningDivs").appendChild(nameWarning);
  let textboxWarning = document.createElement("div");
  textboxWarning.setAttribute("id", "textboxWarningDiv");
  textboxWarning.classList.add("warnings");
  document.getElementById("warningDivs").appendChild(textboxWarning);
}

//checks if there is an empty textbox
function isTextboxEmpty() {
  for (let i = 0; i < numPlayers; i++) {
    let playerName = document.getElementById("playerName" + i).value;
    if (playerName == "") {
      return true;
    }
  }
  return false;
}

//calls functions for initial game setup
function startGame() {
  if (isColourRepeated()) {
    let colourWarning = document.getElementById("colourWarningDiv");
    colourWarning.textContent = "Player colours can not be repeated";
  } else if (isNameRepeated()) {
    let nameWarning = document.getElementById("nameWarningDiv");
    nameWarning.textContent = "Player names can not be repeated";
  } else if (isTextboxEmpty()) {
    let textboxWarning = document.getElementById("textboxWarningDiv");
    textboxWarning.textContent = "Player names can not be empty";
  } else {
    names = [];
    colours = [];
    for (let i = 0; i < numPlayers; i++) {
      names.push(document.getElementById("playerName" + i).value);
      colours.push(document.getElementById("playerColour" + i).style.backgroundColor);
    }
    jogadorInicial = Math.floor(Math.random() * numPlayers);
    turnPlayer = jogadorInicial;
    createPlayerBoards(numPlayers);
    createCirculos(numPlayers);
    createSummaryTable(numPlayers);
    createOverlayDiv();
    resetBagAndDiscard();
    inicioDaRodada();
  }
}

//shows round over modal at end of round
function showsRoundOver() {
  modalRoundOver.style.display = "block";
  modalRoundOver.classList.add("fadeInOut");
}

//hides round over modal and shows round summary modal
function showsSummary() {
  createSummaryRows(numPlayers);
  modalRoundOver.classList.remove("fadeInOut");
  modalRoundOver.style.display = "none";
  modalRoundSummary.style.display = "block";
  resetPoints(numPlayers);
}

//hides round summary modal and shows round start modal
modalBtnSummary.onclick = function() {
  modalRoundSummary.style.display = "none";
  firstPlayerText.textContent = "First player: " + names[jogadorInicial];
  firstPlayerColour.style.backgroundColor = colours[jogadorInicial];
  modalRoundStart.style.display = "block";
}

//hides round start modal
modalBtnStart.onclick = function() {
  modalRoundStart.style.display = "none";
  highlightTurnPlayerBoard();
  overlayPlayersColours();
}

//changes turn player value
function changeTurnPlayer() {
  if (turnPlayer == numPlayersArray[numPlayersArray.length - 1]) {
    turnPlayer = numPlayersArray[0];
  } else {
    let index = numPlayersArray.indexOf(turnPlayer) + 1;
    turnPlayer = numPlayersArray[index];
  }
}

//draws a colored border around turn player's board
function highlightTurnPlayerBoard() {
  let allBoards = document.getElementsByClassName("playerBoards");
  for (let i = 0; i < allBoards.length; i++) {
    allBoards[i].setAttribute("style", "border: none;");
  }
  let board = document.getElementById("player" + turnPlayer);
  board.setAttribute("style", "border: 5px solid " + colours[turnPlayer]);
}

//creates div for gray overlay
function createOverlayDiv() {
  for (let i = 0; i < numPlayers; i++) {
    let overlayDiv = document.createElement("div");
    document.getElementById("playerColourDiv" + i).appendChild(overlayDiv);
  }
}

//creates a gray overlay effect on top of the players colored circles, except for the turn player
function overlayPlayersColours() {
  let allCircles = document.querySelectorAll(".colourCircle");
  let arrayCircles = Array.from(allCircles);
  for (let i = 0; i < arrayCircles.length; i++) {
    for (let j = 0; j < arrayCircles[i].children.length; j++) {
      if (arrayCircles[i] != document.getElementById("playerColourDiv" + turnPlayer)) {
        arrayCircles[i].children[j].classList.add("overlayDiv");
      } else {
        arrayCircles[i].children[j].classList.remove("overlayDiv");
      }
    }
  }
}

//writes players names next to their boards
function writePlayerName() {
  for(let i = 0; i < numPlayers; i++) {
    let name = document.getElementById("playerNameDiv" + i);
    name.textContent = names[i];
  }
}

//writes players points next to their boards
function writePlayerPoints() {
  for(let i = 0; i < numPlayers; i++) {
    let currentPoints = document.getElementById("playerPointsDiv" + i);
    currentPoints.textContent = playerPoints[i];
  }
}

//creates end game points table
function createEndTable() {
  endGameTable.textContent = "";
  document.getElementById("endGameHeader").textContent = "";
  let winner = document.createElement("P");
  winner.textContent = "Winner: ";
  winner.classList.add("endGameText");
  document.getElementById("endGameHeader").appendChild(winner);
  let congratulations = document.createElement("P");
  congratulations.textContent = "Congratulations!";
  congratulations.classList.add("endGameText");
  document.getElementById("endGameHeader").appendChild(congratulations);
  let positionText = document.createElement("P");
  positionText.textContent = "Position";
  positionText.classList.add("endGameColumns");
  endGameTable.appendChild(positionText);
  let playerText = document.createElement("P");
  playerText.textContent = "Player";
  playerText.classList.add("endGameColumns");
  endGameTable.appendChild(playerText);
  let ingameScoreText = document.createElement("P");
  ingameScoreText.textContent = "In-game score";
  ingameScoreText.classList.add("endGameColumns");
  endGameTable.appendChild(ingameScoreText);
  let finalRoundScoreText = document.createElement("P");
  finalRoundScoreText.textContent = "Final round score";
  finalRoundScoreText.classList.add("endGameColumns");
  endGameTable.appendChild(finalRoundScoreText);
  let endGameScoreText = document.createElement("P");
  endGameScoreText.textContent = "End game score";
  endGameScoreText.classList.add("endGameColumns");
  endGameTable.appendChild(endGameScoreText);
  let finalScoreRows = createFinalScoreDivs();
  endGameTable.style.setProperty('--grid-rows', (numPlayers + 1));
  for(let i = 0; i < numPlayers; i++) {
    let cellPosition = document.createElement("div");
    cellPosition.textContent = "#" + (i + 1);
    cellPosition.classList.add("cell");
    endGameTable.appendChild(cellPosition);
    endGameTable.appendChild(finalScoreRows[i]);
  }
}

//creates divs for end game points table
function createFinalScoreDivs() {
  let finalScoreRows = [];
  for(let i = 0; i < numPlayers; i++) {
    let finalScoreDiv = document.createElement("div");
    finalScoreDiv.setAttribute("id", "finalScoreDiv" + i);
    let cellPlayerName = document.createElement("div");
    cellPlayerName.textContent = names[i];
    cellPlayerName.setAttribute("id", "cellPlayerName" + i);
    cellPlayerName.classList.add("cell");
    finalScoreDiv.appendChild(cellPlayerName);
    let cellIngameScore = document.createElement("div");
    cellIngameScore.textContent = playerPoints[i];
    cellIngameScore.setAttribute("id", "cellIngameScore" + i);
    cellIngameScore.classList.add("cell");
    finalScoreDiv.appendChild(cellIngameScore);
    let cellFinalRoundScore = document.createElement("div");
    cellFinalRoundScore.textContent = finalPoints[i];
    cellFinalRoundScore.setAttribute("id", "cellFinalRoundScore" + i);
    cellFinalRoundScore.classList.add("cell");
    finalScoreDiv.appendChild(cellFinalRoundScore);
    let cellEndGameScore = document.createElement("div");
    cellEndGameScore.textContent = playerPoints[i] + finalPoints[i];
    cellEndGameScore.setAttribute("id", "cellEndGameScore" + i);
    cellEndGameScore.classList.add("cell", "finalScore");
    finalScoreDiv.appendChild(cellEndGameScore);
    finalScoreRows.push(finalScoreDiv);
  }
  finalScoreRows.sort(function(a, b) {
    let scoreA = a.querySelectorAll(".finalScore")[0].textContent;
    let scoreB = b.querySelectorAll(".finalScore")[0].textContent;
    return scoreB - scoreA;
  });
  return finalScoreRows;
}

//shows end game modal
function showsEndGame() {
  createEndTable();
  modalEndGame.style.display = "block";
}

//buttons functions for end game modal
modalBtnSamePlayers.onclick = function() {
  modalEndGame.style.display = "none";
  modalSettings.style.display = "block";
}

modalBtnDifPlayers.onclick = function() {
  modalEndGame.style.display = "none";
  modal.style.display = "block";
}

//array que contem todos os tiles do jogo
//array that contains all the tiles from the game
let tipoTiles = [
  { cor: "Azul", quantidadeTiles: 20, status: false },
  { cor: "Vermelho", quantidadeTiles: 20, status: false },
  { cor: "Amarelo", quantidadeTiles: 20, status: false },
  { cor: "Preto", quantidadeTiles: 20, status: false },
  { cor: "Branco", quantidadeTiles: 20, status: false }
];

//coloca todos os tiles dentro da array da sacola
//puts all tiles inside the bag's array
function createBag() {
  for(let i = 0; i < tipoTiles.length; i++) {
    for(let j = 0; j < tipoTiles[i].quantidadeTiles; j++) {
      bag.push(tipoTiles[i].cor);
    }
  }
}

//cria factories displays de acordo com a quantidade de jogadores
//creates factories displays according to the number of players
function createCirculos(numPlayers) {
  megaDiv.textContent = "";
  circuloMaster = [];
  let numCirculos = (numPlayers * 2) + 1;
  for(let i = 0; i < numCirculos; i++) {
    let factDisplay = [];
    circuloMaster.push(factDisplay);
    let div = document.createElement('div');
    div.setAttribute('id', 'factory' + i);
    div.setAttribute('class', 'factoriesDisplay');
    let div2 = document.createElement("div");
    div2.setAttribute("id", "factoryDisplayImage" + i);
    div2.setAttribute('class', 'factoriesDisplayImage');
    /*let factoryImage = document.createElement('img');
    factoryImage.setAttribute('src', 'assets/factoryDisplay.png');
    factoryImage.setAttribute('class', 'factoriesImages');
    div2.appendChild(factoryImage);*/
    div2.appendChild(div);
    megaDiv.appendChild(div2);
  }
}

// Cria div que vai representar o mesao (factory display especial que recebe os tiles nao coletados pelo jogador da vez)
//creates div for the big table (special factory display that receives the tiles not collected by the turn's player)
function createMesaoFactoryDisplay() {
  centerTable.textContent = "";
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
  centerTable.appendChild(div);
}

//puts all tiles on tilesDiscard array inside bag array and empties tilesDiscard array
function refillBag() {
  for (let k = 0; k < tilesDiscard.length; k++) {
    bag.push(tilesDiscard[k]);
    tilesDiscard.splice(k, 1);
  }
}

//Pega os tiles dentro da sacola, e distribui aleatoriamente nos factories displays
//Randomly distributes the tiles from the bag on the factories displays
function distributeTiles() {
  for(let i = 0; i < circuloMaster.length; i++) {
    for(let j = 0; j < 4; j++) {
      if (bag.length <= 0) {
        refillBag();     
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
//returns the selected tile's colour
function selectTileColor() {
  for(i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function() {
      for (let k = 0; k < tiles.length ; k++) {
        tiles[k].selected = false;
        tiles[k].setAttribute("style", "border: none;");
      }
      pid = this.parentNode.id;
      factDisplayNum = pid.substr(-1, 1);
      nid = this.id;
      factDisplayColor = nid.replace(/[0-9]/g, '');
      tilesSameColor = document.querySelectorAll("#" + pid + ">." + factDisplayColor);
      for (j = 0; j < tilesSameColor.length; j++) {
        tilesSameColor[j].setAttribute("style", "border: 2px solid red;");
        tilesSameColor[j].selected = true;
      };
      checkRowConditions();
    });
  }
}

//checks if row in player board is able to receive tiles and enables/disables it
function checkRowConditions() {
  playerButtons = document.querySelectorAll("#playerButtons" + turnPlayer + ">.playerRowsButtons");
    for (let l = 0; l < playerButtons.length; l++) {
      playerButtons[l].disabled = true;
      playerButtons[l].setAttribute("style", "border: none;");
      //está lotada a fileira
      if (allPlayerBoards[turnPlayer][l].length == l + 1) {
        continue;
      //a fileira não está lotada e a cor selecionada não é a mesma cor que já está na fileira
      } else if (allPlayerBoards[turnPlayer][l].length > 0 && !allPlayerBoards[turnPlayer][l].includes(factDisplayColor)) {
        continue;
      //a cor já foi pontuada
      } else if (allPlayerPointsBoards[turnPlayer][l].includes(factDisplayColor)) {
        continue;
      //td bem
      } else {
        playerButtons[l].disabled = false;
        playerButtons[l].setAttribute("style", "border: 2px solid red;");
      }
    }
}

// Essa função esta responsavel por tirar os tiles da array dos factory displays e mover pra array selecionada do jogador
// takes the selected tiles out of the factory display array and puts them into the player's selected array
function moveTileSelected() {
  for(let i = 0; i < circuloMaster[factDisplayNum].length; i++) {
    // Seleciona todas os tiles com a mesma cor do tile clicado
    if(circuloMaster[factDisplayNum][i] == factDisplayColor) {
        // Envia o excesso dos tiles para a linha de pontos negativos do jogador
        if (allPlayerBoards[valueA][valueB].length == valueB + 1) {
          if (allPlayerBoards[valueA][5].length < 7) {
            allPlayerBoards[valueA][5].push(factDisplayColor);
          // Se a linha de pontos negativos do jogador ja estiver lotada, envia o excesso de tiles que iria para lá direto para o descarte.
          } else {
            tilesDiscard.push(factDisplayColor);
          }
          continue;
        }
        // adiciona o tile da cor selecionada para a linha do tabuleiro do jogador
        allPlayerBoards[valueA][valueB].push(factDisplayColor);
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
  // Remove todos os azulejos selecionados dos factory displays
  let allTilesInThisFactDisplay = document.querySelectorAll("#" + pid + ">.tilesImage");
  for (let l = 0; l < allTilesInThisFactDisplay.length; l++) {
    allTilesInThisFactDisplay[l].remove();
  }
}

//moves the first player tile to a player's board
function moveTileFirstPlayer() {
  if (mesao[0] == "Firstplayer") {
    allPlayerBoards[valueA][5].push(mesao[0]);
    let variavelzinha2 = document.createElement("img");
    variavelzinha2.setAttribute("src", "assets/FirstPlayer.jpg");
    variavelzinha2.setAttribute("class", "tilesImage");
    document.getElementById("playerNegativePoints" + valueA).appendChild(variavelzinha2);
    let tileFirstPlayer = document.querySelector("#firstPlayer");
    tileFirstPlayer.remove();
    mesao.splice(0, 1);
  }
}

// Essa função esta responsavel por tirar os tiles da array do mesao e mover pra array selecionada do jogador
// takes the selected tiles out of the big table array and puts them into the player's selected array
function moveTileSelectedMesao() {
  // if (allPlayerBoards[valueA][valueB].length == valueB + 1) {
  //   return;
  // }
  for(let i = 0; i < mesao.length; i++) {
    // Seleciona todas os tiles com a mesma cor do tile clicado
    if(mesao[i] == factDisplayColor) {
      moveTileFirstPlayer();
    if (allPlayerBoards[valueA][valueB].length == valueB + 1) {
        // Envia o excesso dos tiles para a linha de pontos negativos do jogador
        if (allPlayerBoards[valueA][5].length < 7) {
          allPlayerBoards[valueA][5].push(factDisplayColor);
        // Se a linha de pontos negativos do jogador ja estiver lotada, envia o excesso de tiles que iria para lá direto para o descarte.
        } else {
          tilesDiscard.push(factDisplayColor);
        }
        continue;
      }
      // adiciona o tile da cor selecionada para a linha do tabuleiro do jogador
      allPlayerBoards[valueA][valueB].push(factDisplayColor);
      // Deleta o tile da cor movida do factory display
      mesao.splice(i, 1);
      i--;
    }
  }
  let tilesInMesaoOfSameColor = document.querySelectorAll("#mesao>." + factDisplayColor + "");
  for (let n = 0; n < tilesInMesaoOfSameColor.length; n++) {
    tilesInMesaoOfSameColor[n].remove();
  }
}

//Essa função está sendo responsavel por desenhar nas fileiras do tabuleiro do jogador os tiles que foram adicionados para a fileira.
function drawTileSelected() {
  if (document.getElementById('fileira' + valueA + valueB).childElementCount == valueB + 1) {
    return;
  }
  for(let m = 0; m < tilesSameColor.length; m++) {
    console.log(allPlayerBoards[valueA][5].length);
    if (document.getElementById('fileira' + valueA + valueB).childElementCount == 0) {
      let variavelzinha2 = document.createElement("img");
      variavelzinha2.setAttribute("src", "assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg");
      variavelzinha2.setAttribute("class", "tilesImage");
      //let variavelzinha2 = "<img src='assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg' class='tilesImage'>";
      document.getElementById('fileira' + valueA + valueB).appendChild(variavelzinha2);
    } else if (document.getElementById("fileira" + valueA + valueB).childElementCount < valueB + 1 && allPlayerBoards[valueA][valueB].includes(factDisplayColor)) {
      let variavelzinha2 = document.createElement("img");
      variavelzinha2.setAttribute("src", "assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg");
      variavelzinha2.setAttribute("class", "tilesImage");
      //let variavelzinha2 = "<img src='assets/" + allPlayerBoards[valueA][valueB][m] + ".jpg' class='tilesImage'>";
      document.getElementById('fileira' + valueA + valueB).appendChild(variavelzinha2);
    } else if (document.getElementById("fileira" + valueA + valueB).childElementCount < valueB + 1 && !allPlayerBoards[valueA][valueB].includes(factDisplayColor)) {
      break;
    } else if (document.getElementById("playerNegativePoints" + valueA).childElementCount < 7) {
      let variavelzinha2 = document.createElement("img");
      variavelzinha2.setAttribute("src", "assets/" + factDisplayColor + ".jpg");
      variavelzinha2.setAttribute("class", "tilesImage");
      document.getElementById("playerNegativePoints" + valueA).appendChild(variavelzinha2);
      console.log("perdendo pontosssss");
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
      tilesSameColor = document.querySelectorAll("#mesao>." + corAtual);
      for (j = 0; j < tilesSameColor.length; j++) {
        tilesSameColor[j].setAttribute("style", "border: 2px solid red;");
      };
      checkRowConditions();
    });
    div.appendChild(drawTile);
}

// desenha os tiles que vão para o board de pontos
function drawTilePointsBoard() {
  let variavelzinha3 = document.createElement("img");
  variavelzinha3.setAttribute("src", "assets/" + allPlayerBoards[valueC][valueD][0] + ".jpg");
  variavelzinha3.setAttribute("class", "tilesImage");
  document.getElementById("pointsRow" + valueC + valueD + placement).appendChild(variavelzinha3);
}

// cria cada board dos jogadores com 5 fileiras em cada um
function createPlayerBoards(numPlayers) {
  let div = document.querySelector("#playerArea1");
  let playerArea2 = document.querySelector("#playerArea2");
  div.textContent = "";
  playerArea2.textContent = "";
  //cria uma div pra cada board de jogador
  for (let i = 0; i < numPlayers; i++) {
    let div8 = document.createElement("div");
    div8.setAttribute("id", "player" + i);
    div8.classList.add("playerBoards");
    let playerInfo = document.createElement("div");
    playerInfo.setAttribute("id", "playerInfo" + i);
    playerInfo.classList.add("info");
    let playerColourDiv = document.createElement("div");
    playerColourDiv.setAttribute("id", "playerColourDiv" + i);
    playerColourDiv.classList.add("colourCircle");
    playerColourDiv.style.backgroundColor = colours[i];
    let playerInfoBG = document.createElement("div");
    playerInfoBG.setAttribute("id", "playerInfoBG" + i);
    playerInfoBG.classList.add("playerInfoBG");
    let playerNameDiv = document.createElement("span");
    playerNameDiv.setAttribute("id", "playerNameDiv" + i);
    playerNameDiv.classList.add("playerNameDiv");
    let playerPointsDiv = document.createElement("span");
    playerPointsDiv.setAttribute("id", "playerPointsDiv" + i);
    playerPointsDiv.classList.add("playerPointsDiv");
    playerPointsDiv.classList.add("fa", "fa-star");
    let div2 = document.createElement("div");
    div2.setAttribute("id", "playerBoard" + i);
    let div6 = document.createElement("div");
    div6.setAttribute("id", "playerButtons" + i);
    let div4 = document.createElement("div");
    div4.setAttribute("id", "playerPointsBoards" + i);
    allPlayerBoards[i] = [];
    allPlayerPointsBoards[i] = [];
    playerPoints[i] = 0;
    plusPoints[i] = 0;
    minusPoints[i] = 0;
    finalPoints[i] = 0;
    for (let j = 0; j < 5; j++) {
      // Cria fileiras de pontuação e arrays dessas fileiras
      for (let k = 0; k < 5; k++) {
        let div5 = document.createElement("div");
        div5.setAttribute("id", "pointsRow" + i + j + k);
        div5.setAttribute("class", "pointsRow" + j);
        div4.appendChild(div5);
      }
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
            changeTurnPlayer();
            highlightTurnPlayerBoard();
            overlayPlayersColours();
          } else {
            moveTileSelected();
            changeTurnPlayer();
            highlightTurnPlayerBoard();
            overlayPlayersColours();
          }

        // Adiciona os azulejos selecionados ao player board do jogador
        drawTileSelected();
        // Desativa todos os botões novamente
        playerButtons = document.querySelectorAll(".playerRowsButtons");
        for (let l = 0; l < playerButtons.length; l++) {
            playerButtons[l].disabled = true;
            playerButtons[l].setAttribute("style", "border: none;");
        }

        // Checa se a rodada ja terminou
        endRound = checkEnd();

        if (mesao.length == 0 && endRound == true) {
          fimDaRodada();
        }
      });
      tileRow.setAttribute("class", "playerRowsButtons rowButtons" + j);
      div6.appendChild(tileRow);
    }
    //cria 6 fileiras em cada playerboard presente dentro do allPlayerBoards
      for (let k = 0; k < 6; k++) {
        let div3 = document.createElement("div");
        if (k == 5) {
          div3.setAttribute("id", "playerNegativePoints" + i);
          div8.appendChild(div3);
        } else {
          div3.setAttribute("id", "fileira" + i + k);
          div3.setAttribute("class", "fileira" + k);
          div2.appendChild(div3);
        }
        allPlayerBoards[i][k] = [];
    }
    playerInfoBG.appendChild(playerNameDiv);
    playerInfoBG.appendChild(playerPointsDiv);
    div8.appendChild(div2);
    div8.appendChild(div4);
    div8.appendChild(div6);
    switch (i) {
      case 0:
        playerInfo.appendChild(playerColourDiv);
        playerInfo.appendChild(playerInfoBG);
        div.appendChild(playerInfo);
        div.appendChild(div8);
        break;
      case 1:
        playerInfo.appendChild(playerInfoBG);
        playerInfo.appendChild(playerColourDiv);
        playerArea2.appendChild(playerInfo);
        playerArea2.appendChild(div8);
        break;
      case 2:
        playerInfo.appendChild(playerColourDiv);
        playerInfo.appendChild(playerInfoBG);
        div.appendChild(div8);
        div.appendChild(playerInfo);
        break;
      case 3:
        playerInfo.appendChild(playerInfoBG);
        playerInfo.appendChild(playerColourDiv);
        playerArea2.appendChild(div8);
        playerArea2.appendChild(playerInfo);
    }
  }
  writePlayerName();
  writePlayerPoints();
}

//deleta os tiles do board do jogador no final de cada rodada
function erasePlayerBoard() {
    document.getElementById("fileira" + valueC + valueD).textContent = "";
    document.getElementById("playerNegativePoints" + valueC).textContent = "";
    //console.log("apagou as coisa");
}

//Checa se a rodada ja terminou
function checkEnd() {
  for (let o = 0; o < circuloMaster.length; o++) {
    if (circuloMaster[o].length > 0) {
      return false;
    }
  };
  return true;
}

function fimDaRodada() {
  // Hora de escorar as fileiras de cada jogador que já estiverem completas
  for (let i = 0; i < allPlayerBoards.length; i++) {
    for (let j = 0; j < allPlayerBoards[i].length; j++) {
      if(allPlayerBoards[i][j].length == j + 1) {
        // Primeiro, descarta todos os tiles em excesso
        for (let k = 0; k < 5; k++) {
          if (allPlayerBoards[i][j].length > 1) {
            tilesDiscard.push(allPlayerBoards[i][j][0]);
            //console.log("add no descarte");
            allPlayerBoards[i][j].splice(0, 1);
            //console.log("tirou excesso");
          }
        }

        valueC = i;
        valueD = j;
        let dTiles = j;
        let sTiles = j;
        erasePlayerBoard();

        // Depois, move o tile que sobrou para pontuar
        if (allPlayerBoards[i][j][0] == "Azul") {
          placement = j;
          if (placement > 4) {
            placement = placement - 5;
          }
          drawTilePointsBoard();
          //console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Amarelo") {
          placement = j + 1;
          if (placement > 4) {
            placement = placement - 5;
          }
          drawTilePointsBoard();
          //console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Vermelho") {
          placement = j + 2;
          if (placement > 4) {
            placement = placement - 5;
          }
          drawTilePointsBoard();
          //console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Preto") {
          placement = j + 3;
          if (placement > 4) {
            placement = placement - 5;
          }
          drawTilePointsBoard();
          //console.log("placement value is:  " + placement);
        }

        else if (allPlayerBoards[i][j][0] == "Branco") {
          placement = j + 4;
          if (placement > 4) {
            placement = placement - 5;
          }
          drawTilePointsBoard();
          //console.log("placement value of white is:  " + placement);
        }

        allPlayerPointsBoards[i][j][placement] = allPlayerBoards[i][j][0];
        playerPoints[i]++;
        plusPoints[i]++;
        allPlayerBoards[i][j].splice(0, 1);
        //console.log("tirou último tile restante");

        if (placement > 0 ) {
          while (allPlayerPointsBoards[i][j][placement - 1]) {
            playerPoints[i]++;
            plusPoints[i]++;
            placement--;
        }
      }

        if (placement < 4) {
          while (allPlayerPointsBoards[i][j][placement + 1]) {
            playerPoints[i]++;
            plusPoints[i]++;
            placement++;
        }
      }

        if (dTiles > 0) {
          while (dTiles > 0 && allPlayerPointsBoards[i][dTiles - 1][placement]) {
            playerPoints[i]++;
            plusPoints[i]++;
            dTiles--;
        }
      }

        if (sTiles < 4) {
            while (sTiles < 4 && allPlayerPointsBoards[i][sTiles + 1][placement]) {
            playerPoints[i]++;
            plusPoints[i]++;
            sTiles++;
          }
        }
      }
    }
    let negativeRowSize = allPlayerBoards[i][5].length;
    // console.log("a length de negativeRowSize eh: " + negativeRowSize);
    // console.log("sua quantidade de pontos atual antes de perder pontos eh: " + playerPoints[i]);
    switch (negativeRowSize) {
      case 1:
        minusPoints[i]++;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 2:
        minusPoints[i] = 2;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 3:
        minusPoints[i] = 4;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 4:
        minusPoints[i] = 6;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 5:
        minusPoints[i] = 8;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 6:
        minusPoints[i] = 11;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      case 7:
        minusPoints[i] = 14;
        //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);
        break;
      default:
        //console.log("Nao perdeu ponto, parabens meu filho");
    }

    playerPoints[i] = playerPoints[i] - minusPoints[i];
    //console.log("sua quantidade de pontos depois de perder pontos eh: " + playerPoints[i]);

    /*let currentPoints = document.getElementById("playerPointsDiv" + i);
    currentPoints.textContent = playerPoints[i];*/

    for (let l = 0; l < allPlayerBoards[i][5].length; l++) {
      if (allPlayerBoards[i][5][l] == "Firstplayer") {
        jogadorInicial = i;
        turnPlayer = jogadorInicial;
        allPlayerBoards[i][5].splice(l, 1);
        l--;
      } else {
        tilesDiscard.push(allPlayerBoards[i][5][l]);
        allPlayerBoards[i][5].splice(l, 1);
        l--;
      }
    }
  }
  showsRoundOver();
  setTimeout(showsSummary, 4000);

  // Vai fazer o check de se o jogo ja acabou
  for (let i = 0; i < allPlayerPointsBoards.length; i++) {
    for (let j = 0; j < allPlayerPointsBoards[i].length; j++) {
      endGameCounter = 0;
      for (let k = 0; k < allPlayerPointsBoards[i][j].length; k++) {
        if (allPlayerPointsBoards[i][j][k] != null) {
          endGameCounter++;
          // console.log("tem peçaaaaaaaaaaa");
          // console.log(endGameCounter);
        }
      }
      if (endGameCounter == 5) {
        endGame = true;
        //console.log("É TETRA!");
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
        finalPoints[i] += 2;
      }
    }
    if (quantAzul == 5) {
      finalPoints[i] += 10;
    }
    if (quantVermelho == 5) {
      finalPoints[i] += 10;
    }
    if (quantAmarelo == 5) {
      finalPoints[i] += 10;
    }
    if (quantPreto == 5) {
      finalPoints[i] += 10;
    }
    if (quantBranco == 5) {
      finalPoints[i] += 10;
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
          //console.log("tem objeto nessa coluna");
        }
        if (colunaCompletada == 5) {
          finalPoints[i] += 7;
        }
      }
    }
  }
  showsEndGame();
  // console.log("Pontos do jogador 1: " + finalPoints[0]);
  // console.log("Pontos do jogador 2: " + finalPoints[1]);
}

// console.log(circuloMaster);
//createPlayerBoards(numPlayers);
//createCirculos(numPlayers);

function inicioDaRodada() {
  createBag();
  createMesaoFactoryDisplay();
  distributeTiles();
  selectTileColor();
}
//inicioDaRodada();
