import { Injectable } from '@angular/core';
import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/modules/shared/interface/user';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public $userData: BehaviorSubject<User>;
	
	constructor() {
		this.$userData = new BehaviorSubject({nameType: "admin"} as  User);
	}

	setSessionUser(user: User) {
		this.$userData.next(user);
	}

	$getSerssionUser(): Observable<any>{
		return of(this.$userData.getValue());
	}

}
