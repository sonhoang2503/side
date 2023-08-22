import { cpus } from 'os';

export const QueueName = {
  GenerateResultPDF: 'generate-result-pdf',
};

export const NUMBER_CORE_CPUS = cpus().length;
