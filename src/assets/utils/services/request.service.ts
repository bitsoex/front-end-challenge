import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RequestSerivce {
    private baseURL = "https://api.bitso.com/v3";
    private endpoint = "";

    constructor(private http: HttpClient) {  }

    public setEndpoint(newEndpoint: String): void {
        this.endpoint = this.baseURL + newEndpoint;
    }

    // public get(): Observable<object[]> {
    //     return this.http.get(this.endpoint)
    //         .map((res: Response) => res.json())
    //         .catch();
    // }
}
