let allTodo = [];
let classification = "all";
let sortBy = "newest";
let mode_icon = document.querySelector(".mode_icon");
let setting_icon = document.querySelector(".setting_icon");
let setting_menu = document.querySelector(".setting_menu");
let close_setting_menu_icon = document.querySelector(
  ".close_setting_menu_icon"
);
let export_li = document.querySelector(".export_li");
let export_subMenu = document.querySelector(".export_subMenu");
let theme_li = document.querySelector(".theme_li");
let theme_subMenu = document.querySelector(".theme_subMenu");
let themes = document.querySelectorAll(".themes");
let input_box_container = document.querySelector(".input_box_container");
let input_sub_btn = document.querySelector(".input_sub_btn");
let input_cancel_btn = document.querySelector(".input_cancel_btn");
let add_icon = document.querySelector(".add_icon");
let blurDiv = document.querySelector(".blurDiv");
let classification_li = document.querySelectorAll(".classification_li");
let classification_ul = document.querySelector(".classification_ul");
let classFillSort = document.querySelector(".classFillSort");
let sort_icon = document.querySelector(".sort_icon");
let sort_menu_ul = document.querySelector(".sort_menu_ul");
let sort_menu_li = document.querySelectorAll(".sort_menu_li");
let dots = document.querySelector(".dots");
let todo_container = document.querySelector(".todo_container");

//////////////////
function toggleMode() {
  document.documentElement.classList.toggle("dark");
  if (
    mode_icon.querySelector("use").getAttribute("href") === "sprite.svg#moon"
  ) {
    mode_icon.querySelector("use").setAttribute("href", "sprite.svg#sun");
    localStorage.setItem("mode", "dark");
  } else {
    mode_icon.querySelector("use").setAttribute("href", "sprite.svg#moon");
    localStorage.setItem("mode", "light");
  }
}
function getMode() {
  const mode = localStorage.getItem("mode");

  if (mode === "dark") {
    mode_icon.querySelector("use").setAttribute("href", "sprite.svg#sun");
    document.documentElement.classList.add("dark");
  } else {
    // Default to light mode
    mode_icon.querySelector("use").setAttribute("href", "sprite.svg#moon");
    document.documentElement.classList.remove("dark");
    localStorage.setItem("mode", "light");
  }
}
function toggleSettingMenu() {
  if (setting_menu.classList.contains("notActiveSettingMenu")) {
    setting_menu.classList.add("activeSettingMenu");
    setting_menu.classList.remove("notActiveSettingMenu");
    sort_menu_ul.classList.remove("activeSortUl");
    sort_menu_ul.classList.add("notActiveSortUl");
  } else {
    setting_menu.classList.remove("activeSettingMenu");
    setting_menu.classList.add("notActiveSettingMenu");
  }
}
function ToggleSortMenu() {
  if (sort_menu_ul.classList.contains("notActiveSortUl")) {
    sort_menu_ul.classList.add("activeSortUl");
    sort_menu_ul.classList.remove("notActiveSortUl");
    setting_menu.classList.remove("activeSettingMenu");
    setting_menu.classList.add("notActiveSettingMenu");
  } else {
    sort_menu_ul.classList.remove("activeSortUl");
    sort_menu_ul.classList.add("notActiveSortUl");
  }
}
function closeSettingMenu() {
  setting_menu.classList.remove("activeSettingMenu");
  setting_menu.classList.add("notActiveSettingMenu");
}
function toggle_settingMenu_li_subMenu(li) {
  if (li.classList.contains("notActiveSettingMenuUl")) {
    li.classList.add("activeSettingMenuUl");
    li.classList.remove("notActiveSettingMenuUl");
    li.previousElementSibling.querySelector(".down_icon").classList.add("up");
  } else {
    li.classList.remove("activeSettingMenuUl");
    li.classList.add("notActiveSettingMenuUl");
    li.previousElementSibling
      .querySelector(".down_icon")
      .classList.remove("up");
  }
}
function changeTheme(element) {
  let color = getComputedStyle(element).backgroundColor;
  input_box_container.style.borderColor = color;
  classFillSort.style.boxShadow = `0px 1px 2px 0px ${color}`;
} // use in html
function getAndAddToLocal(event) {
  console.log(event.target[0].value);

  event.preventDefault();
  if (event.target.form[0].value.trim() !== "") {
    let new_obj = {
      title: event.target.form[0].value.trim(),
      difficulty: event.target.form[1].value,
      status: event.target.form[2].value,
      des: event.target.form[3].value.trim(),
      time: new Date(),
    };
    if (JSON.parse(localStorage.getItem("todoS")) !== null) {
      allTodo = JSON.parse(localStorage.getItem("todoS"));
      allTodo.push(new_obj);
    } else {
      allTodo.push(new_obj);
    }

    localStorage.setItem("todoS", JSON.stringify(allTodo));
    clearForm(event);
    getShowFromLocal(sortBy, classification);
  }
} // use in html
function getAndAddToLocalByEnter(event) {
  console.log(event.target[0].value);

  event.preventDefault();
  if (event.target[0].value.trim() !== "") {
    let new_obj = {
      title: event.target[0].value.trim(),
      difficulty: event.target[1].value,
      status: event.target[2].value,
      des: event.target[3].value.trim(),
      time: new Date(),
    };
    if (JSON.parse(localStorage.getItem("todoS")) !== null) {
      allTodo = JSON.parse(localStorage.getItem("todoS"));
      allTodo.push(new_obj);
    } else {
      allTodo.push(new_obj);
    }

    localStorage.setItem("todoS", JSON.stringify(allTodo));
    event.target[0].value = "";
    event.target[1].value = "easy";
    event.target[2].value = "not completed";
    event.target[3].value = "";
    event.target[0].focus();
    getShowFromLocal(sortBy, classification);
  }
}
function clearForm(event) {
  event.target.form[0].value = "";
  event.target.form[1].value = "easy";
  event.target.form[2].value = "not completed";
  event.target.form[3].value = "";
  event.target.form[0].focus();
} //use in getAndAddToLocal function
function toggleAddModal() {
  if (input_box_container.classList.contains("hiddenAddModal")) {
    input_box_container.classList.add("showAddModal");
    input_box_container.classList.remove("hiddenAddModal");
    blurDiv.classList.add("blurShow");
    blurDiv.classList.add("blurHidden");
    input_box_container[0].focus();
  } else {
    input_box_container.classList.remove("showAddModal");
    input_box_container.classList.add("hiddenAddModal");
    blurDiv.classList.remove("blurShow");
    blurDiv.classList.add("blurHidden");
  }
}
function selectClassification(event) {
  classification_li.forEach((li) => {
    if (event.target.innerHTML === li.innerHTML) {
      event.target.classList.remove("notActiveBg");
      classification = li.innerHTML.trim(); //why??
      console.log(sortBy, classification);
      getShowFromLocal(sortBy, classification);
    } else {
      li.classList.add("notActiveBg");
    }
  });
}
function selectSortLi(event) {
  sort_menu_li.forEach((li) => {
    if (event.target.innerHTML === li.innerHTML) {
      event.target.classList.remove("notActiveBg");
      sortBy = event.target.innerHTML.trim();
      ToggleSortMenu();
      getShowFromLocal(sortBy, classification);
    } else {
      li.classList.add("notActiveBg");
    }
  });
}

