import { Component } from "angular2/core";
import AppService from "./app-service";

@Component({
    selector: "app",
    template: `
        <h1>Complete Angular 2 Seed</h1>
        <p>Name: {{name}}</p>
        <button (click)="getName()">Get Name</button>
    `,
    providers: [AppService]
})
export default class AppComponent {

    private name: String;

    constructor(private appService: AppService) {}

    public getName(): void {
        this.name = this.appService.getName();
    }

}
