import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabControlService {

  private index:number = 0;
  private mySubject = new Subject<any>()
  message$ = this.mySubject.asObservable();

  constructor() { }

  emitTab(event:any){
    this.mySubject.next({event, index: this.index});
  }

  setIndex(index:number){
    this.index = index;
  }

  setNextIndex(){
    this.index++;
  }

  resetIndex(){
    this.index = 0;
  }

}
