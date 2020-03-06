import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ClculateLoanPayload, RecalculateLoanPayload } from '../../store/types';

import {
  calculateLoan,
  recalculateLoan,
  loansSelector
} from '../../store/calculator';

import './LoanCalculator.css';

import LoanForm from '../loanForm/LoanForm';
import LoanOffers from '../loanOffers/LoanOffers';

const LoanCalculator = (): React.ReactElement => {
  const dispatch = useDispatch();

  const loans = useSelector(loansSelector);

  const handleSubmit = (data: ClculateLoanPayload): void => {
    dispatch(calculateLoan(data));
  };

  const handleInterestChange = (data: RecalculateLoanPayload): void => {
    dispatch(recalculateLoan(data));
  };

  return (
    <div className="LoanCalculator">
      <h1>Loan Calculator</h1>

      <LoanForm onSubmit={handleSubmit} />

      <LoanOffers onInterestChange={handleInterestChange} loans={loans} />
    </div>
  );
};

export default LoanCalculator;
