const defaultOpions = {
  team: [
    {
      "color": "#ffadad",
      "firstname": "Lukas",
      "lastname": "Wilhelm"
    },
    {
      "color": "#ffd6a5",
      "firstname": "Lukas",
      "lastname": "Kretschmar"
    },
    {
      "color": "#caffbf",
      "firstname": "Christian",
      "lastname": "Hinder"
    },
    {
      "color": "#fdffb6",
      "firstname": "Robin",
      "lastname": "Würgler"
    },
    {
      "color": "#9bf6ff",
      "firstname": "Denis",
      "lastname": "Huber"
    },
    {
      "color": "#FEC2FA",
      "firstname": "Nicolas",
      "lastname": "Kerscher"
    },
    {
      "color": "#bdb2ff",
      "firstname": "Llyn",
      "lastname": "Baumann"
    },
    {
      "color": "#F4F2DE",
      "firstname": "Said",
      "lastname": "Simokovic"
    },
    {
      "color": "#DBCC95",
      "firstname": "Tim",
      "lastname": "Bussmann"
    },
    {
      "color": "#D9EDBF",
      "firstname": "Noel",
      "lastname": "Voelin"
    }
  ],
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ options: defaultOpions });
});
