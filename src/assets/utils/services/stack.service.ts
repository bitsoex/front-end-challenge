import { Injectable } from "@angular/core";
import { HttpClient } from "selenium-webdriver/http";

@Injectable()
export class StackService {
    private baseUrl: String = "";
    constructor(private http: HttpClient) {}
}
