import { Observable, Subscriber } from 'rxjs';

export class MainClass {
  
  availabilityThreshold: number = 30;
  
  constructor(){
    console.log('Constructor called');
  }

  //callback
  //Promise
  // Observable

  monitoringCallback(callback: (error: string | null, result?: string) => void): void {
      setTimeout(() => {
        const randAvailability = Math.random() * 100;
        if (randAvailability >= this.availabilityThreshold) {
          callback(null, 'Succesful request, availability: ' + randAvailability.toString());
        }
        else {
          callback('Error: Availability is only: ' + randAvailability.toString() + '%');
        }
    }, 3000);

  }

  monitoringPromise(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randAvailability = Math.random() * 100;
        if (randAvailability >= this.availabilityThreshold) {
          resolve('Succesful request, availability: ' + randAvailability.toString() + '%');
        }
        else {
          reject('Error: Availability is only: ' + randAvailability.toString() + '%');
        }
      }, 3000);

    }); 
  }

  monitoringObservable(): Observable<string> {
    return new Observable((subscriber: Subscriber<string>) => {
      let counter = 0;
      const interval =setInterval(() => {
        const randAvailability = Math.random() * 100;
        if (randAvailability >= this.availabilityThreshold) {
          subscriber.next('Succesful request, availability: ' + randAvailability.toString() + '%');
        }
        else {
          subscriber.error('Error: Availability is only: ' + randAvailability.toString() + '%');
        }
        clearInterval(interval);
        counter++;
        if (counter === 5) {
          subscriber.complete();
        }
      }, 2000);
    });
}
}