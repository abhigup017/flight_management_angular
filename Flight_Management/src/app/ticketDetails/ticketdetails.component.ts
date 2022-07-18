import { Component, OnInit } from '@angular/core';
import { TicketdetailsService } from '../services/ticketdetails.service';
import { TicketHistoryModel } from './ticketModels/ticketHistoryModel';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['../../styles.css']
})
export class TicketdetailsComponent implements OnInit {

  constructor(private _ticket:TicketdetailsService) { }

  ngOnInit(): void {
  }

showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
pnrNumber:string="";
ticketHistory:TicketHistoryModel = new TicketHistoryModel();
isShowNoResultFound:boolean=false;

DisplayModalPopup(modalHeader:string, modaltext:string)
{
  this.modalHeader = modalHeader;
  this.modalText=modaltext;
  document.getElementById("btnLaunchModal")?.click();
}

ShowSpinner()
{
  this.showSpinner = true;
}

HideSpinner()
{
  this.showSpinner = false;
}

GetTicketHistory()
{
  this.ShowSpinner(); 
  this._ticket.GetTicketHistory(this.pnrNumber).subscribe(res => {this.HideSpinner(), this.BindTicketHistoryResults(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", err.error)});
}

BindTicketHistoryResults(response:any)
{
  this.ticketHistory = response;
  this.isShowNoResultFound = false;
}

SetNoResultFound()
{
  this.isShowNoResultFound = true;
}

ViewTicketDetails()
{
   let modalText = "PNR Number: " + this.ticketHistory.pnrnumber + "\nCustomer Name: " + this.ticketHistory.customerName
   +"\nCustomer Email-Id: " + this.ticketHistory.customerEmailId
   +"\nBooked On: " + (new Date(this.ticketHistory.bookedOn)).toLocaleString()
   +"\nTravel Date: " + (new Date(this.ticketHistory.travelDate)).toLocaleString()
   +"\nSource Location: " + this.ticketHistory.sourceLocation
   +"\nDestination Location: " + this.ticketHistory.destinationLocation
   +"\nIsCancelled: " + this.ticketHistory.isCancelled
   +"\nMeal plan selected: " + this.ticketHistory.mealPlanType
   +"\n\nBooking Passenger Details";

   for(let i = 0; i < this.ticketHistory.bookingPassenger.length; i++)
   {
     let seatType = this.ticketHistory.bookingPassenger[i].isBusinessSeat ? "Business" : "Regular"
     modalText = modalText + "\n\nPassenger Name: " + this.ticketHistory.bookingPassenger[i].passengerName
     +"\nPassenger Age: " + this.ticketHistory.bookingPassenger[i].passengerAge
     +"\nPassenger Gender: " + this.ticketHistory.bookingPassenger[i].genderType
     +"\nSeat No: " + this.ticketHistory.bookingPassenger[i].seatNo
     +"\nSeat Type: " + seatType;
   }

   this.DisplayModalPopup("Ticket Details", modalText);
}

}
