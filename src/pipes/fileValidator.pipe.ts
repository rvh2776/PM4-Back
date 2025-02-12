import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  // private readonly allowedMimeTypes = [
  //   'image/jpeg',
  //   'image/jpg',
  //   'image/png',
  //   'image/webp',
  // ];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    const minSize = 10000;
    const maxSize = 200000;

    if (value.size < minSize) {
      throw new BadRequestException(
        'El tamaño del archivo no puede ser menor a 10kbit',
      );
    }

    if (value.size > maxSize) {
      throw new BadRequestException(
        'El tamaño del archivo no puede ser mayor a 200kbit',
      );
    }

    // if (!this.allowedMimeTypes.includes(value.mimetype)) {
    //   throw new BadRequestException(
    //     `El tipo de archivo no es válido. Los tipos permitidos son: ${this.allowedMimeTypes.join(', ')}`,
    //   );
    // }

    return value;
  }
}
