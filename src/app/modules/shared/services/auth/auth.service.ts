import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/modules/shared/interface/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly USER_KEY = 'user';
	private $userData: BehaviorSubject<User| null>;
	
	constructor() {
		this.$userData = new BehaviorSubject<User| null>(null);
	}

	setSessionUser(user: User | null) {
		this.$userData.next(user);
	}

	$getSerssionUser(): Observable<any>{
		// if(!this.$userData.getValue()){
		// 	 =sessionStorage.getItem(this.USER_KEY)
		// }
		return of(this.$userData.getValue());
	}

}
