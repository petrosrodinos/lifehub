import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './modules/internal/mail/mail.module';
import { SmsModule } from './modules/internal/sms/sms.module';
import { AiModule } from './modules/internal/ai/ai.module';
import { RedisModule } from './core/databases/redis/redis.module';
import { RedisCacheModule } from './modules/internal/redis-cache/redis-cache.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './shared/config/env/env.module';
import { RoutineModule } from './modules/activities/routine.module';
import { ExpenseAccountsModule } from './modules/expenses/expense-accounts/expense-accounts.module';
import { ExpenseCategoriesModule } from './modules/expenses/expense-categories/expense-categories.module';
import { ExpenseSubcategoriesModule } from './modules/expenses/expense-subcategories/expense-subcategories.module';
import { ExpenseEntriesModule } from './modules/expenses/expense-entries/expense-entries.module';
import { ExercisesModule } from './modules/gym/exercises/exercises.module';
import { MuscleGroupsModule } from './modules/gym/muscle-groups/muscle-groups.module';
import { WorkoutsModule } from './modules/gym/workouts/workouts.module';
import { WorkoutSetsModule } from './modules/gym/workout-sets/workout-sets.module';
import { WorkoutEntriesModule } from './modules/gym/workout-entries/workout-entries.module';
import { ActivitySchedulesModule } from './modules/habbits/activity-schedules/activity-schedules.module';
import { ActivityScheduleDatesModule } from './modules/habbits/activity-schedule-dates/activity-schedule-dates.module';
import { ActivityScheduleWeekDaysModule } from './modules/habbits/activity-schedule-week-days/activity-schedule-week-days.module';
import { ActivityOccurrencesModule } from './modules/habbits/activity-occurrences/activity-occurrences.module';
import { ActivityLogsModule } from './modules/habbits/activity-logs/activity-logs.module';
import { AnalyticsModule } from './modules/habbits/analytics/analytics.module';
import { ScheduleSlotsModule } from './modules/schedule-slots/schedule-slots.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    ExercisesModule,
    MuscleGroupsModule,
    WorkoutsModule,
    WorkoutSetsModule,
    WorkoutEntriesModule,
    ActivitySchedulesModule,
    ActivityScheduleDatesModule,
    ActivityScheduleWeekDaysModule,
    ActivityOccurrencesModule,
    ActivityLogsModule,
    AnalyticsModule,
    ScheduleSlotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
