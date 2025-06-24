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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { FeatureDto } from './dto/feature.dto';

@Controller('features')
@ApiTags('Features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new static feature',
  })
  @ApiCreatedResponse({
    type: FeatureDto,
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
  async create(@Body() createFeatureDto: CreateFeatureDto) {
    return await this.featuresService.create(createFeatureDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get an array of all static features for the frontend application',
  })
  @ApiOkResponse({ type: FeatureDto, isArray: true })
  async findAll() {
    return await this.featuresService.findAll();
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a static feature by ID',
  })
  @ApiOkResponse({ type: FeatureDto })
  @ApiNotFoundResponse({
    description: 'Feature not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Feature not found',
        error: 'Not Found',
      },
    },
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
  @ApiOkResponse({ type: FeatureDto })
  @ApiNotFoundResponse({
    description: 'Feature not found',
    schema: {
      example: {
        statusCode: 404,
        message: 'Feature not found',
        error: 'Not Found',
      },
    },
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
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.featuresService.remove(id);
  }
}
