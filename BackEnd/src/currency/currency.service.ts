import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Currency } from './currency.model';
import { Cron } from '@nestjs/schedule';
import sequelize from 'sequelize';
import { CurrencyGateWay } from './currency.gateway';
import { SubscribeMessage } from '@nestjs/websockets';
import { DCurrency } from './currency';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectModel(Currency) private currencyModel: typeof Currency,
    @Inject(forwardRef(() => CurrencyGateWay))
    private CurrencyGateWay: CurrencyGateWay,
  ) {}

  async createCurrency(data: DCurrency) {
    await this.currencyModel.create({
      name: data.name,
      email: data.email,
      price: data.price,
      info: data.info,
    });
  }

  @Cron('*/2 * * * * *')
  @SubscribeMessage('newData')
  async handleCron() {
    const item = await this.currencyModel.findOne({
      attributes: ['name'],
      order: sequelize.fn('rand'),
    });
    this.currencyModel.update(
      {
        price: Math.floor(Math.random() * 10000 + 1),
      },
      {
        where: {
          name: item.name,
        },
      },
    );
    this.CurrencyGateWay.server.emit(
      'newData',
      await {
        data: await this.currencyModel.findAll(),
        latestUpdated: item.name,
      },
    );
  }
}
