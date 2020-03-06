import { getLoanTotal, getLoanBreakdown } from './calculator';

describe('getLoanBreakdown', () => {
  it('should return a list with a breakdown ofthe loan', () => {
    const testData = {
      title: 'Revolving Credit Facility',
      type: 'rcf',
      interest: 3,
      available: true,
      fee: 0,
      startDate: new Date('2020-03-02T19:57:42.208Z')
    };
    const testAmount = 1000;
    const testDuration = 2;

    const result = getLoanBreakdown({
      data: testData,
      amount: testAmount,
      duration: testDuration
    });

    expect(result).toEqual([
      {
        date: '4/2/2020',
        principal: 500,
        repayment: 530,
        interestAmount: 30
      },
      { date: '5/2/2020', principal: 500, repayment: 515, interestAmount: 15 }
    ]);
  });
});

describe('getLoanTotal', () => {
  it('should return the correct values when creating the total object', () => {
    const testData = [
      {
        date: '2/4/2020',
        principal: 250,
        repayment: 280,
        interestAmount: 30
      },
      {
        date: '2/5/2020',
        principal: 250,
        repayment: 272.5,
        interestAmount: 22.5
      },
      {
        date: '2/6/2020',
        principal: 250,
        repayment: 265,
        interestAmount: 15
      },
      {
        date: '2/7/2020',
        principal: 250,
        repayment: 257.5,
        interestAmount: 7.5
      }
    ];
    const result = getLoanTotal(testData);

    expect(result).toEqual({
      principal: 1000,
      interest: 75,
      repayment: 1075
    });
  });
});
