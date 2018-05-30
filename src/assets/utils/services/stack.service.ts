import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { ConstantsManager } from "../constants";
import { IBooks } from "../DTO/books.interface";
import { ITicker } from "../DTO/ticker.interface";
import { ITrades } from "../DTO/trades.interface";

@Injectable()
export class StackService {
    constructor(private http: HttpClient) {}

    public getAvailableBooks(): Observable<IBooks[]> {
        return this.http.get(ConstantsManager.AVAILABLE_BOOKS)
            // .map((res: Response) => res.payload )
            .catch(this.handleError);
    }

    public getTicker(): Observable<ITicker[]> {
        return this.http.get(ConstantsManager.TICKER)
            // .map((res: Response) => res.payload )
            .catch(this.handleError);
    }

    public getTrades(): Observable<ITrades[]> {
        return this.http.get(ConstantsManager.TRADES)
            // .map((res: Response) => res.payload )
            .catch(this.handleError);
    }

    private handleError(error: any) {
        return Observable.throw(error || "Server error");
    }
}
