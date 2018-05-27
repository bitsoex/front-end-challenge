import { Observable, BehaviorSubject  } from 'rxjs'

/** 
 * This generate a global Observer listen the browser window change.
 * The resize event  is sent to the Observer element when the size of * * the browser window change. Then anybody can subscribe to listen and 
 * determine the new size of the parent container.
 *
 * observerResize - The function return an rxjs observer.
 */
var subject = new BehaviorSubject(null);
var observer =  Observable.timer(300)
	.merge(
		subject,
		Observable.fromEvent(window, 'resize')
	)
	.debounceTime(100);
	
export const observerResize = ()=>{
	return observer;
}