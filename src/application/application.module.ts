import { Module } from '@nestjs/common';
import { ExemploModule } from './exemplo/exemplo.module';

@Module({
    imports    : [ ExemploModule ],
    providers  : [],
    exports    : [],
    controllers: []
})
export class ApplicationModule {}