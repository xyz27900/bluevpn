import { logger } from '@xyz27900/bluevpn-common/dist/cjs/utils/logger';
import { singleton } from 'tsyringe';
import { exec } from '@/utils/exec';

@singleton()
export class OpenVpnService {
  public async getClientConfig(uuid: string): Promise<string | null> {
    try {
      return await exec(`ovpn_getclient ${uuid}`);
    } catch (error) {
      logger.error(error, 'OpenVpnService');
      return null;
    }
  }

  public async createClient(uuid: string, password: string): Promise<string | null> {
    try {
      await exec(`easyrsa --passout="pass:${password}" build-client-full ${uuid}`, 'stderr');
      return password;
    } catch (error) {
      logger.error(error, 'OpenVpnService');
      return null;
    }
  }

  public async revokeClient(uuid: string): Promise<void> {
    try {
      await exec(`echo "yes" | ovpn_revokeclient ${uuid} remove`, 'stderr');
    } catch (error) {
      logger.error(error, 'OpenVpnService');
    }
  }
}
