$(document).ready(function () {
  const $listContainer = $("#ft_list");
  const $newBtn = $("#newBtn");

  // 1. Load the list from Cookie
  function loadList() {
    const cookies = document.cookie.split(";");
    const todoCookie = cookies.find((row) => row.trim().startsWith("ft_list="));

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
  }

  loadList();

  $newBtn.on("click", function () {
    const todoText = prompt("Please enter a new TO DO:");
    if (todoText && todoText.trim() !== "") {
      addTodoToDOM(todoText);
      saveListToCookie();
    }
  });

  // 3. Function to create the DOM element
  function addTodoToDOM(text) {
    const $div = $("<div></div>").text(text);

    $div.on("click", function () {
      const confirmDelete = confirm("Do you really want to delete this TO DO?");
      if (confirmDelete) {
        $(this).remove();
        saveListToCookie();
      }
    });

    $listContainer.prepend($div);
  }

  // 4. Save list to cookie
  function saveListToCookie() {
    const todos = $listContainer
      .children()
      .map(function () {
        return $(this).text();
      })
      .get();

    const jsonString = encodeURIComponent(JSON.stringify(todos));

    // Set cookie
    const date = new Date();
    date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const expires = "; expires=" + date.toUTCString();

    document.cookie = "ft_list=" + jsonString + expires + "; path=/";
  }
});
