import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class HttpHelperService {
    constructor(private http: HttpClient) { }
    get(url) {
        return this.http.get(url);
    }
    post(url, data) {
        return this.http.post(url, data);
    }
    delete(url, data) {
        let headers = new HttpHeaders();
        headers =  headers.set('Content-Type', 'application/json');
        return this.http.request('DELETE', url, {
            headers: headers,
            body: data
        });
    }
    put(url, data) {
        return this.http.put(url, data);
    }
}