function closeAddModal(event) {
  if (event.target.classList.contains("blurDiv")) {
    input_box_container.classList.remove("showAddModal");
    input_box_container.classList.add("hiddenAddModal");
    blurDiv.classList.remove("blurShow");
    blurDiv.classList.add("blurHidden");
  }
}
function ToggleDone(input) {
  // input.nextElementSibling.classList.toggle("done"); //update dom
  console.log(input.checked);

  let item = JSON.parse(input.dataset.item);
  let newArrAfterEdit = [];
  newArrAfterEdit = JSON.parse(localStorage.getItem("todoS")).map((todo) => {
    if (todo.time === item.time) {
      return {
        ...todo,
        status: `${item.status === "done" ? "not completed" : "done"}`,
      };
    }
    return todo;
  });
  localStorage.setItem("todoS", JSON.stringify(newArrAfterEdit));
  getShowFromLocal(sortBy, classification);
}
function ToggleDotsMenu(event) {
  const allMenus = document.querySelectorAll(".dots_menu"); // Select all dot menus
  const clickedMenu = event.target.nextElementSibling;
  allMenus.forEach((menu) => {
    if (menu !== clickedMenu) {
      menu.classList.add("hiddenDotsMenu"); // Hide all others
    }
  });

  clickedMenu.classList.toggle("hiddenDotsMenu");
}
function removeTodo(el) {
  let item = JSON.parse(el.dataset.item);
  let newArrAfterRemove = [];
  newArrAfterRemove = JSON.parse(localStorage.getItem("todoS")).filter(
    (todo) => {
      return todo.time !== item.time;
    }
  );
  localStorage.setItem("todoS", JSON.stringify(newArrAfterRemove));
  getShowFromLocal(sortBy, classification);
}
//////////////////////////////////

