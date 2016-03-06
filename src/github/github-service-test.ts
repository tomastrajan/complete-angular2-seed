import "reflect-metadata";

import * as assert from "assert";
//import * as sinon from "sinon";

import { BaseRequestOptions, Http, Response } from "angular2/http";
import { MockBackend } from "angular2/http/testing";

import Config from "../config";
import GithubService from "./github-service";
//import GithubService, { Repository } from "./github-service";
import {} from "angular2/http";
import {ResponseOptions} from "angular2/http";

describe("github-service", () => {

    let service: GithubService;
    let connection: any;

    beforeEach(() => {
        const backend: MockBackend = new MockBackend();
        const http: Http = new Http(backend, new BaseRequestOptions());
        backend.connections.subscribe((c: any) => connection = c);
        service = new GithubService(http, new Config());
    });

    it.skip("transforms response", (done: any) => {
        service.getRepos("test").subscribe((repos: any) => {
            console.log(repos);
            assert.equal(repos, [{
                id: 1,
                name: "test",
                owner: {}
            }]);
            done();
        });

        connection.mockRespond(new Response(new ResponseOptions(JSON.stringify({
            items: [{
                id: 1,
                full_name: "test",
                owner: {}
            }]
        }))));
    });

});
