let papers = [];
let currentTopic = "全部";

async function loadPapers() {
  const res = await fetch("papers.json");
  papers = await res.json();
  renderTopics();
  render(papers);
}

function renderTopics() {
  const topics = ["全部", ...new Set(papers.map(p => p.topic))];
  const container = document.getElementById("topics");
  container.innerHTML = "";
  topics.forEach(t => {
    const btn = document.createElement("button");
    btn.className = "topic-btn";
    btn.textContent = t;
    btn.onclick = () => {
      currentTopic = t;
      filterAndRender();
    };
    container.appendChild(btn);
  });
}

function filterAndRender() {
  const keyword = document.getElementById("search").value.toLowerCase();
  let filtered = papers.filter(p =>
    (p.title.toLowerCase().includes(keyword) || 
     p.topic.toLowerCase().includes(keyword))
  );
  if (currentTopic !== "全部") {
    filtered = filtered.filter(p => p.topic === currentTopic);
  }
  render(filtered);
}

function render(list) {
  const container = document.getElementById("list");
  container.innerHTML = "";
  list.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <h3>${item.title}</h3>
        <p>专题: ${item.topic}</p>
        <a href="${item.link}" target="_blank">查看</a>
      </div>
    `;
  });
}

document.getElementById("search").addEventListener("input", filterAndRender);

loadPapers();
