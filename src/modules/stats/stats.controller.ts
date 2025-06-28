import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { StatDto } from './dto/stat.dto';
import { AuthorizationByJwt } from 'src/common/decorators/authorization.decorator';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from 'src/common/decorators/api-error-response.decorator';

@Controller('user-stats')
@ApiTags('User Statistics')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create or update user statistics',
    description: 'Creates new statistics or updates existing ones for the user',
  })
  @ApiCreatedResponse({
    type: StatDto,
    description: 'User statistics created/updated successfully',
  })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async create(@Body() createStatDto: CreateStatDto) {
    return await this.statsService.create(createStatDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all user statistics',
    description: 'Returns an array of all statistics with user names included',
  })
  @ApiOkResponse({
    type: StatDto,
    isArray: true,
  })
  async findAll() {
    return await this.statsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user statistics by ID',
    description: 'Returns specific user statistics by ID',
  })
  @ApiOkResponse({
    type: StatDto,
    description: 'User statistics found',
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @AuthorizationByJwt()
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.statsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update user statistics by ID',
    description: 'Updates specific user statistics by ID',
  })
  @ApiOkResponse({
    type: StatDto,
    description: 'User statistics updated successfully',
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatDto: UpdateStatDto,
  ) {
    return await this.statsService.update(id, updateStatDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user statistics by ID',
    description: 'Deletes specific user statistics by its ID',
  })
  @ApiOkResponse({
    type: StatDto,
    description: 'User statistics deleted successfully',
  })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.statsService.remove(id);
  }
}
