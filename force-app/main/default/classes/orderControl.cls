public with sharing class orderControl {
    public orderControl() {}

   
    @AuraEnabled(cacheable=true)
    public static List<Order> getalldata(){
        List<Order> l=[SELECT Description,OrderNumber FROM Order];
        return l;
     }

     @AuraEnabled
     public static void confOrder(String ordId){  
      try{
         List<Order> l=[SELECT Submit__c FROM Order WHERE Id =: ordId];
         Order ob=l[0];
        
         ob.Submit__c='Yes';
        update ob;
      }
      catch(DmlException e) {
         
             System.debug('An unexpected error has occurred: ' + e.getMessage());
                  }
         
        }

  
   @AuraEnabled
   public static list<OrderItem> getItemList(string ordId) {
      
        list<OrderItem> odr = new list<OrderItem>();
       
        for(OrderItem obb : [SELECT Product_Name__c,Product_Code__c,Brand__c,Id,Quantity,Stock_Quantity__c,TotalPrice,UnitPrice FROM OrderItem WHERE OrderId=:ordId ]){
           odr.add(obb);
        }
        
         if(odr.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return odr;
    }
       
        
    
   
    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrderList(string searchKey) {
        string sTempSearchKey = '%' + searchKey + '%';
		
        list<PricebookEntry> odr = new list<PricebookEntry>();
     

        for(PricebookEntry oCon : [Select UnitPrice,PBName__c,ID,Pricebook2Id,Product_Name__c,ProductCode,Brand__c                           From PricebookEntry
                            WHERE Product_Name__c LIKE : sTempSearchKey]){
           odr.add(oCon);
        }
		
      
         if(odr.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return odr;
    }


    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getOrder1List(string searchst) {
        string sTempKey = '%' + searchst + '%';
		
      
        list<PricebookEntry> od = new list<PricebookEntry>();
     
	 
       for(PricebookEntry oCon : [Select UnitPrice,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode,Brand__c
              From PricebookEntry
               WHERE Brand__c LIKE : sTempKey]){
               od.add(oCon);
        }
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(od.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return od;
    }

    @AuraEnabled(cacheable=true)
    public static list<PricebookEntry> getMRP(Integer searchMRP) {     
	        list<PricebookEntry> od = new list<PricebookEntry>();
     
	       for(PricebookEntry oCon : [Select UnitPrice,PBName__c,Id,Pricebook2Id,Product_Name__c,ProductCode,Brand__c
              From PricebookEntry
               WHERE UnitPrice <= : searchMRP]){
            od.add(oCon);
          }   
		
       //If there are no records found with searchKey then, throw aura exception with a message
         if(od.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return od;
    }
    
}