add_icon.addEventListener("click", () => toggleAddModal());
mode_icon.addEventListener("click", toggleMode);
setting_icon.addEventListener("click", toggleSettingMenu);
close_setting_menu_icon.addEventListener("click", toggleSettingMenu);
sort_icon.addEventListener("click", ToggleSortMenu);
sort_menu_li.forEach((li) => {
  li.addEventListener("click", selectSortLi);
});
classification_li.forEach((li) => {
  li.addEventListener("click", selectClassification);
});

export_li.addEventListener("click", () =>
  toggle_settingMenu_li_subMenu(export_subMenu)
);
theme_li.addEventListener("click", () =>
  toggle_settingMenu_li_subMenu(theme_subMenu)
);
/////////////////////////
function getShowFromLocal(sortBy, classification) {
  let newArr = [];
  const difficultyOrder = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  if (
    JSON.parse(localStorage.getItem("todoS")) !== null &&
    JSON.parse(localStorage.getItem("todoS")).length > 0
  ) {
    newArr = JSON.parse(localStorage.getItem("todoS")).filter((item) => {
      if (classification === "all") {
        return item;
      }
      if (classification === "not completed") {
        return item.status === "not completed";
      }
      if (classification === "done") {
        return item.status === "done";
      }
    });
    if (sortBy === "oldest") {
      newArr.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
    if (sortBy === "newest") {
      newArr.sort((a, b) => new Date(b.time) - new Date(a.time));
    }
    if (sortBy === "hardest") {
      newArr.sort(
        (a, b) => difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
      );
    }
    if (sortBy === "easyest") {
      newArr.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    }
    if (newArr.length === 0) {
      todo_container.innerHTML = "";
      todo_container.insertAdjacentHTML(
        `beforeend`,
        `<p class="text-center">No todo to show :(</p>`
      );
    } else {
      todo_container.innerHTML = "";
      newArr.forEach((item) => {
        todo_container.insertAdjacentHTML(
          `beforeend`,
          ` <div  class="flex flex-col border-1 border-b-gray-600 p-1.5 rounded-md">
        <!-- difficulty + dots -->
        <div class="flex flex-row justify-between">
          <p class=' ${
            item.difficulty === "easy"
              ? "text-green-400"
              : item.difficulty === "medium"
              ? "text-yellow-400"
              : item.difficulty === "hard"
              ? "text-red-500"
              : null
          }'>${item.difficulty}</p>
          <div class="relative">
            <svg onclick="ToggleDotsMenu(event)" class="dots size-5 cursor-pointer">
              <use href="sprite.svg#dots"></use>
              <ul
                class="dots_menu hiddenDotsMenu absolute top-3 right-4 bg-SapGreen dark:bg-Sepia flex flex-col gap-1.5 p-1 rounded-md"
              >
                <li class="cursor-pointer">edit</li>
                <li data-item='${JSON.stringify(
                  item
                )}' class="cursor-pointer" onclick='removeTodo(this)'>remove</li>
              </ul>
            </svg>
          </div>
        </div>
        <!-- title -->
        <label class="w-fit">
          <input
          ${item.status === "done" ? "checked" : ""}
          data-item='${JSON.stringify(item)}'
          type="checkbox" onclick="ToggleDone(this)" />
          <span class=${item.status === "done" ? "done" : null} >${
            item.title
          }</span>
        </label>

        <!-- description -->
        <p class="text-gray-400">
          ${item.des !== "" ? item.des : "No description"}
        </p>
        <!-- status -->
        <p class='ml-auto font-extralight ${
          item.status === "done" ? "text-green-400" : "text-red-500"
        }'>${item.status}</p>
      </div>`
        );
      });
    }
  } else {
    todo_container.innerHTML = "";
    todo_container.insertAdjacentHTML(
      `beforeend`,
      `<p class="text-center">No todo to show :(</p>`
    );
  }
}
window.addEventListener("load", getShowFromLocal(sortBy, classification));
window.addEventListener("load", getMode());
document.addEventListener("click", (event) => closeAddModal(event));
////////////////////////
