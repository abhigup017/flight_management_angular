import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() { }
dummySeatNumbers:Array<any> = new Array<any>();

  GenerateDummySeatNumbers()
{
 this.dummySeatNumbers.push({id:1, seatNo:'1A'})
 this.dummySeatNumbers.push({id:2, seatNo:'1B'})
 this.dummySeatNumbers.push({id:3, seatNo:'1C'})
 this.dummySeatNumbers.push({id:4, seatNo:'1D'})
 this.dummySeatNumbers.push({id:5, seatNo:'1E'})
 this.dummySeatNumbers.push({id:6, seatNo:'1F'})
 this.dummySeatNumbers.push({id:7, seatNo:'2A'})
 this.dummySeatNumbers.push({id:8, seatNo:'2B'})
 this.dummySeatNumbers.push({id:9, seatNo:'2C'})
 this.dummySeatNumbers.push({id:10, seatNo:'2D'})
 this.dummySeatNumbers.push({id:11, seatNo:'2E'})
 this.dummySeatNumbers.push({id:12, seatNo:'2F'})
 this.dummySeatNumbers.push({id:13, seatNo:'3A'})
 this.dummySeatNumbers.push({id:14, seatNo:'3B'})
 this.dummySeatNumbers.push({id:15, seatNo:'3C'})
 this.dummySeatNumbers.push({id:16, seatNo:'3D'})
 this.dummySeatNumbers.push({id:17, seatNo:'3E'})
 this.dummySeatNumbers.push({id:18, seatNo:'3F'})
 this.dummySeatNumbers.push({id:19, seatNo:'4A'})
 this.dummySeatNumbers.push({id:20, seatNo:'4B'})
 this.dummySeatNumbers.push({id:21, seatNo:'4C'})
 this.dummySeatNumbers.push({id:22, seatNo:'4D'})
 this.dummySeatNumbers.push({id:23, seatNo:'4E'})
 this.dummySeatNumbers.push({id:24, seatNo:'4F'})

 return this.dummySeatNumbers;
}
}
