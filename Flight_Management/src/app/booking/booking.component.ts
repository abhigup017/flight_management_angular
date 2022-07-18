import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BookingService } from '../services/booking.service';
import { DiscountService } from '../services/discount.service';
import { DropdownService } from '../services/dropdown.service';
import { MockService } from '../services/mock.service';
import { SearchService } from '../services/search.service';
import { DropdownModel } from '../sharedModels/dropdownModel';
import { BookingPassengers } from './model/bookingPassengers';
import { FlightSearchRequest } from './model/flightSearchRequest';
import { FlightSearchResultParamaters } from './model/flightSearchResultParamaters';
import { FlightSearchResults } from './model/flightSearchResults';
import { FlightSearchParamaters } from './model/flightSsearchParamaters';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['../../styles.css']
})
export class BookingComponent implements OnInit {

  constructor(private _dropdownService:DropdownService, private _search:SearchService, private _mock:MockService, private _discount:DiscountService, private _booking:BookingService, private _router:Router) { }

  ngOnInit(): void {
    //this.ShowSpinner();
    //this._dropdownService.GetLocationTypes().subscribe(res => {this.HideSpinner(), this.BindLocations(res)}, err => {this.HideSpinner()});

    this.ShowSpinner();
    forkJoin(this._dropdownService.GetMealPlanTypes(), this._dropdownService.GetLocationTypes(), this._dropdownService.GetGenderTypes())
    .subscribe(([mealResponse,locationResponse,genderTypes]) =>
    {
      this.BindMealTypes(mealResponse);
      this.BindLocations(locationResponse);
      this.BindGenderTypes(genderTypes);
      
      this.HideSpinner();
    });
    this.SetMinDate();
  }

showSpinner:boolean=false;
modalText:string="";
modalHeader:string="";
locations:Array<DropdownModel> = new Array<DropdownModel>();
genderTypes:Array<DropdownModel> = new Array<DropdownModel>();
sourceLocationSelected:any;
destinationLocationSelected:any;
selectedRadioOption:string="Onward";
today:any;
isRoundTripSelected:boolean=false;
flightSearchRequest:FlightSearchRequest = new FlightSearchRequest();
flightSearchResults:FlightSearchResults = new FlightSearchResults();
isSearchClicked:boolean=false;
mealTypes:Array<DropdownModel> = new Array<DropdownModel>();
mealTypeSelectedOnward:any;
mealTypeSelectedRound:any;
noOfPassengers:any;
totalBookingCost:number=0;
vacantBusinessOnward:number=0;
vacantRegularOnward:number=0;
vacantBusinessRound:number=0;
vacantRegularRound:number=0;
isBookingProcessing:boolean=false;
bookingPassengers:Array<BookingPassengers> = new Array<BookingPassengers>();
dummySeatNumbers:Array<any> = new Array<any>();
isOnwardFlightSelected:boolean=false;
isRoundFlightSelected:boolean=false;
onwardFlightSelected:any;
roundFlightSelected:any;
seatTypeOnward:string="Business";
seatTypeReturn:string="Business";
discountCode:string="";
onwardFlightDiscountedPrice:number=0;
roundFlightDiscountedPrice:number=0;
isDiscountApplied:boolean=false;
customerName:string="";
customerEmailId:string="";

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

BindLocations(locations:any)
{
  this.locations = locations;
  this.sourceLocationSelected = locations[0];
  this.destinationLocationSelected = locations[1];
}

BindGenderTypes(genderTypes:any)
{
  this.genderTypes = genderTypes;
}

SetMinDate()
{
  this.today = new Date().toISOString().split('T')[0];
  this.today = this.today + 'T00:00';
}

OnRadioOptionChange(option:string)
{
  switch(option)
  {
    case 'onwardTrip' :
      {
        this.isRoundTripSelected = false;
        this.OnPassengerCountChange();
        break;
      }
      case 'roundTrip' :
        {
          this.isRoundTripSelected = true;
          this.flightSearchRequest.roundTripRequest = new FlightSearchParamaters();
          this.flightSearchResults.roundTripResults = new Array<FlightSearchResultParamaters>();
          this.vacantBusinessRound = 0;
          this.vacantRegularRound = 0;
          this.OnPassengerCountChange();
          break;
        }
  }
}

SearchFlights()
{
  if(this.flightSearchRequest.onwardTripRequest.travelDateTime == undefined)
  {
    this.DisplayModalPopup("Error", "Please select the onward journey travel date");
    return;
  }
  
  let onwardTripRequest = {
    sourceId: this.sourceLocationSelected.id,
    destinationId: this.destinationLocationSelected.id,
    travelDateTime: this.flightSearchRequest.onwardTripRequest.travelDateTime,
    isTimeBasedSearch: this.flightSearchRequest.onwardTripRequest.isTimeBasedSearch
  }

  this.flightSearchRequest.onwardTripRequest = onwardTripRequest;

  if(this.isRoundTripSelected)
  {
    if(this.flightSearchRequest.roundTripRequest.travelDateTime == undefined)
  {
    this.DisplayModalPopup("Error", "Please select the return journey travel date");
    return;
  }
     let roundTripRequest = {
       sourceId: this.destinationLocationSelected.id,
       destinationId: this.sourceLocationSelected.id,
       travelDateTime: this.flightSearchRequest.roundTripRequest.travelDateTime,
       isTimeBasedSearch: this.flightSearchRequest.roundTripRequest.isTimeBasedSearch
     }

     this.flightSearchRequest.roundTripRequest = roundTripRequest;
  }
  else
  {
    this.flightSearchRequest.roundTripRequest = new FlightSearchParamaters();
  }

  this.ShowSpinner();
this._search.SearchFlights(this.flightSearchRequest).subscribe(res => {this.HideSpinner(), this.ResetFields(), this.BindSearchResults(res)},
err => {this.HideSpinner(), this.DisplayModalPopup("Error", "An error occurred while searching for flights")});
  
}

BindSearchResults(result:any)
{
  this.flightSearchResults.onwardTripResults = result.onwardTripResults;
  this.flightSearchResults.roundTripResults = result.roundTripResults;
  this.isSearchClicked = true;
}

BindMealTypes(mealTypes:any)
{
  mealTypes.splice(2,1);
  this.mealTypes = mealTypes;
  this.mealTypeSelectedOnward = mealTypes[2];
  this.mealTypeSelectedRound = mealTypes[2];
}

OnOnwardResultSelect(flight:any)
{
  let selectedIndex = this.flightSearchResults.onwardTripResults.findIndex(x => x.isSelected);
  if(selectedIndex >= 0)
  {
    this.flightSearchResults.onwardTripResults[selectedIndex].isSelected = false;
  }

  flight.isSelected = true;
  this.vacantBusinessOnward = flight.vacantBusinessSeats;
  this.vacantRegularOnward = flight.vacantRegularSeats;

  let tempTotalCost = flight.cost;

  if(this.isRoundTripSelected)
  {
    selectedIndex = this.flightSearchResults.roundTripResults.findIndex(x => x.isSelected);
    if(selectedIndex >= 0)
    {
      tempTotalCost = tempTotalCost + this.flightSearchResults.roundTripResults[selectedIndex].cost;
    }
  }

  this.totalBookingCost = tempTotalCost * Number(this.noOfPassengers);
  debugger;
}

OnRoundResultSelect(flight:any)
{
  let selectedIndex = this.flightSearchResults.roundTripResults.findIndex(x => x.isSelected);
  if(selectedIndex >= 0)
  {
    this.flightSearchResults.roundTripResults[selectedIndex].isSelected = false;
  }

  flight.isSelected = true;
  this.vacantBusinessRound = flight.vacantBusinessSeats;
  this.vacantRegularRound = flight.vacantRegularSeats;

  let tempTotalCost = flight.cost;

  
    selectedIndex = this.flightSearchResults.onwardTripResults.findIndex(x => x.isSelected);
    if(selectedIndex >= 0)
    {
      tempTotalCost = tempTotalCost + this.flightSearchResults.onwardTripResults[selectedIndex].cost;
    }
  

  this.totalBookingCost = tempTotalCost * Number(this.noOfPassengers);
}

OnPassengerCountChange()
{
  let tempCost = 0;
  let selectedIndex = this.flightSearchResults.onwardTripResults.findIndex(x => x.isSelected);

  if(selectedIndex >= 0)
  {
    tempCost = this.flightSearchResults.onwardTripResults[selectedIndex].cost;
  }

if(this.isRoundTripSelected)
{
    
  selectedIndex = this.flightSearchResults.roundTripResults.findIndex(x => x.isSelected);

  if(selectedIndex >= 0)
  {
    tempCost = tempCost + this.flightSearchResults.roundTripResults[selectedIndex].cost;
  }
}

  this.totalBookingCost = tempCost * Number(this.noOfPassengers);
  debugger;
}

ResetFields()
{
  this.vacantBusinessOnward = 0;
  this.vacantRegularOnward = 0;
  this.vacantBusinessRound = 0;
  this.vacantRegularRound = 0;
  this.noOfPassengers = 0;
  this.totalBookingCost = 0;
}

ContinueBooking()
{
  let onwardSelectedIndex = this.flightSearchResults.onwardTripResults.findIndex(x => x.isSelected);
  let roundSelectedIndex = -1;

  if(this.isRoundTripSelected)
  {
    roundSelectedIndex = this.flightSearchResults.roundTripResults.findIndex(x => x.isSelected);
  }

  if(onwardSelectedIndex < 0 && roundSelectedIndex < 0)
  {
    this.DisplayModalPopup("Error", "Please select a Flight to continue booking");
    return;
  }

  if(this.noOfPassengers == undefined || this.noOfPassengers <= 0)
  {
    this.DisplayModalPopup("Error", "Please select a minimum of 1 passenger to continue booking");
    return;
  }

  this.isBookingProcessing = true;
  
  for(let i = 0; i < Number(this.noOfPassengers); i++)
  {
    let dummyPassenger:BookingPassengers = new BookingPassengers();
    dummyPassenger.passengerName = "Passenger " + (i+1);
    dummyPassenger.index = i;
    this.bookingPassengers.push(dummyPassenger);
  }

  this.dummySeatNumbers = this._mock.GenerateDummySeatNumbers();

  // this.isOnwardFlightSelected = this.flightSearchResults.onwardTripResults.findIndex(x => x.isSelected) >=0 ? true : false;
  // this.isRoundTripSelected = this.isRoundTripSelected && this.flightSearchResults.roundTripResults.findIndex(x => x.isSelected) >=0 ? true : false;

  // if(this.isOnwardFlightSelected)
  // {
  //   this.onwardFlightSelected = 
  // }

  if(onwardSelectedIndex >= 0)
  {
    this.onwardFlightSelected = this.flightSearchResults.onwardTripResults[onwardSelectedIndex];
    this.isOnwardFlightSelected = true;
  }
  if(this.isRoundTripSelected && roundSelectedIndex  >= 0)
  {
    this.roundFlightSelected = this.flightSearchResults.roundTripResults[roundSelectedIndex];
    this.isRoundFlightSelected = true;
  }
  window.scroll({ top: 0, left: 0, behavior: 'smooth' });

}

OnRadioOnwardChange(seatType:string)
{
  switch(seatType)
  {
    case 'Business':
      {
        this.seatTypeOnward = "Business";
        break;
      }
      case 'Regular':
        {
        this.seatTypeOnward = "Regular";
        break;
        }
  }

  
}

OnRadioReturnChange(seatType:string)
{
  switch(seatType)
  {
    case 'Business':
      {
        this.seatTypeReturn = "Business";
        break;
      }
      case 'Regular':
        {
        this.seatTypeReturn = "Regular";
        break;
        }
  }
}

CheckOutBooking()
{
   for(let i = 0; i < this.bookingPassengers.length; i++)
   {
    if(this.customerName == "")
    {
      this.DisplayModalPopup("Error","Please enter customer's name");
      return;
    }
    if(this.customerEmailId == "")
    {
      this.DisplayModalPopup("Error","Please enter the customer's email-id");
      return;
    }
    if(this.bookingPassengers[i].passengerName == "")
     {
        this.DisplayModalPopup("Error","Please enter the passenger name for passenger " + (i + 1));
        return;
     }
     if(this.bookingPassengers[i].genderId <= 0)
     {
      this.DisplayModalPopup("Error","Please select the gender for passenger "+ (i + 1));
      return;
     }
     if(this.bookingPassengers[i].passengerAge == null || this.bookingPassengers[i].passengerAge == undefined)
     {
      this.DisplayModalPopup("Error","Please enter the age for passenger " + (i + 1));
      return;
     }
     if(this.isOnwardFlightSelected && this.bookingPassengers[i].seatnoOnward == "")
     {
      this.DisplayModalPopup("Error","Please select the onward seat for passenger " + (i + 1));
      return;
     }
     if(this.isRoundFlightSelected && this.bookingPassengers[i].seatnoRound == "")
     {
      this.DisplayModalPopup("Error","Please select the return seat for passenger " + (i + 1));
      return;
     }
    }

     if(this.isOnwardFlightSelected && this.isRoundFlightSelected)
     {
       if(this.seatTypeOnward == 'Business' && (Number(this.noOfPassengers) > this.vacantBusinessOnward))
       {
         this.DisplayModalPopup("Error", "Cannot book onward Business ticket as passenger count exceeds vacant seats.");
         return;
       }
       if(this.seatTypeOnward == 'Regular' && (Number(this.noOfPassengers) > this.vacantRegularOnward))
       {
         this.DisplayModalPopup("Error", "Cannot book onward Regular ticket as passenger count exceeds vacant seats.");
         return;
       }
       if(this.seatTypeReturn == 'Business' && (Number(this.noOfPassengers) > this.vacantBusinessRound))
       {
          this.DisplayModalPopup("Error", "Cannot book return Business ticket as passenger count exceeds vacant seats.");
          return;
       }
       if(this.seatTypeReturn == 'Regular' && (Number(this.noOfPassengers) > this.vacantRegularRound))
       {
         this.DisplayModalPopup("Error", "Cannot book return regular ticket as passenger count exceeds vacant seats.");
         return;
       }
       this.ShowSpinner();
      //  let onwardBookingRequest = this.GenerateOnwardFlightBookingRequest();
      //  let returnBookingRequest = this.GenerateReturnFlightBookingRequest();
      //  this._booking.BookFlightTicket(onwardBookingRequest).subscribe(res => {this.HideSpinner()}
      //  ,err => {});
      forkJoin(this._booking.BookFlightTicket(this.GenerateOnwardFlightBookingRequest()), this._booking.BookFlightTicket(this.GenerateReturnFlightBookingRequest()))
      .subscribe(([onwardBookingResponse, returnBookingResponse]) =>
      {
        this.HideSpinner();
        // this.DisplayModalPopup("Success", "Booking created successfully, redirecting you back to the Home page");
        window.alert("Booking created successfully, Redirecting you back to the Home page");
        this._router.navigate(['Home'])
      })
     }
     else if(this.isOnwardFlightSelected)
     {
      if(this.seatTypeOnward == 'Business' && (Number(this.noOfPassengers) > this.vacantBusinessOnward))
       {
         this.DisplayModalPopup("Error", "Cannot book onward Business ticket as passenger count exceeds vacant seats.");
         return;
       }
       if(this.seatTypeOnward == 'Regular' && (Number(this.noOfPassengers) > this.vacantRegularOnward))
       {
         this.DisplayModalPopup("Error", "Cannot book onward Regular ticket as passenger count exceeds vacant seats.");
         return;
       }
      this.ShowSpinner();
      this._booking.BookFlightTicket(this.GenerateOnwardFlightBookingRequest())
      .subscribe(res => {this.HideSpinner(), window.alert("Booking created successfully, Redirecting you back to the Home page"), this._router.navigate(['Home'])},
      err => {});
     }
     else if(this.isRoundFlightSelected)
     {
      if(this.seatTypeReturn == 'Business' && (Number(this.noOfPassengers) > this.vacantBusinessRound))
       {
          this.DisplayModalPopup("Error", "Cannot book return Business ticket as passenger count exceeds vacant seats.");
          return;
       }
       if(this.seatTypeReturn == 'Regular' && (Number(this.noOfPassengers) > this.vacantRegularRound))
       {
         this.DisplayModalPopup("Error", "Cannot book return regular ticket as passenger count exceeds vacant seats.");
         return;
       }
      this.ShowSpinner();
      this._booking.BookFlightTicket(this.GenerateReturnFlightBookingRequest())
      .subscribe(res => {this.HideSpinner(), window.alert("Booking created successfully, Redirecting you back to the Home page"), this._router.navigate(['Home'])},
      err => {});
     }

    
  }



ApplyDiscount()
{
  if(this.discountCode == "")
  {
    this.DisplayModalPopup("Error", "Please enter a discount code");
    return;
  }
  this.ShowSpinner();
  this._discount.ApplyDiscount(this.discountCode).subscribe(res => {this.HideSpinner(), this.ProcessDiscount(res)},
  err => {this.HideSpinner(), this.DisplayModalPopup("Error", err.error.errorMessage)});
}

ProcessDiscount(value:any)
{
  let discountValue = Number(value.discountValue) / 100;

  let newTotalBookingCost = this.totalBookingCost - (this.totalBookingCost * discountValue);
  this.totalBookingCost = Number(newTotalBookingCost.toFixed(2));

  if(this.isOnwardFlightSelected)
  {
    this.onwardFlightDiscountedPrice = this.onwardFlightSelected.cost - (this.onwardFlightSelected.cost * discountValue);
  }

  if(this.isRoundFlightSelected)
  {
    this.roundFlightDiscountedPrice = this.roundFlightSelected.cost - (this.roundFlightSelected.cost * discountValue);
  }

  this.DisplayModalPopup("Success", "Discount applied successfully, new total booking cost is "+ this.totalBookingCost);

  this.isDiscountApplied = true;
}

GenerateOnwardFlightBookingRequest()
{
  let bookingOnwardPassengerDetails = new Array<any>();

       for(let i = 0; i < this.bookingPassengers.length; i++)
       {
         let passenger = {
           passengerId:0,
           bookingId:0,
           passengerName:this.bookingPassengers[i].passengerName,
           genderId:this.bookingPassengers[i].genderId,
           genderType:"",
           passengerAge:Number(this.bookingPassengers[i].passengerAge),
           seatNo:this.bookingPassengers[i].seatnoOnward,
           isBusinessSeat:this.seatTypeOnward == 'Business' ? true : false,
           isRegularSeat:this.seatTypeOnward == 'Regular' ? true : false
         }

         bookingOnwardPassengerDetails.push(passenger);
       }
       let onwardFlightBookingRequest = {
         flightId: this.onwardFlightSelected.flightId,
         customerName: this.customerName,
         customerEmailId: this.customerEmailId,
         noOfSeats: Number(this.noOfPassengers),
         mealPlanId: this.mealTypeSelectedOnward.id,
         pnrNumber: "",
         travelDate: this.flightSearchRequest.onwardTripRequest.travelDateTime,
         bookedOn: this.flightSearchRequest.onwardTripRequest.travelDateTime,
         totalCost: this.onwardFlightDiscountedPrice == 0 ? this.onwardFlightSelected.cost : this.onwardFlightDiscountedPrice * Number(this.noOfPassengers),
         isCancelled: false,
         bookingPassenger: bookingOnwardPassengerDetails
       }

       return onwardFlightBookingRequest;
}

GenerateReturnFlightBookingRequest()
{
  let bookingReturnPassengerDetails = new Array<any>();

       for(let i = 0; i < this.bookingPassengers.length; i++)
       {
         let passenger = {
           passengerId:0,
           bookingId:0,
           passengerName:this.bookingPassengers[i].passengerName,
           genderId:this.bookingPassengers[i].genderId,
           genderType:"",
           passengerAge:Number(this.bookingPassengers[i].passengerAge),
           seatNo:this.bookingPassengers[i].seatnoRound,
           isBusinessSeat:this.seatTypeReturn == 'Business' ? true : false,
           isRegularSeat:this.seatTypeReturn == 'Regular' ? true : false
         }

         bookingReturnPassengerDetails.push(passenger);
        }

         let returnFlightBookingRequest = {
          flightId: this.roundFlightSelected.flightId,
          customerName: this.customerName,
          customerEmailId: this.customerEmailId,
          noOfSeats: Number(this.noOfPassengers),
          mealPlanId: this.mealTypeSelectedRound.id,
          pnrNumber: "",
          travelDate: this.flightSearchRequest.roundTripRequest.travelDateTime,
          bookedOn: this.flightSearchRequest.roundTripRequest.travelDateTime,
          totalCost: this.roundFlightDiscountedPrice == 0 ? this.roundFlightSelected.cost : this.roundFlightDiscountedPrice * Number(this.noOfPassengers),
          isCancelled: false,
          bookingPassenger: bookingReturnPassengerDetails
        }

        return returnFlightBookingRequest;
      
}

}
