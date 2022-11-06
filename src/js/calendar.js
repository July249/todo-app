class Calendar {
  constructor(year, month) {
    this.inputYear = year;
    this.inputMonth = month;
    this.startDayOfMonth = new Date(this.inputYear, this.inputMonth - 1, 1);
    this.endDayOfMonth = new Date(this.inputYear, this.inputMonth, 0).getDate();

    this.currYear = this.startDayOfMonth.getFullYear();
    this.currMonth = this.startDayOfMonth.getMonth();
    this.currDate = this.startDayOfMonth.getDate();
    this.currDay = this.startDayOfMonth.getDay();
  }

  makeCalendar(timeNode, yearNode, monthNode, daysNodeList) {
    for (let i = 0; i < daysNodeList.length; i++) {
      daysNodeList[i].innerHTML = '&nbsp;';
    }

    for (let i = this.currDay; i < this.currDay + this.endDayOfMonth; i++) {
      daysNodeList[i].innerHTML = `
        <button type="button" class="modal-btn">${this.currDate}</button>
      `;

      this.currDate++;
    }

    yearNode.textContent = this.currYear;
    monthNode.textContent = this.currMonth + 1;
    timeNode.dateTime = `${this.currYear}-${this.currMonth + 1}`;
  }
}

export default Calendar;
