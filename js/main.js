// 구현하고 싶은 기능
/*
현재 연도 월의 달력을 표시 ok
각 요일 표시    ok
각 요일 일수 표시 ok
이전월 다음월 이동 가능

현재 요일 표시
토요일과 일요일 색상 변경
*/

let date = new Date();

let thisYear = date.getFullYear(); //연도
let thisMonth = date.getMonth(); //월

let calendar = () => {
  // 현재 연도 월 표시

  //   월 표시할때 0부터시 시작하기때문에 +1를 해준다
  document.getElementById("date").innerHTML = `${thisYear}년 ${
    thisMonth + 1
  }월`;

  // 이전달 마지막날짜 표시
  let prevLastDayOfMonth = new Date(thisYear, thisMonth, 0).getDate();

  //   이번달 첫번째 날짜 표시 와 마지막 날짜 표시
  let ThisFirstDayOfMonth = new Date(thisYear, thisMonth, 1);
  let ThislastDayOfMonth = new Date(thisYear, thisMonth + 1, 0).getDate();
  //   thisMonth + 1를 사용하는 이유는 다음 달의 첫 날을 설정하고, 그 날짜의 하루 전날을 구하는 방법

  // 다음달 첫번째 날짜(요일) 표시
  let nextFirstDayOfMonth = new Date(thisYear, thisMonth + 1, 1).getDay();

  //   이번달 첫번째 요일이 무엇인지 알아보는 코드
  let startDayOfWeek = ThisFirstDayOfMonth.getDay();

  // 날짜 배열
  let Days = [];
  //   다음달 배열
  let nextDay = [];
  //   이전달 날짜 넣기
  //   31(이전달 마지막날) - 6(시작요일) + 0 +1 ==> 26
  for (let i = 0; i < startDayOfWeek; i++) {
    // 0부터 시작하기 때문에 +1 해준다
    Days.push(prevLastDayOfMonth - startDayOfWeek + i + 1);
  }
  for (let i = 0; i < Days.length; i++) {
    document.getElementsByClassName(
      "date-wrap"
    )[0].innerHTML += `<li class = "prevWeek">${Days[i]}</li>`;
  }

  // 이번달 날짜 넣기
  for (let i = 1; i <= ThislastDayOfMonth; i++) {
    Days.push(i);
  }

  for (let i = startDayOfWeek; i < Days.length; i++) {
    document.getElementsByClassName(
      "date-wrap"
    )[0].innerHTML += `<li>${Days[i]}</li>`;
  }

  //   다음달 날짜 넣기
  //    다음달 토요일까지 찾고 토요일까지 날 표시

  for (let i = nextFirstDayOfMonth; i <= 6; i++) {
    // 다음날 첫번째 일 넣기
    //
    nextDay.push(
      /* 다음 달 첫 번째 날이 수요일(3)이고 
            i가 3이라면, 3 - 3 + 1 = 1로 계산되어 다음 달 1일이 됨.
            i가 4일 때, 4 - 3 + 1 = 2로 계산되어 다음 달 2일이됨.
        이 방식으로 i가 증가함에 따라 다음 달의 날짜가 계산됩니다. 
        
        다음달 첫째날 요일에서 1,2,3일 저장
        */
      new Date(thisYear, thisMonth + 1, i - nextFirstDayOfMonth + 1).getDate()
    );
  }
  //   다음달 첫번째날부터 ~ 다음달 배열갯수(토요일) 까지
  for (let i = 0; i < nextDay.length; i++) {
    document.getElementsByClassName(
      "date-wrap"
    )[0].innerHTML += `<li class="nextWeek">${nextDay[i]}</li>`;
  }

  //   배열의 첫번째(일요일)에서 7 더한값들만 red
  for (let i = 0; i < Days.length + nextDay.length; ) {
    // li 배열 위치 찾고 style주기
    let hol = document.querySelectorAll(".date-wrap li")[i];
    hol.style.color = "red";
    i += 7;
  }
  //   배열의 7번째(토요일)에서 7 더한값들만 blue
  //   여기선 다음달 배열까지 포함해야함
  for (let i = 6; i < Days.length + nextDay.length; ) {
    // li 배열 위치 찾고 style주기
    let hol = document.querySelectorAll(".date-wrap li")[i];
    hol.style.color = "blue";
    i += 7;
  }
};
calendar();

// 다음버튼
let nextBtn = document.getElementById("next");

nextBtn.addEventListener("click", function () {
  thisMonth++;
  if (thisMonth > 11) {
    // 12월일 경우 다음 해 1월로 넘어감
    thisMonth = 0;
    thisYear++;
  }
  //   let date = new Date(thisYear, thisMonth, 1); // 다음 달의 첫 번째 날로 설정
  document.getElementsByClassName("date-wrap")[0].innerHTML = "";

  calendar();
});
// 이전버튼
let prevBtn = document.getElementById("prev");

prevBtn.addEventListener("click", function () {
  thisMonth--;
  if (thisMonth < 0) {
    // 1월일 경우 이전 해 12월로 넘어감
    thisMonth = 11;
    thisYear--;
  }
  //   let date = new Date(thisYear, thisMonth, 1); // 다음 달의 첫 번째 날로 설정
  document.getElementsByClassName("date-wrap")[0].innerHTML = "";

  calendar();
});

// github (06.03)
