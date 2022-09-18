import { useState, useEffect, createContext, useContext } from "react";

const EmpDataContext = createContext();

const EmpDataProvider = ({ children }) => {
  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees"
        );
        const data = await response.json();
        console.log(data);
        setEmpData(data);
        setLoading(false);
      } catch (err) {
        console.error(err.message);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <EmpDataContext.Provider value={{ empData, loading }}>
      {children}
    </EmpDataContext.Provider>
  );
};

const useEmpData = () => {
  const context = useContext(EmpDataContext);

  if (context === undefined) {
    throw new Error("useEmpData must be used within a EmpDataProvider");
  }

  return context;
};

export { useEmpData, EmpDataProvider };
