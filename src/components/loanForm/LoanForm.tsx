import React, { useState } from 'react';

import { ClculateLoanPayload } from '../../store/types';

import DataEntry from '../dataEntry/DataEntry';

import './LoanForm.css';

const LoanForm = ({
  onSubmit
}: {
  onSubmit: (data: ClculateLoanPayload) => void;
}): React.ReactElement => {
  const [amount, setAmount] = useState();
  const [duration, setDuration] = useState();

  const handleAmount = (value: string): void => {
    setAmount(value);
  };
  const handleDuration = (value: string): void => {
    setDuration(value);
  };

  const handleSubmit = (): void => {
    onSubmit({ amount, duration });
  };

  return (
    <div className="LoanForm">
      <DataEntry
        label="Amount requested"
        unit="£"
        onChnage={handleAmount}
        value={amount}
      />
      <DataEntry
        label="Duration"
        unit="months"
        onChnage={handleDuration}
        value={duration}
      />
      <button onClick={handleSubmit}>Calculate</button>
    </div>
  );
};

export default LoanForm;
