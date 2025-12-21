
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsBus } from './cqrs/CqrsBus';
import { TransformInterceptor } from './interceptors/TransformInterceptor';
import { LoggingInterceptor } from './interceptors/LoggingInterceptor';

@Global()
@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    CqrsBus,
    TransformInterceptor,
    LoggingInterceptor,
  ],
  exports: [
    CqrsModule,
    CqrsBus,
    TransformInterceptor,
    LoggingInterceptor,
  ],
})
export class CoreModule {}