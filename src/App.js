import { useState } from "react";
import Header from "./components/Header";
import Table from "./components/Table/Table";
import UserInput from "./components/UserInput/UserInput";


function App() {
  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };

  const yearlyData = [];

  if (userInput) {
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution
      });
    }
  }

  return (
    <div>
      <Header></Header>
      <UserInput onCalculate={calculateHandler}></UserInput>
      {!userInput && <p>No Investment.</p>}
      {userInput && <Table data={yearlyData} initialInvestment={userInput["current-savings"]}></Table> }
    </div>
  );
}

export default App;
