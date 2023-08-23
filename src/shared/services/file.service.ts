import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RESULT_TEMPLATE_PATH, PDF_DIRECTORY, pdfOption } from '@constants';
import { ICreatePdfPayload } from '@interfaces';

import fs from 'fs';
import pdf from 'pdf-creator-node';
import path from 'path';

@Injectable()
export class FileService {
  private readonly _loggerService = new Logger(FileService.name);

  constructor(private readonly _configService: ConfigService) {}

  async generateResuldPdf(data: ICreatePdfPayload): Promise<void> {
    try {
      const pdfFileName = this._generateFileNamePdf(data.id);
      const html = fs.readFileSync(
        path.join(__dirname, RESULT_TEMPLATE_PATH, 'utf-8'),
      );

      const document = {
        html,
        data,
        path: PDF_DIRECTORY + pdfFileName,
      };

      await pdf.create(document, pdfOption);
    } catch (e) {
      this._loggerService.error(e);
    }
  }

  _generateFileNamePdf(id: string): string {
    return `${id}` + '_result' + '.pdf';
  }
}
