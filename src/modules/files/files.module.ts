import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
// import { CloudinaryConfig } from 'src/config/cloudinary';
import { CloudinaryConfig } from '../../config/cloudinary'; //! Cambiado para pruebas.
// import { CloudinaryService } from 'src/common/cloudinary.service';
import { CloudinaryService } from '../../common/cloudinary.service'; //! Cambiado para pruebas.

@Module({
  controllers: [FilesController],
  providers: [FilesService, CloudinaryConfig, CloudinaryService],
  exports: [],
})
export class FilesModule {}
