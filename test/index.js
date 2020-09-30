const chai = require("chai");
const server = require("../server/server");
const chaiHttp = require("chai-http");
const fs= require("fs");
let blogId='';
let validtoken='';
chai.should();
chai.use(chaiHttp);