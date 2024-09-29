import { Module } from '@nestjs/common';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from './currency.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Currency } from './currency.model';
import { CurrencyGateWay } from './currency.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Currency])],
  controllers: [CurrencyController],
  providers: [CurrencyService, CurrencyGateWay],
})
export class CurrencyModule {}
