import { IFolder } from './folder.interface';
import * as chai from 'chai';
import * as mongoose from 'mongoose';
import { createFolders } from '../helpers/functions';

const expect = chai.expect;
const TOTAL_FOLDERS: number = 4;
let testFolders : IFolder[];

describe('Test Folder', () => {
  before(() => {
    testFolders = createFolders(TOTAL_FOLDERS);
  });
});
