'use strict';
(function() {
  let counter = 0;
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  class Calendar {

    constructor(container) {
      this.container = container;
      this.selectedDate = new Date();
      this.currentDate = new Date();
      this.counter = counter++;
      this.generateHeader();
      this.generateTable();
      this.generateDays();
      this.selectCellCurrent();
    }

    generateTable() {
      this.table = document.createElement('table');
      this.container.appendChild(this.table);

      let daysRow = document.createElement('tr');
      this.table.appendChild(daysRow);

      for (let i = 0; i < 7; i++) {
        let tableCol = document.createElement('th');
        tableCol.appendChild(document.createTextNode(days[i]));
        daysRow.appendChild(tableCol);
      }

      this.tableCells = [];
      for (let i = 0; i < 6; i++) {
        this.tableCells[i] = [];
        let tableRow = document.createElement('tr');
        this.table.appendChild(tableRow);
        for (let j = 0; j < 7; j++) {
          let tableCol = document.createElement('td');
          tableCol.id = 'calendar_' + this.counter + '_id_' + (i * 7 + j);
          tableRow.appendChild(tableCol);
          this.tableCells[i][j] = tableCol;
          let self = this;
          if (j == 0 || j == 6)
            tableCol.style.color = '#cc2424';
          if (i * 7 + j == this.currentDate.getDate() + 1) {
            this.todayCell = {
              id : this.tableCells[i][j].id,
              m : this.currentDate.getMonth(),
              y : this.currentDate.getFullYear(),
            }
          }
          tableCol.addEventListener('click', function() {
              if (this.innerHTML != '') {
                self.selectedDate = new Date(self.currentDate);
                self.selectedDate.setDate(parseInt(this.innerHTML));
                self.selectCellCurrent();
              }
          });
        }
      }
    }

    changeInput() {
      let d = this.selectedDate;
      this.input.value = d.getFullYear()  + "/" + (d.getMonth() + 1) + "/" + d.getDate();
    }

    clearSelectedCell() {
      if (this.selectedCell) {
        this.selectedCell.classList.remove('selectedCell');
      }
    }

    selectCellCurrent() {
      let self = this;
      self.clearSelectedCell();
      let selectedD = self.selectedDate;
      let currendD = self.currentDate;
      if (currendD.getMonth() != selectedD.getMonth()
          || currendD.getYear() != selectedD.getYear()) {
        return;
      }
      self.changeInput();
      let elements = self.table.getElementsByTagName('td');
      let id;
      for (let e of elements) {
        if (e.innerText == selectedD.getDate()) {
          id = e.id;
        }
      }
      self.selectedCell = document.getElementById(id);
      self.selectedCell.classList.add('selectedCell');
    }

    buttonEvent(num) {
      let self = this;
      self.currentDate.setMonth(self.currentDate.getMonth() + num);
      self.generateDays();
      self.selectCellCurrent();
    }

    generateHeader() {
      let self = this;
      this.input = document.createElement('input');
      this.container.appendChild(this.input);
      this.changeInput();
      this.input.addEventListener('change', function () {
        let value = this.value;
        let newDate = new Date(this.value);
        if (!isNaN(newDate.getTime()) && value.split('/')[2] == newDate.getDate()) {
          self.selectedDate = new Date(newDate);
          self.currentDate = new Date(newDate);;
          self.generateDays();
          self.selectCellCurrent();
        }
      });

      let bar = document.createElement('div');
      this.container.appendChild(bar);
      bar.classList.add('bar');

      let leftButton = document.createElement('button');

      leftButton.addEventListener('click', function() {
        self.buttonEvent(-1);
      });

      let rightButton = document.createElement('button');

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
      let firstDay = (new Date(this.currentDate.getFullYear(),
       this.currentDate.getMonth(), 1)).getDay();

      let lastDay = (new Date(this.currentDate.getFullYear(),
       this.currentDate.getMonth() + 1, 0)).getDay();

      let lastRow = false;
      let day = 1;
      let days = this.daysInMonth();
      let d = this.currentDate;

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
          let tableCol = this.tableCells[i][j];
          if ((i === 0 && j < firstDay) || day > days) {
            tableCol.innerHTML = '';
          }
          else {
            let t = this.todayCell;
            let c = this.tableCells[i][j];
            t.id == c.id && t.m == d.getMonth() && t.y == d.getFullYear() ?
              c.classList.add('todayCell') : c.classList.remove('todayCell');
            if (i == 5) lastRow = true;
            tableCol.innerHTML = day++;
          }
        }
      }
      this.currentMonth.innerHTML = months[d.getMonth()] + ' ' +
        d.getFullYear();
      this.table.lastChild.style.display = !lastRow ? 'none' : 'table-row';
    }

    daysInMonth () {
      let date = this.currentDate;
      return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
    }

  }

  window.onload = function() {
    let calendars = document.getElementsByClassName('calendar');
    for (let index of calendars) {
      new Calendar(index);
    }
  }
})();
