const getHiddenCompanies = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("hiddenCompanies", (result) => {
      resolve(result.hiddenCompanies || []);
    });
  });
};

const addToHiddenCompanies = (companyName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("hiddenCompanies", (result) => {
      const hiddenCompanies = result.hiddenCompanies || [];
      hiddenCompanies.push(companyName);
      chrome.storage.local.set({ hiddenCompanies }, () => {
        resolve(hiddenCompanies);
      });
    });
  });
};

const removeFromHiddenCompanies = (companyName: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get("hiddenCompanies", (result) => {
      const hiddenCompanies = result.hiddenCompanies || [];
      const index = hiddenCompanies.indexOf(companyName);
      if (index > -1) {
        hiddenCompanies.splice(index, 1);
      }
      chrome.storage.local.set({ hiddenCompanies }, () => {
        resolve(hiddenCompanies);
      });
    });
  });
};

export { getHiddenCompanies, addToHiddenCompanies, removeFromHiddenCompanies };
