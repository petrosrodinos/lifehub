import { Prisma } from "@/generated/prisma"

export type ActivityLogInclude = {
    activity: true
    schedule: true
    occurrence: true
}

export type ActivityLogWithRelations = Prisma.ActivityLogGetPayload<{
    include: ActivityLogInclude
}>

export interface ActivityLogResponse { data: ActivityLogWithRelations[]; total: number; page: number; page_size: number }


export interface ActivityLogGrouped {
    data: Array<{ date: string; logs: ActivityLogWithRelations[] }>
    total: number
    page: number
    page_size: number
}