// 화면 뼈대 단계: 저장 및 CSV 기능은 아직 구현하지 않습니다.
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("check-date");

  // 점검일 기본값만 오늘 날짜로 설정합니다. 데이터 저장은 하지 않습니다.
  if (dateInput && !dateInput.value) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 10);
    dateInput.value = localDate;
  }

  // 다음 단계에서 저장 및 CSV 내보내기 동작을 연결할 예정입니다.
});
