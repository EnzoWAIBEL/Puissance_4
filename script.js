$(document).ready(function () {
  let player = 1;
  let winner = 0;
  let colors = {};
  colors[-1] = "yellow";
  colors[1] = "red";
  let count = 0;
  let endG = 0;
  let scoreP1 = 0;
  let scoreP2 = 0;

  $(".cell").each(function () {
    $(this).attr("id", count);
    $(this).attr("data-player", 0);
    count++;
    $(".gameTxt").html("C'est a Kaiba de jouer !");
    $("#scoreP1").html("0").css("color", colors[1]);
    $("#scoreP2").html("0").css("color", colors[-1]);

    $(this).click(function () {
      if (isValid($(this).attr("id"))) {
        $(this).css("background-color", colors[player]);
        $(this).attr("data-player", player);
        endG++;
        console.log(endG);

        if (player == -1) {
          $(".gameTxt")
            .html("C'EST A TOI, KAIBA !")
            .css("color", colors[player * -1]);
        }
        if (player == 1) {
          $(".gameTxt")
            .html("A TON TOUR YUGI !")
            .css("color", colors[player * -1]);
        }
        if (checkWin(player)) {
          if (player == -1) {
            $(".gameTxt").html("Yugi a gagné !").css("color", colors[player]);
            alert("Victoire de Yugi !\nRejouer ?");
            scoreP2++;
            console.log(scoreP2);
            $("#scoreP2").html(scoreP2).css("color", colors[player]);
          }
          if (player == 1) {
            $(".gameTxt").html("Kaiba a gagné !").css("color", colors[player]);
            alert("Victoire de Kaiba !\nRejouer ?");
            scoreP1++;
            console.log(scoreP1);
            $("#scoreP1").html(scoreP1).css("color", colors[player]);
          }

          winner = player;
        }

        player *= -1;
        if (endG == 42 && winner == 0) {
          $(".gameTxt")
            .html("Égalité ! Veuillez restart la Partie.")
            .css("color", "black");
          if (window.confirm("Égalité !\nVoulez-vous rejouer ?")) {
            clearBoard();
            if (player === -1) {
              $(".gameTxt").html("Tour de Yugi !").css("color", colors[player]);
            }
            if (player === 1) {
              $(".gameTxt")
                .html("Tour de Kaiba !")
                .css("color", colors[player]);
            }
          }
        }
      }
    });
  });

  //restart button
  $("#restart").click(function () {
    clearBoard();
    if (player === -1) {
      $(".gameTxt").html("Tour de Yugi !").css("color", colors[player]);
    }
    if (player === 1) {
      $(".gameTxt").html("Tour de Kaiba !").css("color", colors[player]);
    }
  });

  function clearBoard() {
    $(".cell").each(function () {
      $(this).attr("data-player", 0);
      $(this).css("background-color", "");
      console.clear();
      endG = 0;
      winner = 0;
    });
  }

  function isValid(n) {
    let id = parseInt(n);
    console.log(id + " la ou je clique");
    if (winner !== 0) {
      return false;
    }

    if ($("#" + id).attr("data-player") === "0") {
      if (id >= 35) {
        // console.log("here1");
        return true;
      }
      if ($("#" + (id + 7)).attr("data-player") !== "0") {
        // console.log("here2");
        return true;
      }

      //boucle jusqu'a trouver la bonne case
      let i = 0;
      for (i = id; i < 42 && $("#" + i).attr("data-player") === "0"; i += 7);
      console.log(i + " position libre + 7");
    }
    return false;
  }

  function checkWin(p) {
    //vérification Horizontal
    let chain = 0;
    for (let i = 0; i < 42; i += 7) {
      for (let j = 0; j < 7; j++) {
        let cell = $("#" + (i + j));
        if (cell.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }
      chain = 0;
    }

    //vérification Vertical
    chain = 0;
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 42; j += 7) {
        let cell = $("#" + (i + j));
        if (cell.attr("data-player") == p) {
          chain++;
        } else {
          chain = 0;
        }

        if (chain >= 4) {
          return true;
        }
      }

      chain = 0;
    }

    //vérification Diagonal
    let topLeft = 0;
    let topRight = topLeft + 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (
          $("#" + topLeft).attr("data-player") == p &&
          $("#" + (topLeft + 8)).attr("data-player") == p &&
          $("#" + (topLeft + 16)).attr("data-player") == p &&
          $("#" + (topLeft + 24)).attr("data-player") == p
        ) {
          return true;
        }
        if (
          $("#" + topRight).attr("data-player") == p &&
          $("#" + (topRight + 6)).attr("data-player") == p &&
          $("#" + (topRight + 12)).attr("data-player") == p &&
          $("#" + (topRight + 18)).attr("data-player") == p
        ) {
          return true;
        }

        topLeft++;
        topRight = topLeft + 3;
      }
      topLeft = i * 7 + 7;
      topRight = topLeft + 3;
    }

    return false;
  }

  //setting color~
  $("#setting").click(function () {
    let selectColor1 = window.prompt("Couleur de Kaiba !");
    while (selectColor1 == "") {
      selectColor1 = window.prompt("Couleur de Kaiba !");
    }
    colors[1] = selectColor1;
    $("#scoreP1").html(scoreP1).css("color", colors[1]);

    let selectColor2 = window.prompt("Couleur de Yugi !");
    while (selectColor2 == "" || selectColor2 == selectColor1) {
      selectColor2 = window.prompt("Couleur de Yugi !");
    }
    colors[-1] = selectColor2;
    $("#scoreP2").html(scoreP2).css("color", colors[-1]);
  });
});

let dessin =
  "┼┼┼┼┼┼┼▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄┼┼┼┼┼┼\n┼┼┼┼┼┼┼█▒▒░░░░░░░░░▒▒█┼┼┼┼┼┼\n┼┼┼┼┼┼┼┼█░░█░░░░░█░░█┼┼┼┼┼┼┼\n┼┼┼┼─▄▄──█░░░▀█▀░░░█──▄▄─┼┼┼\n┼┼┼┼█░░█─▀▄░░░░░░░▄▀─█░░█┼┼┼\n┼██░██░████░██░░░██░░░█████┼\n┼██▄██░██▄▄░██░░░██░░░██░██┼\n┼██▀██░██▀▀░██░░░██░░░██░██┼\n┼██░██░████░████░████░█████┼";
let text =
  "[-Bienvenue sur mon Puissance 4 !-]\n\nVous incarnerez deux personnage culte de Yu-Gi-Oh, Yugi et Kaiba,\npour vous affrontez dans un duel de puissance 4.\nAlors, a vos pions !\n\nC'est l'heure D-DU-DUEL ! (ง'̀-'́)ง";

$("h1").click(function () {
  console.log(dessin);
  console.log(text);
});
