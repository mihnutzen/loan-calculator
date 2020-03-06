import React from 'react';

import './App.css';

import LoanCalculator from '../loanCalculator/LoanCalculator';

const App = (): React.ReactElement => {
  return (
    <div className="App">
      <LoanCalculator />
    </div>
  );
};

export default App;
