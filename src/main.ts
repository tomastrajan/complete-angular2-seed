import "es6-shim";
import "es6-promise";
import "zone.js";
import "rxjs";
import "reflect-metadata";

import { bootstrap } from "angular2/platform/browser";
import { HTTP_PROVIDERS } from "angular2/http";
import { COMMON_DIRECTIVES } from "angular2/common";

import "./main.css";

import Config from "./config";
import AppComponent from "./app-component";

bootstrap(AppComponent, [HTTP_PROVIDERS, COMMON_DIRECTIVES, Config]);
