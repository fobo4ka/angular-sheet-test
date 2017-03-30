app.controller('MainController', ['$scope', function ($scope) {

    $scope.rows = 0;
    $scope.table = [];
    $scope.dropdownIsShow = false;
    $scope.ids = [];
    $scope.text = '';
    $scope.errorRow = false;
    $scope.errorText = false;

    var nColumns = 5;
    var dropdown = angular.element(document.querySelector('.dropdown-menu'));
    var hoverCell;

    function getRandomeNumer(min, max) {
        return Math.random() * (max - min) + min;
    }

    function randomValue(seed) {
        return "" + Math.round(getRandomeNumer(0, seed * 100));
    }

    $scope.buildTable = function () {
        var rows = $scope.rows;
        if (rows > 0) {
            var table = [];
            for(var i = 0; i < rows; i++) {
                var r = [];
                table[i] = r;
                for (var j = 0; j < nColumns; j++) {
                    r[j] = {
                        value: randomValue(rows),
                        id: cellId(i, j)
                    };
                }
            }
            $scope.table = table;
            $scope.errorRow = false;
        } else {
            $scope.errorRow = true;
        }
    }

    function positionDropdown(target) {
        dropdown.css({
            top: target.offsetTop + target.offsetHeight - 5 + "px",
            left: target.offsetLeft + "px"
        })
    }

    $scope.checkDropdown = function($event) {
        if ($event.currentTarget === dropdown[0]) {
            return;
        }
        if (!$event.target.getAttribute('data-cell') && $event.target !== hoverCell) {
            hoverCell = null;
            $scope.dropdownIsShow = false;
        } else {
            hoverCell = $event.target;
            positionDropdown($event.target);
            $scope.dropdownIsShow = true;
        }
    }

    function cellPosition(cell) {
        var id = cell.getAttribute('data-cell');
        return {
            row: Math.floor(id / nColumns),
            col: id % nColumns
        };
    }

    function cellData(cell) {
        var pos = cellPosition(cell);
        return $scope.table[pos.row][pos.col];
    }

    function cellId(row, col) {
        return row * nColumns + col;
    }

    $scope.deleteRow = function() {
        var pos = cellPosition(hoverCell);
        var table = $scope.table;
        table.splice(pos.row, 1);

        for(var i = pos.row; i < table.length; i++) {
            var r = table[i];
            for (var j = 0; j < nColumns; j++) {
                var cell = r[j];
                cell.id = cellId(i, j);
            }
        }
    } 

    $scope.deleteSymbolInCell = function() {
        deleteSymbol(cellData(hoverCell));
    }

    $scope.deleteSymbolInAllCell = function() {
        var pos = cellPosition(hoverCell);
        var r = $scope.table[pos.row];
        for (var j = 0; j < nColumns; j++) {
            deleteSymbol(r[j]);
        }
    }

    function deleteSymbol(cell) {
        cell.value = cell.value.substring(1);
    }

    $scope.addTextRowInCell = function() {
        addTextRow(cellData(hoverCell));
    }

    $scope.addTextRowInTheEndOfEachCell = function() {
        var pos = cellPosition(hoverCell);
        var r = $scope.table[pos.row];
        for (var j = 0; j < nColumns; j++) {
            addTextRow(r[j]);
        }
    }

    function addTextRow(cell) {
        if (!$scope.text) {
            $scope.errorText = true;
        } else {
            $scope.errorText = false;
        }
        cell.value = cell.value + $scope.text;
    }
}]);