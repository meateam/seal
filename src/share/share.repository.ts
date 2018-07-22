import { RepositoryBase } from '../helpers/repository';
import ShareModel, { IShareModel } from './share.model';

export default class ShareRepository extends RepositoryBase<IShareModel> {
  constructor() {
    super(ShareModel);
  }
}
