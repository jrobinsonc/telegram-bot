import { nanoid } from 'nanoid';
import { createWriteStream, type WriteStream } from 'node:fs';
// import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { Readable } from 'node:stream';
import { finished } from 'node:stream/promises';

export async function downloadFile(
  url: string,
  args?: { fileName?: string; targetDir?: string },
): Promise<string> {
  const response: Response = await fetch(url);

  if (!response.ok)
    throw new Error(`HTTP error! status: ${response.status.toString()}`);
  if (!response.body) throw new Error('Response body is empty');

  let fileName: string | undefined = args?.fileName;

  if (fileName === undefined || fileName.length === 0) {
    fileName = nanoid();

    const fileExtension = url.split('.').pop();

    if (fileExtension !== undefined && fileExtension.length > 0) {
      fileName = `${fileName}.${fileExtension.toLowerCase()}`;
    }
  }

  let targetDir: string | undefined = args?.targetDir;

  if (targetDir === undefined || targetDir.length === 0) {
    targetDir = tmpdir();
  }

  // Ensure the directory exists
  // await mkdir(targetDir, { recursive: true });

  const filePath: string = join(targetDir, fileName);
  const fileStream: WriteStream = createWriteStream(filePath);

  await finished(
    Readable.fromWeb(
      response.body as Parameters<typeof Readable.fromWeb>[0],
    ).pipe(fileStream),
  );

  return filePath;
}
