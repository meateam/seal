import IShare from './share.interface';
import { IShareModel } from './share.model';
import ShareRepository from './share.repository';

export default class Share {
  static _shareRepository: ShareRepository = new ShareRepository();

  static async getAll(query = {}) : Promise<IShare[]> {
    const shares = await Share._shareRepository.find(query);
    return <IShareModel[]>shares;
  }
  static async getById(id: string): Promise<IShare> {
    const share = await Share._shareRepository.findById(id);
    if (!share) return Promise.reject(new Error('Cannot find share with ID: ' + id));
    return <IShareModel>share;
  }
  static async create(share: IShare): Promise<IShare> {
    const newShare = await Share._shareRepository.create(<IShareModel>share);
    return <IShareModel>newShare;
  }
  // TODO: IMPORTANT!!! Validate newPrm fields
  static async updatePermissions(id, newPrm) {
    const change = { permissions: newPrm };
    return await Share._shareRepository.updatePartial(id, change);
  }
  static async delete(id) {
    return await Share._shareRepository.delete(id);
  }
}
