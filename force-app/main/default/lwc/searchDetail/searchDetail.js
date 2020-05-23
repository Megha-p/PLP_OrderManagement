import { LightningElement,track,api,wire } from 'lwc';
import getData from '@salesforce/apex/orderControl.getalldata'
import { getRecord,getFieldValue } from 'lightning/uiRecordApi';
import { deleteRecord } from 'lightning/uiRecordApi';
import a from '@salesforce/schema/OrderItem.Quantity';
import o from '@salesforce/schema/Order.OrderNumber';
import b from '@salesforce/schema/PricebookEntry.Product2Id';
import c from '@salesforce/schema/PricebookEntry.UnitPrice';
//import d from '@salesforce/schema/PricebookEntry.ProductName';
import PBID_FIELD from '@salesforce/schema/OrderItem.PricebookEntryId';
import getOrderList from '@salesforce/apex/orderControl.getOrderList';
import getOrder1List from '@salesforce/apex/orderControl.getOrder1List';
import getMRP from '@salesforce/apex/orderControl.getMRP';
import getItem from '@salesforce/apex/orderControl.getItemList';
//import submitOrd from '@salesforce/apex/orderControl.submitOrd';

//  import getItem from '@salesforce/apex/orderControl.addOrder';
// import standard toast event 
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class SearchDetail extends LightningElement {
   @api OrderId
    @api pricebookId
    @track order   
    @track o
    @track searchOrder;
                    
    conf
    ind
    id
    up
    sVal = '';
    sVal1 = '';
    sval2='';
    ad=false;
    open
    delIn
    //quan
    uni
    ab=a;
    ordId;
    sm;
    u=true;
    qu=false;
    myFields = [a,b,c,PBID_FIELD];
    cost;
    @track orderItemId;
    
   
    // update sVal var when input field value change
    edit(event)
    {
        this.ind=event.target.value;
       // alert(this.ind);
        this.open=true;
        
       this.id=this.order[this.ind].Id;
       this.up=this.order[this.ind].UnitPrice;
       //alert(this.id+" "+this.up);
     
     
    }
    cancel(event){
        this.open=false;
        this.ad=false;
        location.reload;
    }

    clear(event){
        this.sVal='';
        this.sVal1='';
        this.sVal2='';
        this.order=null;
    }
    
    ordCh(event){
    this.ordId=event.target.value;
    alert(this.ordId);
     }
   
        quanCh(event){
        this.quan=event.target.value;
        //    if(this.quan>10){
        //     this.quan=parseInt(this.quan ) + 1;
       // }
    
        }
   
        //  priCh(event){
        //  this.up=event.target.value;
        // // alert(this.ord);
        //   }
                   

    // summary(event){
    //   this.open=false;  
    //     this.sm=true;     
   
    // }
    //  save(event){
    //     this.sm=false;
    
    //  this.s={'prod':this.pro,'quan':this.quan,'price':this.uni}
    //  saveData(this.s);
    //  location.reload();
     
   
    // }

    cancel2(event){
        this.open=false;
       // this.ad=false;
        // getItem({
        //     'ordId':this.ordId,'ordItem':this.orderItemId
        // });

    }

    confirm(event){
        submitOrd({
            ordId: this.ordId
            
        })
        this.sm=false;
       
    }

    upd(event){
    this.u=false;
    this.qu=true;
   }

   updSuc(event){
    this.u=true;
    this.qu=false;
   }
    @wire(getRecord, { recordId: '$ordId', fields: [o]  })
    ord;
     get viewOrder ()
     {
        
         return getFieldValue(this.ord.data,  o);
    }
    

    @wire(getRecord, { recordId: '$ordItemId', fields: [a]  })
    quan;
     get quant ()
     {
        
         return getFieldValue(this.quan.data,  a);
    }

    updateSeachKey(event) {
        this.sVal = event.target.value;
       // alert("this is sval"+this.sVal);
        
    }
    updateSeach(event) {
        
        this.sVal1=event.target.value;
       // alert(this.sVal1);
    }
 
    updateMRP(event) {
        
        this.sVal2=event.target.value;
        
    }

    handleSuccess(event) {
        this.orderItemId = event.detail.id;
        // if(this.quan>10){
        //     this.quan=this.quan + 1;
        // }
      //  alert(this.orderItemId  );
        this.open=false;
        this.ad=true;
        // this.searchOrder.push({"otid":this.orderItemId});
        const msg=new ShowToastEvent({
            
            message: 'Success',
            variant: 'success',
            })
            this.dispatchEvent(msg);
           
      
      
        //alert("summary is called" )
        // alert(this.orderItemId)
     
       
    }

    handleError(){
    
            const msg=new ShowToastEvent({
            title: 'Error',
            message: 'Product is out of Stock',
            variant: 'error',
            })
            this.dispatchEvent(msg);
    }

    addmore(event){
        this.open=false;
        this.ad=false;
        this.clear(event);
    }

    viewOd(event){
        this.ad=false;
        this.sm=true;
        getItem({
            ordId: this.ordId
        })
        .then(result => {
          
            this.searchOrder = result;
        })

        // alert(this.searchOrder[0].Id);

    }

    del(event) {
        this.delIn=event.target.value;
        const orderItemId = event.target.dataset.recordid;
        this.searchOrder.splice(this.delIn,1);
        
        // this.updSuc(event);
        // alert("sdf");
        console.log('delete item'+ this.searchOrder.otid);
        
        console.log('delete item' + orderItemId);
       // alert("delte called")
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

        this.sm=false;
        this.sm=true;
        }
 

       

    // call apex method on button click 
    handleSearch() {
        // if search input value is not blank then call apex method, else display error msg 
        if (this.sVal !== '') {
           
            //alert("this is sval"+this.sVal);
            getOrderList({
                    searchKey: this.sVal
                })
                .then(result => {
                  
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
        }
        else if (this.sVal1 !== '') {
           // alert(this.sVal1);
            getOrder1List({
                    searchst: this.sVal1
                })
                .then(result => {
                     
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
        }
        else if (this.sVal2 !== '') {
           // alert(this.sVal2);
            getMRP({
                searchMRP: this.sVal2
                })
                .then(result => {
                   
                    this.order = result;
                })
                .catch(error => {
                    // display server exception in toast msg 
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    // reset contacts var with null   
                    this.order = null;
                });
                alert(searchMRP);
        }
        else {
            // fire toast event if input field is blank
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);
        }
    }
}

