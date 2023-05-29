import { getHiddenCompanies } from "@src/utils/storage";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { updateFront } from "./script";
reloadOnUpdate("pages/background");

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === "UPDATE_HIDDEN_COMPANIES") {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTab = tabs[0];
      chrome.tabs.reload(currentTab.id);
    });
  }
});

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (
      details.url.includes("algolia.net") &&
      details.initiator.includes("welcometothejungle.com")
    ) {
      console.log("Found api call, waiting 1 seconds before executing script");
      await delay(1000); // waiting for data to be loaded into the DOM
      const hiddenCompanies = await getHiddenCompanies();
      chrome.scripting.executeScript({
        target: { tabId: details.tabId },
        func: updateFront,
        args: [hiddenCompanies],
      });
    }
  },
  {
    urls: ["*://*.algolia.net/*"],
  }
);
