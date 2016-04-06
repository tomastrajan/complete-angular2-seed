import { Component } from "angular2/core";

@Component({
    selector: "about",
    template: `
        <div class="col s12 m6">
            <h3>About</h3>
            <p>Complete Angular 2 seed with focus on workflow, infrastructure and testing</p>
            <h4>Stack</h4>
            <ul>
                <li>Angular 2</li>
                <li>Typescript 1.8+</li>
                <li>TSlint</li>
                <li>Mocha</li>
                <li>Mochify</li>
                <li>Webpack 2</li>
                <li>Travis CI</li>
            </ul>
        </div>
    `
})
export default class AboutComponent {}
