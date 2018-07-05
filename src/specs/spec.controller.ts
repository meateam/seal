import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as mongoose from 'mongoose';
import { config } from '../config';
import { EntityTypes } from '../helpers/enums';
import { EntityConfig, user_entity } from './entity_config';
import { UserController } from '../user/user.controller';
import { ServerError } from '../errors/application';

const expect: Chai.ExpectStatic = chai.expect;
const TOTAL_ITEMS = 4;
const ctr = new UserController();
runTests(ctr);
function runTests(controller: UserController) {
  let testItems;
  describe(`Test type ${controller.controllerType}`, () => {

    before(() => {
      testItems = controller.createItems(TOTAL_ITEMS);
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
      it(`should return a collection with ${TOTAL_ITEMS} items`, async () => {
        const itemsReturned = await controller.getAll();
        expect(itemsReturned).to.not.be.empty;
        expect(itemsReturned).to.have.lengthOf(testItems.length);
      });
    });

    describe('#add', () => {
      it('should add a new item to the collection', async () => {
        const user = controller.createItems(1)[0];
        await controller.add(user);
        const usersReturned = await controller.getAll();
        expect(usersReturned).to.not.be.empty;
        expect(usersReturned).to.have.lengthOf(testItems.length + 1);
      });
      it('should throw exception when trying to add new item with existed id', async () => {
        try {
          await controller.add(testItems[0]);
          expect(false).to.be.true;
        } catch (err) {
          expect(err).to.be.instanceof(ServerError);
        }
      });
    });

    describe('#deleteById', () => {
      it('should delete a single user', async () => {
        await controller.deleteById(testItems[0]._id);
        const usersReturned = await controller.getAll();
        expect(usersReturned).to.have.lengthOf(TOTAL_ITEMS - 1);
      });
    });

    after((done: any) => {
      mongoose.disconnect();
      done();
    });
  });
}
