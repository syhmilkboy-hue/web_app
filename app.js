// 점검 항목 데이터: 항목을 추가/수정하려면 이 배열만 편집하세요.
const CHECK_ITEMS = [
  { id: "srv-01", category: "서버", name: "서버 가동 상태" },
  { id: "srv-02", category: "서버", name: "CPU/메모리 사용률" },
  { id: "srv-03", category: "서버", name: "디스크 여유 공간" },
  { id: "bkp-01", category: "백업", name: "전일 야간 백업 성공 여부" },
  { id: "bkp-02", category: "백업", name: "백업 로그 확인" },
  { id: "net-01", category: "네트워크", name: "인터넷 회선 상태" },
  { id: "net-02", category: "네트워크", name: "스위치/AP 이상 램프 확인" },
  { id: "sec-01", category: "보안", name: "백신 서버 패턴 업데이트" },
  { id: "sec-02", category: "보안", name: "방화벽 로그 이상 여부" },
  { id: "env-01", category: "환경", name: "서버실 온도" },
  { id: "env-02", category: "환경", name: "습도" },
  { id: "env-03", category: "환경", name: "UPS 상태" }
];

const STATUS_OPTIONS = ["정상", "주의", "이상"];

document.addEventListener("DOMContentLoaded", () => {
  setTodayAsDefault();
  renderChecklist();
});

function setTodayAsDefault() {
  const dateInput = document.getElementById("check-date");
  if (!dateInput || dateInput.value) return;
  const now = new Date();
  dateInput.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  if (!container) return;
  container.replaceChildren();

  // 배열에 등장한 순서대로 분류를 묶습니다.
  const categories = new Map();
  CHECK_ITEMS.forEach((item) => {
    if (!categories.has(item.category)) categories.set(item.category, []);
    categories.get(item.category).push(item);
  });

  categories.forEach((items, category) => {
    const card = document.createElement("section");
    card.className = "category-card";
    card.setAttribute("aria-label", category + " 점검 항목");

    const header = document.createElement("div");
    header.className = "category-header";
    const title = document.createElement("h4");
    title.className = "category-title";
    title.textContent = category;
    const count = document.createElement("span");
    count.className = "category-count";
    count.textContent = items.length + "개 항목";
    header.append(title, count);

    const list = document.createElement("div");
    list.className = "item-list";
    items.forEach((item) => list.appendChild(createChecklistItem(item)));
    card.append(header, list);
    container.appendChild(card);
  });
}

function createChecklistItem(item) {
  const row = document.createElement("div");
  row.className = "check-item";
  row.dataset.itemId = item.id;

  const nameBlock = document.createElement("div");
  nameBlock.className = "item-name";
  nameBlock.textContent = item.name;
  const idLabel = document.createElement("span");
  idLabel.className = "item-id";
  idLabel.textContent = item.id;
  nameBlock.appendChild(idLabel);

  const statusGroup = document.createElement("div");
  statusGroup.className = "status-options";
  statusGroup.setAttribute("role", "radiogroup");
  statusGroup.setAttribute("aria-label", item.name + " 상태");

  STATUS_OPTIONS.forEach((status, index) => {
    const label = document.createElement("label");
    label.className = "status-option";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "status-" + item.id;
    radio.value = status;
    radio.checked = index === 0;
    radio.addEventListener("change", () => {
      row.classList.toggle("is-abnormal", radio.checked && radio.value === "이상");
    });
    const statusText = document.createElement("span");
    statusText.textContent = status;
    label.append(radio, statusText);
    statusGroup.appendChild(label);
  });

  const memo = document.createElement("input");
  memo.type = "text";
  memo.className = "memo-input";
  memo.name = "memo-" + item.id;
  memo.placeholder = "메모 입력 (선택)";
  memo.setAttribute("aria-label", item.name + " 메모");
  memo.autocomplete = "off";

  row.append(nameBlock, statusGroup, memo);
  return row;
}
