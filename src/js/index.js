import Calendar from './calendar.js';

let year = new Date().getFullYear();
let month = new Date().getMonth() + 1;

let calendar = new Calendar(year, month);

const captionYear = document.querySelector('.year');
const captionMonth = document.querySelector('.month');
const $time = document.querySelector('time');
const days = document.querySelectorAll('tr td');

calendar.makeCalendar($time, captionYear, captionMonth, days);

const calenderBtns = document.querySelectorAll('.calendarBtn');

calenderBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('prev')) {
      calendar = new Calendar(year, --month);
      calendar.makeCalendar($time, captionYear, captionMonth, days);
    } else {
      calendar = new Calendar(year, ++month);
      calendar.makeCalendar($time, captionYear, captionMonth, days);
    }
  });
});

/* modal */
const btnsDay = document.querySelectorAll('tr td .modal-btn');

const modal = document.querySelector('.modal-overlay');

btnsDay.forEach((btn) => {
  btn.addEventListener('click', () => {
    // console.log(e.currentTarget);
    modal.classList.toggle('open-modal');
    let day = parseInt(btn.parentNode.textContent);
    // console.log(day);
    console.log(`${year}-${month}-${day < 10 ? '0' + day : day}`);
    const $time = modal.querySelector('time');
    $time.dateTime = `"${year}-${month}-${day < 10 ? '0' + day : day}"`;
    console.log($time);
    $time.innerHTML = `<span class="year">${year}</span>년 <span class="month">${month}</span>월
    <span class="day">${day}</span>일`;

    /* todolist */
    const main = modal.querySelector('.modal-container');
    const userTask = main.querySelector('input');
    const addBtn = main.querySelector('.add-todo');
    const listTodo = main.querySelector('.list_todo');
    // const $time = modal.querySelector('time');

    // 할일 추가 이벤트
    addBtn.addEventListener('click', createListItem);

    // 경고 메세지 생성
    // const message = document.createElement('strong');
    // message.style.display = 'none';
    // message.classList.add('txt_invalid');
    // main.appendChild(message);
    // userTask.addEventListener('input', () => {
    //     message.style.display = 'none';
    // })

    // 투두를 저장할 배열
    const tasks =
      JSON.parse(localStorage.getItem(`${$time.textContent}`)) || [];

    // 초기 화면에서 저장되어있는 데이터를 가지고 목록을 생성합니다.

    if (tasks.length > 0) {
      tasks.forEach((task) => {
        genItem(task.val, task.checked);
      });
      // showDownload();
    }

    function createListItem() {
      const inpVal = userTask.value;

      if (inpVal) {
        // 할일을 저장하는 객체를 생성합니다.
        const tempTask = {
          val: inpVal,
          checked: false,
        };

        // 할일 목록에 새로운 할일을 저장합니다.
        tasks.push(tempTask);

        // 목록 요소를 생성합니다.
        genItem(inpVal, false);

        // 할일 데이터를 localStorage 에 저장합니다.
        saveTasks();

        // 다운로드 버튼 노출 함수
        // showDownload();
      } // else {
      //   errorMsg('내용을 작성해주세요');
      // }
    }

    // 목록 요소를 생성합니다.
    function genItem(val, complete) {
      const li = document.createElement('li');
      li.textContent = val;
      listTodo.appendChild(li);

      // 인풋 입력값 초기화
      userTask.value = '';

      // 만약 수행한 일이라면
      if (complete) {
        li.classList.add('done');
      }

      li.addEventListener('click', () => {
        li.classList.toggle('done');

        // 할일 데이터의 업데이트 함수
        buildTasks();
      });

      // 삭제버튼 만들기
      const btn = document.createElement('button');
      btn.classList.add('delete-btn');
      btn.textContent = '삭제';
      li.appendChild(btn);

      btn.addEventListener('click', () => {
        li.remove();

        // 할일 데이터의 업데이트 함수
        buildTasks();

        // 다운로드 버튼 노출 함수
        // showDownload();
      });
    }

    // localStorage 에 할일 목록을 저장하는 함수
    function saveTasks() {
      localStorage.setItem(`${$time.textContent}`, JSON.stringify(tasks));
    }

    // 할일 정보를 업데이트 하는 함수입니다. 할일을 클릭했을 때, 혹은 할일을 제거했을 때.
    function buildTasks() {
      tasks.length = 0; //업데이트 하기 전에 기존 데이터를 초기화합니다.
      const curList = listTodo.querySelectorAll('li');

      // 할일 정보 목록을 재생성합니다.
      curList.forEach((el) => {
        const tempTask = {
          val: el.textContent,
          checked: false,
        };

        if (el.classList.contains('done')) {
          tempTask.checked = true;
        }

        tasks.push(tempTask);
      });

      saveTasks();
    }
  });
});

const closeModalBtn = modal.querySelector('.close-btn');
closeModalBtn.addEventListener('click', () => {
  modal.classList.toggle('open-modal');
});
