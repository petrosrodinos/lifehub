import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/internal/mail/mail.module';
import { SmsModule } from './modules/internal/sms/sms.module';
import { AiModule } from './modules/internal/ai/ai.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { RedisCacheModule } from './modules/internal/redis-cache/redis-cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './shared/config/env/env.module';
import { RoutineModule } from './modules/routine/routine.module';
import { ExpenseAccountsModule } from './modules/expense-accounts/expense-accounts.module';
import { ExpenseCategoriesModule } from './modules/expense-categories/expense-categories.module';
import { ExpenseSubcategoriesModule } from './modules/expense-subcategories/expense-subcategories.module';
import { ExpenseEntriesModule } from './modules/expense-entries/expense-entries.module';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    SmsModule,
    AiModule,
    RedisModule,
    RedisCacheModule,
    AuthModule,
    RoutineModule,
    ExpenseAccountsModule,
    ExpenseCategoriesModule,
    ExpenseSubcategoriesModule,
    ExpenseEntriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
