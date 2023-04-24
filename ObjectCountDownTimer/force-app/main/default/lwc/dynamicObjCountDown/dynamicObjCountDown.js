import { LightningElement, api, wire } from 'lwc';
import { getFieldValue, getRecord } from 'lightning/uiRecordApi';
export default class DynamicObjCountDown extends LightningElement {
    @api recordId
    timerData = ''
    noData= ''
    boolStatus=false;
    @api strTitle
    @api dateField
    closeDate
    setTimeInterval
    dDay;
    dWeek;
    dHour;
    dMin;
    dSec;
    //From Lwc Builder
    @api Default;
    @api showWeeks ;
	@api showDays ;
	@api showHours ;
	@api showMinutes ;
	@api showSeconds ;
	@api objectApiName;
    @api noDataBoolean;
    
@wire(getRecord, {recordId : '$recordId', fields : '$dateField'})
    oppDataHandler({data, error}){
        if(data){
            this.closeDate = getFieldValue(data,this.dateField)
            clearInterval(this.setTimeInterval)
            this.setTimeInterval = setInterval(() =>{
            let closeDateTime = new Date(this.closeDate).getTime()
            let currentDateTime = new Date().getTime()
            let timeDiffInMs = closeDateTime - currentDateTime
        
            if(this.closeDate === null) {
                this.noDataBoolean = true;
                this.noData = " No Data Found in Date Field "
                console.log("No Data Found : null")
                this.boolStatus = false;
                this.showSeconds = false;
                this.showMinutes = false
                this.showHours =false;
                this.showDays = false;
                this.showWeeks = false;

            }

            
            else if(timeDiffInMs < 0){
            this.timerData = ' Date Expired!! '
            this.boolStatus=true;
            this.noData = false;
            this.showSeconds = false;
            this.showMinutes = false
            this.showHours =false;
            this.showDays = false;
            this.showWeeks = false;

            clearInterval(this.setTimeInterval)
            }
            else{
            this.boolStatus=false;
            this.noDataBoolean = false;
            let days = Math.floor(timeDiffInMs/(1000*60*60*24))
            let weeks = Math.floor(days/7)
            let totalWeeks = Math.ceil(days/7)
            let remDays = days - (weeks * 7)


            let hours = Math.floor((timeDiffInMs % (1000*60*60*24)) / (1000*60*60))
            let totalHrs = Math.floor(timeDiffInMs/(1000*60*60))

            let mins = Math.floor((timeDiffInMs % (1000*60*60)) / (1000*60))
            let totalMins = Math.floor(timeDiffInMs/(1000*60))

            let secs = Math.floor((timeDiffInMs % (1000*60)) / (1000))
            let totalSecs = Math.floor(timeDiffInMs/1000)

            
                if(this.showSeconds === true && this.showMinutes === true && this.showHours === true 
                    && this.showDays === true && this.showWeeks === true ){

                    this.Default = true
                    this.dWeek = weeks+" Week(s)";
                    this.dDay = remDays+" Day(s)";
                    this.dHour = hours+" Hour(s)";
                    this.dMin = mins+" Min(s)";
                    this.dSec = secs+" Sec(s)";
                }
                else if(this.showHours === true 
                    && this.showDays === true && this.showWeeks === true){
                        
                    this.dWeek = weeks+" Week(s)";
                    this.dDay = remDays+" Day(s)";
                    this.dHour = hours+" Hour(s)";


                }
                else if(this.showHours === true && this.showMinutes === true && this.showDays === true && this.showWeeks === true){
                        
                    // this.dWeek = weeks+" Week(s)";
                    // this.dDay = remDays+" Day(s)";
                    // this.dHour = hours+" Hour(s)";
                    // this.dMin = mins+" Min(s)";

                this.dWeek = weeks+" Week(s)";
                this.dDay= remDays+" Day(s)";
                this.dHour=hours+" Hour(s)";
                this.dMin=mins+" Min(s)";
                this.dSec=secs+" Sec(s)";


                }
                else if(this.showSeconds === true && this.showMinutes === true && this.showHours === true 
                    && this.showDays === true){
                        
                    this.dDay = days+" Day(s)";
                    this.dHour = hours+" Hour(s)";
                    this.dMin = mins+" Min(s)";
                    this.dSec = secs+" Sec(s)";
                    }
                else if(this.showSeconds === true && this.showMinutes === true && this.showHours === true){

                    this.dHour = totalHrs+" Hour(s)";
                    this.dMin = mins+" Min(s)";
                    this.dSec = secs+" Sec(s)";
                }
                else if(this.showDays === true && this.showWeeks === true){
                    
                    this.dWeek = weeks+" Week(s)";
                    this.dDay= remDays+" Day(s)";
                
                }
                else if(this.showSeconds === true && this.showMinutes === true){
                    
                    this.dMin = totalMins+" Min(s)";
                    this.dSec = secs+" Sec(s)";

                }
                else if(this.showSeconds === true){
                    this.dSec = totalSecs+" Sec(s)";
                }
                else if(this.showMinutes === true){
                    this.dMinc= totalMins+" Min(s)";
                }
                else if (this.showDays === true){
                    this.dDay = days+" Day(s)";
                }
                else if (this.showWeeks === true){
                    this.dWeek = totalWeeks+" Week(s)";
                }
                else if(this.Default === true){
                    this.dWeek = weeks+" Week(s)";
                    this.dDay = remDays+" Day(s)";
                    this.dHour = hours+" Hour(s)";
                    this.dMin = mins+" Min(s)";
                    this.dSec = secs+" Sec(s)";

                }
                else{

                this.dWeek = weeks+" Week(s)";
                this.dDay= remDays+" Day(s)";
                this.dHour=hours+" Hour(s)";
                this.dMin=mins+" Min(s)";
                this.dSec=secs+" Sec(s)";

                }
            
}
            },1000)

            
        }
    if(error){
        console.error(error)
        }
    }
    
    
}