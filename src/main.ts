import "es6-shim";
import "es6-promise";
import "zone.js";
import "rxjs";
import "reflect-metadata";

import { bootstrap } from "angular2/platform/browser";
import { provide } from "angular2/core";
import { HTTP_PROVIDERS } from "angular2/http";
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from "angular2/router";

import "./main.css";

import Config from "./config";
import AppComponent from "./app-component";

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    Config
]);
