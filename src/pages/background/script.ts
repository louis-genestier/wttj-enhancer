export const updateFront = (hiddenCompanies: string[]) => {
  const jobsList = document.querySelector("#job-search-results");
  const jobs = jobsList.querySelectorAll(
    ":scope > div"
  ) as NodeListOf<HTMLElement>;

  let jobsCount = 0;
  let jobsCountHidden = 0;

  jobs.forEach((job) => {
    if (job.hasAttribute("class")) {
      job.remove();
      return;
    } // removing the feedback message
    jobsCount++;

    const companyName = job
      .querySelectorAll("img")[1]
      .parentNode.parentNode.querySelector("span").textContent;

    // removing from the view if the company is hidden
    if (hiddenCompanies.includes(companyName)) {
      job.remove();
      jobsCountHidden++;
    }

    job.style.display = "flex";
    job.style.flexDirection = "column";
    job.style.gap = "10px";
    const hideButton = document.createElement("button");
    hideButton.textContent = "Masquer cette entreprise";
    hideButton.addEventListener("click", () => {
      chrome.storage.local.get("hiddenCompanies", (result) => {
        const hiddenCompanies = result.hiddenCompanies || [];
        hiddenCompanies.push(companyName);
        chrome.storage.local.set({ hiddenCompanies }, () => {
          chrome.runtime.sendMessage({ type: "UPDATE_HIDDEN_COMPANIES" });
        });
      });
    });
    job.appendChild(hideButton);
  });

  console.log(
    `Jobs retrieved for this page: ${jobsCount}, hidden: ${jobsCountHidden}`
  );
};
