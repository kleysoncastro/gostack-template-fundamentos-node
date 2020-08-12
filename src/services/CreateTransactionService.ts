import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TypeOfResquest {
  type: 'income' | 'outcome';
}
interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: TransactionDTO): Transaction {
    if (typeof value !== 'number')
      throw Error("Typeof variable 'value' is different of number");

    if (!(type === 'outcome' || type === 'income')) {
      throw Error("Typeof variable 'type' is different");
    }
    const transfer = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transfer;
  }
}

export default CreateTransactionService;
