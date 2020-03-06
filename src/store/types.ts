import { ThunkAction } from 'redux-thunk';

export enum Units {
  CURRECNY = '£',
  TIMESCALE = 'month',
  INTEREST = '%'
}

export enum MinMaxValues {
  MIN_AMOUNT = 1000,
  MAX_AMOUNT = 1000000,
  MIN_DURATION = 2,
  MAX_DURATION = 48
}

export type RootState = {
  calculator: CalculatorState;
};

type Arg = undefined;
export type ThunkResult<R> = ThunkAction<R, RootState, Arg, Action>;

export interface ClculateLoanPayload {
  amount: string;
  duration: string;
}

export interface RecalculateLoanPayload {
  type: string;
  interest: string;
}

export interface Action {
  type: string;
  payload: any;
}

export interface Loan {
  title: string;
  type: string;
  startDate: Date;
  interest: number;
  fee: number;
  available: boolean;
}

export interface LoanMonth {
  date: string;
  principal: number;
  repayment: number;
  interestAmount: number;
}

export interface CalculatorState {
  amount: number;
  duration: number;
  loans: Loan[];
  error: string;
}
