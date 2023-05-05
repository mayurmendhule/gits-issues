const issuesList = document.getElementById("issues-list");
const loadPrevButton = document.getElementById("load-prev");
const loadNextButton = document.getElementById("load-next");
const pageHeading = document.getElementById("page-heading");

let currentPage = 1;

async function getIssues() {
  const url = `https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`;
  const response = await fetch(url);
  const issues = await response.json();
  return issues;
}

function renderIssues(issues) {
  issuesList.innerHTML = "";
  issues.forEach((issue) => {
    const issueItem = document.createElement("li");
    issueItem.textContent = issue.title;
    issuesList.appendChild(issueItem);
  });
}

function loadIssues(page) {
  currentPage = page;
  getIssues().then((issues) => {
    renderIssues(issues);
    pageHeading.textContent = `Page number ${currentPage}`;
  });
}

loadIssues(currentPage);

loadPrevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    loadIssues(currentPage - 1);
  }
});

loadNextButton.addEventListener("click", () => {
  currentPage++;
  loadIssues(currentPage);
});
