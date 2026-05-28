import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@/shared/guards/jwt.guard';
import { CurrentUser } from '@/shared/decorators/current-user.decorator';
import { FlashCardGroupsService } from './flash-card-groups.service';
import { FlashCardsService } from './flash-cards.service';
import { CreateFlashCardGroupDto } from './dto/create-flash-card-group.dto';
import { UpdateFlashCardGroupDto } from './dto/update-flash-card-group.dto';

@ApiTags('Flash Cards')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('flash-card-groups')
export class FlashCardsController {
    constructor(
        private readonly groupsService: FlashCardGroupsService,
        private readonly cardsService: FlashCardsService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a flash card group from notes (triggers async AI generation)' })
    create(
        @CurrentUser('user_uuid') userUuid: string,
        @Body() dto: CreateFlashCardGroupDto,
    ) {
        return this.groupsService.create(userUuid, dto);
    }

    @Get()
    @ApiOperation({ summary: 'List all flash card groups for the current user' })
    findAll(@CurrentUser('user_uuid') userUuid: string) {
        return this.groupsService.findAll(userUuid);
    }

    @Get(':uuid')
    @ApiOperation({ summary: 'Get a flash card group with all cards and images' })
    findOne(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.groupsService.findOne(userUuid, uuid);
    }

    @Patch(':uuid')
    @ApiOperation({ summary: 'Update the title of a flash card group' })
    update(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
        @Body() dto: UpdateFlashCardGroupDto,
    ) {
        return this.groupsService.update(userUuid, uuid, dto);
    }

    @Delete(':uuid')
    @ApiOperation({ summary: 'Delete a flash card group, its cards and GCS images' })
    remove(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('uuid') uuid: string,
    ) {
        return this.groupsService.remove(userUuid, uuid);
    }

    @Delete(':groupUuid/cards/:cardUuid')
    @ApiOperation({ summary: 'Delete a single flash card' })
    removeCard(
        @CurrentUser('user_uuid') userUuid: string,
        @Param('cardUuid') cardUuid: string,
    ) {
        return this.cardsService.remove(userUuid, cardUuid);
    }
}
