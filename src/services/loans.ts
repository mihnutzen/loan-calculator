function randomDelayPromise(data: any): Promise<any> {
  const delay = Math.floor(Math.random() * 400) + 100;
  // eslint-disable-next-line no-undef
  return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export function getLoans(amount: number): any {
  let targetLoans = 'loans1';

  if (amount >= 20000) {
    targetLoans = 'loans2';
  }

  if (amount <= 10000) {
    targetLoans = 'loans3';
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return randomDelayPromise(require(`../data/${targetLoans}.json`));
}
