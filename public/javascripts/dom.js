module.exports = {
  gameboard: function (boardSize) {
    var boardSize = 10;
    //create rows based on board size
    for (var i = 0; i < boardSize.length; i++) {
      var row = document.createElement(tr);
        for (var j = 0; j < boardSize.length; j++) {
          var cell = document.createElement(td);
          row.appendChild(cell);
        }
    }
    document.body.appendChild(row);
  }

}
