import { LightningElement,track,wire, api } from 'lwc';
import getItem from '@salesforce/apex/orderControl.getItemList';
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import o from '@salesforce/schema/Order.OrderNumber';
import { deleteRecord ,updateRecord} from 'lightning/uiRecordApi';
import conf from '@salesforce/apex/orderControl.confOrder'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class Summary extends LightningElement {
    a=true;
    b=false;
    sm=false;
    @track ordId;
    aa=true;
    ab=false;
    @track searchOrder;
    @track o
    @api recordId;
    @wire(getRecord, { recordId: '$ordId', fields: [o]  })
    ord;
    sb=false;
     get viewOrder ()
     {
        
         return getFieldValue(this.ord.data,  o);
    }

   

    
    ordCh(event){
        this.ordId=event.target.value;
        alert(this.ordId);
            }

    summary(event){
        this.sm=true;
        this.ordId=event.detail.id;
        //location.reload;
        getItem({
            ordId: this.ordId
        })
        .then(result => {
         
            this.searchOrder = result;
        })

    }

    cancel(event){
        this.sm=false;
    }

    updSuc(event){
        this.aa=true;
        this.ab=false;
       }

       upd(event){
        this.aa=false;
        this.ab=true;
       }

       del(event) {
        this.delIn=event.target.value;
        const orderItemId = event.target.dataset.recordid;
        this.searchOrder.splice(this.delIn,1);
        console.log('delete item'+ this.searchOrder.otid);
        
        console.log('delete item' + orderItemId);
        //alert("delte called")
        deleteRecord(orderItemId)
        .then(() => {
        this.dispatchEvent(
        new ShowToastEvent({
        title: 'Success',
        message: 'Record Is Deleted',
        variant: 'success',
        }),
        );
        })
        .catch(error => {
        this.dispatchEvent(
        new ShowToastEvent({
        title: 'Error While Deleting record',
        message: error.message,
        variant: 'error',
        }),
        );
        });

        this.b=false;
        this.b=true;
        }

        confi(event){
            alert("confirm")

            conf({
                ordId:this.ordId
            })

            const msg=new ShowToastEvent({
                
                title: 'Order Confirmed',
                message: 'Sent for approval',
                variant: 'success',
                })
                this.dispatchEvent(msg);
            }

            

        handleSuccess(event){
            //alert("Jukui")
            this.sb=false;
        }    
        

}