import { exec } from '@/utils/exec';

describe('', (): void => {
  it('Test stdout', async (): Promise<void> => {
    const command = 'sleep 3 && echo "test"';
    const result = exec(command);
    await expect(result).resolves.toBe('test\n');
  });

  it('Test stderr', async (): Promise<void> => {
    const command = '1>&2 echo "test"';
    const result1 = exec(command);
    const result2 = exec(command, 'stderr');
    await expect(result1).rejects.toThrow('test\n');
    await expect(result2).resolves.toBe('test\n');
  });
});
