import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
// import {ToastService} from "./toast.service";

@Injectable()
export class AuthService {
    public authUrl: string;

    constructor(
        public http: Http,
        // public toast: ToastService
    ) { }

    singupUser(email: string, password: string) {
        let data = {
            email: email,
            password: password
        };

        return this.http.put(this.authUrl, data);
    }

}