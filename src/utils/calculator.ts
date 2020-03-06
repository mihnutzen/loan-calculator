import { Loan, LoanMonth } from '../store/types';

const getFormattedDate = (
  date: Date,
  advance = 0,
  format: any = {
    dateStyle: 'short'
  },
  locale = 'en-US'
): string => {
  const tempDate = new Date(date);
  const formatedDate = new Date(
    tempDate.setMonth(date.getMonth() + advance)
  ).toLocaleDateString(locale, format);

  return formatedDate;
};

const getRepaymentAndInterest = ({
  principal,
  amount,
  interest,
  fee = 0,
  nr
}: {
  principal: number;
  amount: number;
  interest: number;
  fee: number;
  nr: number;
}): { repayment: number; interestAmount: number } => {
  const remaining = amount - principal * nr;
  let interestAmount = (remaining * interest) / 100;
  if (nr === 0) {
    interestAmount = interestAmount + fee;
  }

  const repayment = principal + interestAmount;

  return {
    repayment: repayment,
    interestAmount: interestAmount
  };
};

export const getLoanBreakdown = ({
  data,
  amount,
  duration
}: {
  data: Loan;
  amount: number;
  duration: number;
}): LoanMonth[] => {
  const entries = new Array(duration).fill(undefined);
  const principal = amount / duration;

  const breakdown = entries.map((val, idx: number): any => {
    const month = {
      date: getFormattedDate(data.startDate, idx + 1),
      principal,
      ...getRepaymentAndInterest({
        principal,
        amount,
        fee: (data.fee * amount) / 100,
        interest: data.interest,
        nr: idx
      })
    };

    return month;
  }, []);

  return breakdown;
};

export const getLoanTotal = (data: LoanMonth[]): any => {
  return data.reduce(
    (acc, item): any => {
      const { principal, repayment, interestAmount } = item;

      return {
        principal: acc.principal + principal,
        interest: acc.interest + interestAmount,
        repayment: acc.repayment + repayment
      };
    },
    { principal: 0, interest: 0, repayment: 0 }
  );
};
