import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {
    public authUrl: string;

    constructor(
        public http: HttpClient
    ) { }

    singupUser(email: string, password: string) {
        let data = {
            email: email,
            password: password
        };

        return this.http.put(this.authUrl, data);
    }

}
