import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { Response } from 'express'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

export default function swagger(app: NestExpressApplication): void {
  const build = new DocumentBuilder()
    .build()

  const document = SwaggerModule.createDocument(app, build)
  const theme = new SwaggerTheme()

  SwaggerModule.setup('swagger', app, document, {
    explorer: true,
    swaggerOptions: {},
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK_MONOKAI),
  })
  app.getHttpAdapter().get('/swagger/json', (_, res: Response) => res.json(document))
}
