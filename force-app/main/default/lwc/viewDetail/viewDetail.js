import { LightningElement,wire,api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Order';
//import NAME_FIELD from '@salesforce/schema/Order.Account.Name';
import NAME_FIELD from '@salesforce/schema/Order.AccountId';
import Oid from '@salesforce/schema/Order.OrderNumber';
import cid from '@salesforce/schema/Order.ContractId';
import st from '@salesforce/schema/Order.Status';
import addr from '@salesforce/schema/Order.ShippingAddress';
import des from '@salesforce/schema/Order.Description';
import amt from '@salesforce/schema/Order.TotalAmount';
// import getData from '@salesforce/apex/orderControl.getalldata'

export default class ViewDetail extends LightningElement {

    // order
    // open
    @api recordId;
    @api objectApiName;
 
        
    accountObject = ACCOUNT_OBJECT;
    myFields = [NAME_FIELD , Oid,cid,st,des,addr,amt];

  
}