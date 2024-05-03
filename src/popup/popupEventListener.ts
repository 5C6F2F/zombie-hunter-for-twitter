export function popupEventListener() {
  const open_button = document.getElementById("open-button");
  const close_button = document.getElementById("close-button");
  const zombies = document.getElementById("zombies");

  if (!(open_button && close_button && zombies)) {
    return;
  }

  open_button.addEventListener("click", (event) => {
    event.preventDefault();
    open_button.style.display = "none";
    close_button.style.display = "flex";
    zombies.style.display = "block";
  });

  close_button.addEventListener("click", (event) => {
    event.preventDefault();
    open_button.style.display = "flex";
    close_button.style.display = "none";
    zombies.style.display = "none";
  });

  const zombieElements = document.getElementsByClassName("tweet-url");
  Array.from(zombieElements).forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      chrome.tabs.create({ url: element.getAttribute("href")! });
    });
  });
}
