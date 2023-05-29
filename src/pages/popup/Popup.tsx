import { useEffect, useState } from "react";
import cross from "@assets/img/delete.svg";
import "@pages/popup/Popup.css";
import {
  getHiddenCompanies,
  removeFromHiddenCompanies,
} from "@src/utils/storage";

const Popup = () => {
  const [hiddenCompanies, setHiddenCompanies] = useState<string[]>([]);

  useEffect(() => {
    getHiddenCompanies().then((companies) => setHiddenCompanies(companies));
  }, []);

  const handleRemoveCompany = async (company) => {
    const companies = await removeFromHiddenCompanies(company);
    setHiddenCompanies(companies);
    chrome.runtime.sendMessage({ type: "UPDATE_HIDDEN_COMPANIES" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>WTTJ Enhancer</h2>
        <h4>Hidden Companies:</h4>
        <div className="companies">
          {hiddenCompanies.length === 0 && <p>No hidden companies</p>}
          {hiddenCompanies.map((company) => (
            <div key={company} className="company">
              <p>{company}</p>
              <img
                src={cross}
                className="cross"
                onClick={() => handleRemoveCompany(company)}
              />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Popup;
