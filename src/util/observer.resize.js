import { Observable, BehaviorSubject  } from 'rxjs'

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