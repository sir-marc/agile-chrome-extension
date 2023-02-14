const $page = document.querySelector("[data-page]");
const $templateRoot = document.querySelector("[data-template-root]");
const $peopleContainer = document.querySelector("[data-people]");

const css = `
.agile-extension {
  width: 100%;
  padding: 10px;
  z-index: 100;
  position: fixed;
  bottom: 0;
  box-shadow: 0px 0px 22px 7px rgba(0,0,0,0.44);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.timer-buttons {
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.timer-buttons button {
  margin: 0 10px;
}

.timer-display {
  font-size: 18px;
}

.people-container {
  margin-top: 10px;
  width: 100%;
  padding: 0 10px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.person-bubble {
  width: 50px;
  height: 50px;
  margin: 0 5px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  font-size: 20px;
  transition: all 0.3s;
}

.person-bubble.-hide {
  transform: scale(0.3);
  transform-origin: center;
}

.-hidden {
  display: none;
}
.-timeup {
  background: red;
  color: white;
}
`;

function setup(team) {
  const $existingRoot = document.querySelector("[data-agile-extension]");
  if ($existingRoot) $existingRoot.remove();

  const $root = document.createElement("div");
  $root.innerHTML = `
    <div class="timer-buttons" data-timer-buttons>
      <button data-timer-button="1">1min</button>
      <button data-timer-button="2">2min</button>
      <button data-timer-button="5">5min</button>
      <button data-timer-button="10">10min</button>
      <button data-timer-button="15">15min</button>
    </div>
    <div class="timer-display -hidden" data-timer-display>
      <span data-time-output></span>
      <a data-cancel>Abbrechen</a>
    </div>
    <div class="people-container">
      ${team
        .map(
          (member) =>
            '<div class="person-bubble" data-person-bubble style="background-color: ' +
            member.color +
            ';"><span class="person-name">' +
            member.firstname[0].toUpperCase() +
            member.lastname[0].toUpperCase() +
            "</span></div>"
        )
        .join("")}
    </div>
  `;

  const $display = $root.querySelector("[data-timer-display]");
  const $timeOutput = $root.querySelector("[data-time-output]");
  const $cancelBtn = $root.querySelector("[data-cancel]");
  const $timerButtons = $root.querySelector("[data-timer-buttons]");
  const $peopleBubbles = $root.querySelectorAll("[data-person-bubble]")
  let interval;

  $root
    .querySelectorAll("[data-timer-button]")
    .forEach(($btn) =>
      $btn.addEventListener("click", () => startTimer($btn.dataset.timerButton))
    );

  $cancelBtn.addEventListener("click", () => {
    clearInterval(interval);
    resetView();
  });

  $peopleBubbles.forEach($bubble => $bubble.addEventListener('click', (e) => $bubble.classList.toggle("-hide")))

  const startTimer = (time) => {
    $display.classList.remove("-hidden");
    $timerButtons.classList.add("-hidden");
    let seconds = time * 60;
    printTime(seconds);
    interval = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        timeIsUp();
      }
      printTime(seconds);
    }, 1000);
  };

  function timeIsUp() {
    clearInterval(interval);
    $root.classList.add("-timeup");
    $timeOutput.innerHTML = `Zeit vorbei`;
  }

  function resetView() {
    $root.classList.remove("-timeup");
    $display.classList.add("-hidden");
    $timerButtons.classList.remove("-hidden");
  }

  function printTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const prettyMins = mins > 9 ? mins : "0" + mins;
    const prettySecs = secs > 9 ? secs : "0" + secs;
    $timeOutput.innerHTML = `${prettyMins}:${prettySecs}`;
  }

  $root.className = "agile-extension";
  $root.dataset.agileExtension = true;
  document.body.appendChild($root);
}

chrome.storage.sync.get("options", async ({ options }) => {
  const team = shuffle(options.team);
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setup,
    args: [team],
  });
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    css,
  });
});

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
