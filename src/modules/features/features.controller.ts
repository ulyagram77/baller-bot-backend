import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FeaturesService } from './features.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FeatureEntity } from './entities/features.entity';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';

@Controller('features')
@ApiTags('Features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new static feature',
  })
  @ApiCreatedResponse({
    type: FeatureEntity,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: 'validation details',
        error: 'Bad Request',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Could not add feature to the database',
        error: 'Internal Server Error',
      },
    },
  })
  async create(@Body() createFeatureDto: CreateFeatureDto) {
    return await this.featuresService.create(createFeatureDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get an array of all static features for the frontend application',
  })
  @ApiOkResponse({ type: FeatureEntity, isArray: true })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Could not fetch features',
        error: 'Internal Server Error',
      },
    },
  })
  async findAll() {
    return await this.featuresService.findAll();
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a static feature by ID',
  })
  @ApiOkResponse({ type: FeatureEntity })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: {
        statusCode: 400,
        message: 'validation details',
        error: 'Bad Request',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Could not update feature in the database',
        error: 'Internal Server Error',
      },
    },
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ) {
    return await this.featuresService.update(+id, updateFeatureDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a static feature by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Feature ID',
    type: 'number',
  })
  @ApiOkResponse({ type: FeatureEntity })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      example: {
        statusCode: 500,
        message: 'Could not remove feature from the database',
        error: 'Internal Server Error',
      },
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.featuresService.remove(id);
  }
}
