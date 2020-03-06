import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

import {
  Action,
  CalculatorState,
  ThunkResult,
  RootState,
  Loan,
  ClculateLoanPayload,
  RecalculateLoanPayload
} from './types';

import { getLoanBreakdown, getLoanTotal } from '../utils/calculator';
import { getLoans } from '../services/loans';

const SET_RESULTS = 'Calculator/Results';
const UPDATE_RESULTS = 'Calculator/Results Update';
const SET_ERROR = 'Calculator/Error';

export const calculateLoan = ({
  amount,
  duration
}: ClculateLoanPayload): ThunkResult<void> => {
  return async (dispatch: Dispatch): Promise<any> => {
    const requestAmount = parseInt(amount, 10);
    const requestDuration = parseInt(duration, 10);

    if (!requestAmount || !requestDuration) {
      return dispatch({ type: SET_ERROR, payload: 'Please correct values' });
    }

    try {
      const result = await getLoans(requestAmount);
      const loans = result.map((loan: Loan) => ({
        ...loan,
        startDate: new Date()
      }));

      dispatch({
        type: SET_RESULTS,
        payload: { loans, amount: requestAmount, duration: requestDuration }
      });
    } catch (e) {
      dispatch({ type: SET_ERROR, payload: 'Something went wrong' });
    }
  };
};

export const recalculateLoan = (
  data: RecalculateLoanPayload
): ThunkResult<void> => {
  return (dispatch: Dispatch, getState: () => RootState): void => {
    const loans = getState().calculator.loans.map((loan: Loan) => {
      if (loan.type === data.type) {
        return {
          ...loan,
          interest: data.interest
        };
      }

      return loan;
    });

    dispatch({
      type: UPDATE_RESULTS,
      payload: { loans }
    });
  };
};

export const loansSelector = createSelector(
  (state: RootState) => state.calculator,
  ({ loans, amount, duration }: CalculatorState) => {
    const formattedLoans = loans.map(loan => {
      const breakdown = getLoanBreakdown({ data: loan, amount, duration });
      return {
        ...loan,
        breakdown,
        total: getLoanTotal(breakdown)
      };
    });

    return formattedLoans;
  }
);

const initialState = (): CalculatorState => {
  return {
    amount: 0,
    duration: 0,
    loans: [],
    error: ''
  };
};

export default (
  state: CalculatorState = initialState(),
  action: Action
): CalculatorState => {
  const { type, payload } = action;

  switch (type) {
    case SET_RESULTS:
      return {
        ...state,
        ...payload
      };

    case UPDATE_RESULTS:
      return {
        ...state,
        ...payload
      };

    case SET_ERROR:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};
