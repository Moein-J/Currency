import { Body, Controller, Post } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { DCurrency } from './currency';

@Controller('currency')
export class CurrencyController {
  constructor(private currencyService: CurrencyService) {}

  @Post()
  addCurrency(@Body() body: DCurrency) {
    return this.currencyService.createCurrency(body);
  }
}
