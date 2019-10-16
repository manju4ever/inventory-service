import Datastore from 'nedb';
import { promisifyAll } from 'bluebird';
const dummy = new Datastore();
const Cursor = dummy.find().constructor;
promisifyAll(Datastore.prototype);
promisifyAll(Cursor.prototype);

const ProductStore = new Datastore({
    filename: './db/products.db',
    autoload: true,
});

ProductStore.ensureIndex({ fieldName: 'title', unique: true, sparse: true });


const IamStore = new Datastore({
    filename: './db/iam.db',
    autoload: true,
})

IamStore.ensureIndex({ fieldName: 'email', unique: true, sparse: true });

export const products = ProductStore;
export const iam = IamStore;