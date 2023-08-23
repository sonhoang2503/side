import { Global, Module } from '@nestjs/common';
import { FileService } from './services/file.service';

@Global()
@Module({
  imports: [],
  providers: [FileService],
  exports: [FileService],
})
export class SharedModule {}
