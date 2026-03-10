import { app } from './app.js';
import { env } from './config/env.js';

app.listen({ port: env.PORT }, (error: Error | null) => {
  if (error) {
    app.log.error(error, 'Error starting server');
    process.exit(1);
  }

  app.log.info(`Server running at http://'127.0.0.1':${env.PORT.toString()}`);
});

async function stop(): Promise<void> {
  try {
    app.log.info('Stopping fastify server');
    await app.close();
    app.log.info('Fastify server stopped');
  } catch (error) {
    app.log.error(error, 'Error during server shutdown');
    process.exit(1);
  }

  process.exit(0);
}

process.on('SIGINT', () => void stop());
process.on('SIGTERM', () => void stop());
