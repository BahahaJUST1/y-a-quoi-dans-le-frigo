import { Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../../decorators/guards/jwt-auth.guard';

@Controller('cloudinary')
@UseGuards(JwtAuthGuard)
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('/:folder')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('folder') folder: string,
    @UploadedFile() file: any
  ): Promise<string> {
    return (await this.cloudinaryService.uploadImage(file, folder)).public_id;
  }
}
