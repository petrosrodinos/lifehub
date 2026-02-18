import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/databases/prisma/prisma.service'

@Injectable()
export class ActivitiesRepository {
  constructor(private readonly prisma: PrismaService) { }

  findByUuid(user_uuid: string, uuid: string) {
    return this.prisma.activity.findFirst({
      where: { user_uuid, uuid },
    })
  }
}
