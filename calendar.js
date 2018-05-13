'use strict';
(function() {
  var counter = 0;
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  class Calendar {

    constructor(container) {
      this.container = container;
      this.currentDate = new Date();
      this.counter = counter++;
      this.generateHeader();
      this.generateTable();
      this.generateDays();
    }

    generateTable() {
      this.table = document.createElement('table');
      this.container.appendChild(this.table);

      let daysRow = document.createElement('tr');
      this.table.appendChild(daysRow);

      for (var i = 0; i < 7; i++) {
        let tableCol = document.createElement('th');
        tableCol.appendChild(document.createTextNode(days[i]));
        daysRow.appendChild(tableCol);
      }

      for (var i = 0; i < 6; i++) {
        let tableRow = document.createElement('tr');
        this.table.appendChild(tableRow);
        for (var j = 0; j < 7; j++) {
          let tableCol = document.createElement('td');
          tableCol.id = 'calendar_' + this.counter + '_id_' + (i * 7 + j);
          tableRow.appendChild(tableCol);
          var self = this;
          tableCol.addEventListener('click', function() {
              if (this.innerHTML != ' ') {
                self.clearSelectedCell();
                self.currentDate.setDate(parseInt(this.innerHTML));
                self.selectedCell = this;
                this.classList.add('selectedCell');
                self.changeInput();
              }
          });
        }
      }
    }

    changeInput() {
      var d = this.currentDate;
      this.input.value = d.getFullYear()  + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    }

    clearSelectedCell() {
      if (this.selectedCell) {
        this.selectedCell.classList.remove('selectedCell');
      }
    }

    selectCellCurrent() {
      var self = this;
      self.clearSelectedCell();
      self.generateDays();
      var d = self.currentDate;
      var id;
      var elements = this.table.getElementsByTagName('td');
      for (var e of elements) {
        if (e.innerHTML == d.getDate())
          id = e.id;
      }
      self.selectedCell = document.getElementById(id);
      self.selectedCell.classList.add('selectedCell');
    }

    buttonEvent(num) {
      var self = this;
      self.currentDate.setMonth(self.currentDate.getMonth() + num);
      self.generateDays();
      self.clearSelectedCell();
      self.changeInput();
    }

    generateHeader() {
      var self = this;
      this.input = document.createElement('input');
      this.container.appendChild(this.input);
      this.changeInput();
      this.input.addEventListener('change', function () {
        var value = this.value;
        var newDate = new Date(this.value);
        if (!isNaN(newDate.getTime())) {
          self.currentDate = newDate;
          self.selectCellCurrent();
        }
      });

      var bar = document.createElement('div');
      this.container.appendChild(bar);
      bar.classList.add('bar');

      var leftButton = document.createElement('button');

      leftButton.addEventListener('click', function() {
        self.buttonEvent(-1);
      });

      var rightButton = document.createElement('button');

      rightButton.addEventListener('click', function(){
        self.buttonEvent(1);
      });

      this.currentMonth = document.createElement('div');

      leftButton.innerHTML = '<img src="images/leftArrow.png" />';
      rightButton.innerHTML = '<img src="images/rightArrow.png" />';

      bar.appendChild(leftButton);
      bar.appendChild(this.currentMonth);
      bar.appendChild(rightButton);
    }

    generateDays() {
      var firstDay = ((new Date(this.currentDate.getFullYear(),
       this.currentDate.getMonth(), 1)).getDay());

      var lastDay = ((new Date(this.currentDate.getFullYear(),
       this.currentDate.getMonth() + 1, 0)).getDay());

      var lastRow = false;
      var day = 1;
      var days = this.daysInMonth();

      for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
          var tableCol = document.getElementById('calendar_' + this.counter + '_id_' + (i * 7 + j));
          if ((i === 0 && j < firstDay) || day > days) {
            tableCol.innerHTML = ' ';
          }
          else {
            if (i == 5) lastRow = true;
            if (j == 0 || j == 6)
              tableCol.style.color = '#cc2424';
            tableCol.innerHTML = day++;
          }
        }
      }
      this.currentMonth.innerHTML = months[this.currentDate.getMonth()] + ' ' +
        this.currentDate.getFullYear();
      this.table.lastChild.style.display = !lastRow ? 'none' : 'table-row';
    }

    daysInMonth () {
      var date = this.currentDate;
      return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    }

  }

  window.onload = function() {
    var calendars = document.getElementsByClassName('calendar');
    for (let index of calendars) {
      new Calendar(index);
    }
  }
})();
