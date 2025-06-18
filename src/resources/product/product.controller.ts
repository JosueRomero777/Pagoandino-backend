import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { QRService } from './qr.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly qrService: QRService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: CreateProductDto) {
    console.log('Creating product:', createProductDto);
    const product = await this.productService.create(createProductDto);
    console.log('Product created:', product);
    return product;
  }

  @Get()
  async findAll() {
    console.log('Fetching all products');
    const products = await this.productService.findAll();
    console.log('Products found:', products.length);
    return products;
  }

  @Get('qr/:qrCode')
  async findByQrCode(@Param('qrCode') qrCode: string) {
    console.log('Searching product by QR:', qrCode);
    const product = await this.productService.findByQrCode(qrCode);
    console.log('Product found by QR:', product ? product.name : 'Not found');
    return product;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('Fetching product by ID:', id);
    const product = await this.productService.findOne(id);
    console.log('Product found:', product ? product.name : 'Not found');
    return product;
  }

  @Get(':id/qr-image')
  async getQRImage(@Param('id') id: string, @Res() res: Response) {
    console.log('Generating QR image for product:', id);
    
    try {
      const product = await this.productService.findOne(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (!product.qrCode) {
        return res.status(400).json({ message: 'Product does not have a QR code' });
      }

      const qrCodeDataURL = await this.qrService.generateQRCode(product.qrCode);
      
      // Devolver la imagen QR como base64
      res.setHeader('Content-Type', 'application/json');
      res.json({
        qrCode: product.qrCode,
        qrImage: qrCodeDataURL,
        product: {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price
        }
      });
    } catch (error) {
      console.error('Error generating QR image:', error);
      res.status(500).json({ message: 'Error generating QR image' });
    }
  }

  @Get(':id/qr-print')
  async getQRForPrint(@Param('id') id: string, @Res() res: Response) {
    console.log('Generating QR for print for product:', id);
    
    try {
      const product = await this.productService.findOne(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (!product.qrCode) {
        return res.status(400).json({ message: 'Product does not have a QR code' });
      }

      const qrCodeBuffer = await this.qrService.generateQRCodeBuffer(product.qrCode);
      
      // Devolver la imagen QR como archivo para descarga
      res.setHeader('Content-Type', 'image/png');
      res.setHeader('Content-Disposition', `attachment; filename="qr-${product.sku}.png"`);
      res.send(qrCodeBuffer);
    } catch (error) {
      console.error('Error generating QR for print:', error);
      res.status(500).json({ message: 'Error generating QR for print' });
    }
  }

  @Get(':id/inventory-logs')
  async getInventoryLogs(@Param('id') id: string) {
    console.log('Fetching inventory logs for product:', id);
    const logs = await this.productService.getInventoryLogs(id);
    console.log('Inventory logs found:', logs.length);
    return logs;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    console.log('Updating product:', id, updateProductDto);
    const product = await this.productService.update(id, updateProductDto);
    console.log('Product updated:', product.name);
    return product;
  }

  @Post('peso')
  async updateWeight(@Body() updateWeightDto: UpdateWeightDto) {
    console.log('Updating weight:', updateWeightDto);
    const product = await this.productService.updateWeight(updateWeightDto);
    console.log('Weight updated for product:', product.name);
    return product;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    console.log('Deleting product:', id);
    const product = await this.productService.remove(id);
    console.log('Product deleted:', product.name);
    return product;
  }
}
