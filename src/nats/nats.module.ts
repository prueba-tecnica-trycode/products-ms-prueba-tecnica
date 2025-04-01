import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/configs/dotenv.config';
import { NATS_CLIENT } from 'src/configs/nats-client.configs';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_URL,
        },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_CLIENT,
        transport: Transport.NATS,
        options: {
          servers: envs.NATS_URL,
        },
      },
    ]),
  ],
})
export class NatsModule {}
