import React from 'react';

import './LoanOffers.css';

import LoanOffer from '../loanOffer/LoanOffer';

const LoanOffers = ({ loans, onInterestChange }: any): React.ReactElement => {
  const handleInterest = (data: any): void => {
    onInterestChange(data);
  };

  return (
    <div className="LoanOffers">
      {loans.map((loan: any) => (
        <LoanOffer
          key={loan.type}
          onInterestChange={handleInterest}
          {...loan}
        />
      ))}
    </div>
  );
};

export default LoanOffers;
