import "es6-shim";
import "es6-promise";
import "zone.js";
import "rxjs";
import "reflect-metadata";

import "../../typings/browser.d.ts";

import {Injector, enableProdMode} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";

import GithubComponent from "./gihub-component";
import GithubService from "./github-service";
import Config from "../config";

import * as sinon from "sinon";

enableProdMode();

describe("github-component", () => {

    let injector: Injector;
    let component: any;
    let service: any;

    beforeEach(() => {
        injector = Injector.resolveAndCreate([
            HTTP_PROVIDERS,
            GithubComponent,
            GithubService,
            Config
        ]);
        component = injector.get(GithubComponent);
        service = injector.get(GithubService);
        sinon.spy(service, "searchRepositories");
    });

    afterEach(() => {
        service.searchRepositories.restore();
    });

    it("searches for repository", () => {
        component.query.updateValue("test");

        return setTimeout(() => {
            sinon.assert.calledOnce(service.searchRepositories);
            sinon.assert.calledWith(service.searchRepositories, "test");
        }, 300);
    });

});
