const defaultOpions = {
  team: [
    {
      color: "#ffadad",
      firstname: "Lukas",
      lastname: "Wilhelm",
    },
    {
      color: "#ffd6a5",
      firstname: "Lukas",
      lastname: "Kretschmar",
    },
    {
      color: "#caffbf",
      firstname: "Christian",
      lastname: "Hinder",
    },
    {
      color: "#fdffb6",
      firstname: "Robin",
      lastname: "Würgler",
    },
    {
      color: "#9bf6ff",
      firstname: "Max",
      lastname: "Ludwig",
    },
    {
      color: "#a0c4ff",
      firstname: "Marc",
      lastname: "Berli",
    },
    {
      color: "#bdb2ff",
      firstname: "Felipe",
      lastname: "Garcia",
    },
  ],
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ options: defaultOpions });
});
