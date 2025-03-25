import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import { CloudinaryUploadQueryResultType } from '../../utils/types/cloudinary_upload_query_result.type';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: any, folder: string): Promise<CloudinaryUploadQueryResultType> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder },
        (error: any, result: UploadApiResponse | undefined) => {
          if (error) {
            reject(new Error(`Erreur lors de l'upload vers Cloudinary : ${error.message}`));
          }

          if (!result) {
            reject(new Error("Résultat d'upload vide !"));
          }

          resolve(result! as unknown as CloudinaryUploadQueryResultType);
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }
}
