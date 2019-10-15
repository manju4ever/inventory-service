import Datastore from 'nedb';
import { promisifyAll } from 'bluebird';
const dummy = new Datastore();
const Cursor = dummy.find().constructor;
promisifyAll(Datastore.prototype);
promisifyAll(Cursor.prototype);

export const products = new Datastore({
    filename: './products.db',
    autoload: true,
});

