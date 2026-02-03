const listContainer = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

// 1. Load the list from cookies when the page opens
window.onload = function () {
  const cookies = document.cookie.split(";");
  let todoCookie = cookies.find((row) => row.trim().startsWith("ft_list="));

  if (todoCookie) {
    const jsonString = decodeURIComponent(todoCookie.split("=")[1]);
    try {
      const savedList = JSON.parse(jsonString);
      for (let i = savedList.length - 1; i >= 0; i--) {
        addTodoToDOM(savedList[i]);
      }
    } catch (e) {
      console.error("Cookie parse error", e);
    }
  }
};

// 2. "New" button
newBtn.addEventListener("click", () => {
  const todoText = prompt("Please enter a new TO DO:");
  if (todoText && todoText.trim() !== "") {
    addTodoToDOM(todoText);
    saveListToCookie();
  }
});

// 3. Function to create the DOM element and add listeners
function addTodoToDOM(text) {
  const div = document.createElement("div");
  div.textContent = text;

  // delete
  div.addEventListener("click", function () {
    const confirmDelete = confirm("Do you really want to delete this TO DO?");
    if (confirmDelete) {
      this.remove();
      saveListToCookie();
    }
  });

  // Requirement: "placed at the top of the list"
  listContainer.prepend(div);
}

// 4. save list to cookie
function saveListToCookie() {
  const todos = [];
  const items = listContainer.children;

  for (let i = 0; i < items.length; i++) {
    todos.push(items[i].textContent);
  }

  const jsonString = encodeURIComponent(JSON.stringify(todos));

  // Set cookie
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
  const expires = "; expires=" + date.toUTCString();

  document.cookie = "ft_list=" + jsonString + expires + "; path=/";
}
