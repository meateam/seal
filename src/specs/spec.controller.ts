import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { EntityTypes } from '../helpers/enums';
import { EntityConfig, user_entity } from './entity_config';
import { UserController } from '../user/user.controller';

const expect: Chai.ExpectStatic = chai.expect;
const TEST_ITEMS = 4;
const ctr = new UserController();
runTests(ctr);
function runTests(controller: UserController) {
  let testItems;
  describe(`Test type ${controller.controllerType}`, () => {

    before(() => {
      testItems = controller.createItems(TEST_ITEMS);
      (<any>mongoose).Promise = global.Promise;
      mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
    });

    beforeEach(async () => {
      await controller.model.remove({}, (err: Error) => { });
      await Promise.all(testItems.map(item => controller.add(item)));
    });

    describe('#getById', () => {
      it('should return a user by its id', async () => {
        const item = await controller.getById(testItems[0]._id);
        expect(testItems[0].equals(item)).to.be.true;
      });
    });

    describe('#getAll', () => {
      it(`should return a collection with ${TEST_ITEMS} items`, async () => {
        const itemsReturned = await controller.getAll();
        expect(itemsReturned).to.not.be.empty;
        expect(itemsReturned).to.have.lengthOf(testItems.length);
      });
    });

    after((done: any) => {
      mongoose.disconnect();
      done();
    });
  });
}
