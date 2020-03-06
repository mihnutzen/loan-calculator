import React from 'react';

import DataEntry from '../dataEntry/DataEntry';

import './LoanOffer.css';

const LoanOffer = (props: any): React.ReactElement => {
  const {
    title,
    type,
    interest,
    breakdown,
    available,
    total,
    onInterestChange
  } = props;
  const handleInterest = (value: string): void => {
    onInterestChange({ interest: value, type });
  };

  return (
    <div className="LoanOffer">
      <h2>{title}</h2>

      {available && (
        <div>
          <div className="LoanForm">
            <DataEntry
              label="Interest rate"
              value={interest}
              unit="%"
              onChnage={handleInterest}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Repayment date</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total repayment</th>
              </tr>
            </thead>

            <tbody>
              {breakdown.map(
                ({ date, principal, interestAmount, repayment }: any) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{principal.toFixed(2)}</td>
                    <td>{interestAmount.toFixed(2)}</td>
                    <td>{repayment.toFixed(2)}</td>
                  </tr>
                )
              )}
            </tbody>

            <tfoot>
              <tr>
                <td>Total</td>
                <td>{total.principal.toFixed(2)}</td>
                <td>{total.interest.toFixed(2)}</td>
                <td>{total.repayment.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}

      {!available && <p>Loan not available, Please contact us</p>}
    </div>
  );
};

export default LoanOffer;
