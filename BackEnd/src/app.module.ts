import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrencyModule } from './currency/currency.module';
import { Currency } from './currency/currency.model';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'mysql_db',
      port: 3307,
      username: 'root',
      password: 'M@ein13!#nin',
      database: 'task',
      models: [Currency],
      autoLoadModels: true,
      synchronize: true,
    }),
    CurrencyModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
