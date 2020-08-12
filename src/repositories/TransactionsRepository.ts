import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface ResquestBalanceDTO {
  type: 'income' | 'outcome';
  value: number;
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public setBalance({ type, value }: ResquestBalanceDTO) {
    if (type === 'income') {
      this.balance.income += value;
      this.balance.total += value;
    } else {
      this.balance.outcome += value;
      this.balance.total -= value;
    }
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transder = new Transaction({ title, value, type });
    if (type === 'outcome') {
      if (this.balance.total < value)
        throw Error('The account balance is less than the withdrawal amount');
    }
    this.transactions.push(transder);
    this.setBalance({ type, value });
    return transder;
  }
}

export default TransactionsRepository;
