import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';

@Injectable()
export class QRService {
  async generateQRCode(data: string): Promise<string> {
    try {
      // Generar QR como base64
      const qrCodeDataURL = await QRCode.toDataURL(data, {
        errorCorrectionLevel: 'M',
        type: 'image/png',
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 300
      });
      
      return qrCodeDataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  async generateQRCodeBuffer(data: string): Promise<Buffer> {
    try {
      // Generar QR como buffer
      const qrCodeBuffer = await QRCode.toBuffer(data, {
        errorCorrectionLevel: 'M',
        type: 'png',
        margin: 1,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 300
      });
      
      return qrCodeBuffer;
    } catch (error) {
      console.error('Error generating QR code buffer:', error);
      throw new Error('Failed to generate QR code buffer');
    }
  }

  async generateProductQR(productId: string, productName: string): Promise<string> {
    // Crear datos del QR con información del producto
    const qrData = JSON.stringify({
      productId,
      productName,
      timestamp: new Date().toISOString()
    });
    
    return this.generateQRCode(qrData);
  }
} 