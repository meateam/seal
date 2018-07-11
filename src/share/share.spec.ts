import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import *as mongoose from 'mongoose';

import IShare from './share.interface';
import ShareModel from './share.model';
import Share from './share.controller';

chai.use(chaiAsPromised);
const should = chai.should();
const expect = chai.expect;
const DB_ID_EXAMPLE = '59a56d577bedba18504298df';
const SHARE_BASIC = {
  file: DB_ID_EXAMPLE,
  permissions: {
    read: false,
    edit: false,
  },
  from: DB_ID_EXAMPLE,
  to: DB_ID_EXAMPLE,
};

// Clear DB before each test
before(async () => {
  ShareModel.remove({}, (err) => {});
});

describe('Share', () => {
  beforeEach('Cleans DB', async () => {
    const removeCollectionPromises = [];

    for (const i in mongoose.connection.collections) {
      removeCollectionPromises.push(mongoose.connection.collections[i].remove({}));
    }

    await Promise.all(removeCollectionPromises);
  });
  describe('#getAll()', () => {
    it('Should be empty if there are no shares', async () => {
      const shares = await Share.getAll();
      shares.should.be.an('array');
      shares.should.have.lengthOf(0);
    });
  });
  describe('#getById', () => {
    it('Should throw an error if the id does not exist', async () => {
      await Share.getById(DB_ID_EXAMPLE).should.eventually.be.rejectedWith(Error, 'Cannot find share with ID: ' + DB_ID_EXAMPLE);
    });
    it('Should get share by its ID', async () => {
      const newShare = await Share.create(<IShare>SHARE_BASIC);
      const share = await Share.getById(newShare.id);
      should.exist(share);
    });
  });
  describe('#create', () => {
    it('Should create share', async () => {
      const share = await Share.create(<IShare>SHARE_BASIC);
      should.exist(share);
    });
    it('Should create share with createdAt and updatedAt fields', async () => {
      const newShare = await Share.create(<IShare>SHARE_BASIC);
      const share = await Share.getById(newShare.id);
      should.exist(share);
      share.should.have.property('createdAt');
      share.should.have.property('updatedAt');
    });
    it('Should not create share if one of the Users does not exist in the DB');
    it('Should not create share if the file does not exist in the DB');
  });
  describe('#updatePermissions', () => {
    it('Should update the user permissions', async () => {
      const share = await Share.create(<IShare>SHARE_BASIC);
      await Share.updatePermissions(share.id, { read: true });
      const updatedShare = await Share.getById(share.id);
      should.exist(updatedShare);
      updatedShare.should.have.property('permissions');
      updatedShare.permissions.should.have.property('read', true);
      updatedShare.permissions.should.have.property('edit', false);
    });
  });
  describe('#delete', () => {
    it('Should delete the share', async () => {
      const share = await Share.create(<IShare>SHARE_BASIC);
      const res = await Share.delete(share.id);
      res.should.exist;
      res.should.have.property('ok', 1);
      res.should.have.property('n', 1);
      await Share.getById(share.id).should.eventually.be.rejectedWith(Error, 'Cannot find share with ID: ' + share.id);
    });
  });
});
