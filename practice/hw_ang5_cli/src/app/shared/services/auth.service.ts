import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
    public authUrl: string;

    constructor(
        public http: HttpClient
    ) { }

    loginUser(email: string, password: string) {
        let params = {
            email: email,
            password: password
        };

        return this.http.put(this.authUrl, params);
    }

}
