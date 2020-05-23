import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Order';
//import NAME_FIELD from '@salesforce/schema/Order.Account.Name';
import NAME_FIELD from '@salesforce/schema/Order.AccountId';
import Oid from '@salesforce/schema/Order.OrderNumber';
import cid from '@salesforce/schema/Order.ContractId';
import st from '@salesforce/schema/Order.Status';
import addr from '@salesforce/schema/Order.ShippingAddress';
import des from '@salesforce/schema/Order.Description';

export default class EditDetail extends LightningElement {
    @api recordId;
    @api objectApiName;
    accountObject = ACCOUNT_OBJECT;
    //myFields = [NAME_FIELD , Oid,cid,st,des,addr,amt];
// }
// export default class Recordeditform extends LightningElement {
    handleSubmit(event) {
        event.preventDefault(); // stop the form from submitting
        const fields = event.detail.fields;
        console.log(JSON.stringify(fields));
 
        fields.title = 'VP of Opearations';
        fields.MobilePhone = '2123123123213';
        fields.LeadSource = 'Web';
        this.template.querySelector('lightning-record-edit-form').submit(fields);
    }
    handleSuccess(event) {
        const payload = event.detail;
        console.log(JSON.stringify(payload));
 
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
    }
 
}