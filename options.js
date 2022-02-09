const $options = document.querySelector("[data-options-input]");
const $saveBtn = document.querySelector("[data-save-btn]");

chrome.storage.sync.get("options", ({ options }) => {
  $options.value = JSON.stringify(options, null, 2);
});

function handleButtonClick(event) {
  const options = $options.value;
  try {
    const jsonOptions = JSON.parse(options);
    chrome.storage.sync.set({ options: jsonOptions });
  } catch (e) {
    console.log("json parse error", e);
  }
}

$saveBtn.addEventListener("click", handleButtonClick);
