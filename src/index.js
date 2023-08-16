import Resolver from '@forge/resolver';
import { storage, startsWith } from '@forge/api';
import { v4 as uuidv4 } from 'uuid';
import  { EMPLOYEE_TABLE_PREFFIX } from './tables';


const resolver = new Resolver();

resolver.define('getData', async(req) => {
    console.log(req);
    let results = []
    let cursor = req.cursor
    let res = await storage.query()
    .where('key', startsWith(`${EMPLOYEE_TABLE_PREFFIX}`))
    .cursor(cursor)
    .limit(6)
    .getMany()

    return res;
});

resolver.define('deleteTableRow', async(req) => {
  console.log(req);
   const rowId = req.payload.rowId;  
   await storage.delete(rowId)
   return true;
});


resolver.define('addTableRow', async(req) => {
  console.log(req.payload.data);
  await storage.set(`${EMPLOYEE_TABLE_PREFFIX}${uuidv4()}`, req.payload.data)
  return true;
});


export const handler = resolver.getDefinitions();

