let server = require("../index");
let chai = require("chai");
let chaiHttp = require("chai-http");

// Assertion 
chai.should();
chai.use(chaiHttp); 

describe('headToHead APIs', () => {

    describe("GET route /players", () => {
        it("It should return all players sorted by rank", (done) => {
            chai.request(server)
                .get("/players")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.length.should.not.be.eq(0);
                done();
                });
        });
        describe("GET route /players wrong file format", () => {
            before(() => {
                process.env.DATAFILENAME = 'wrongfile.json';
            });
            after(() => {
                process.env.DATAFILENAME = 'headtohead.json';
            });
            it("It should NOT return all the players", (done) => {
                chai.request(server)
                    .get("/players")
                    .end((err, response) => {
                        response.should.have.status(500);
                        response.text.should.be.eq("data file wrong format");
                    done();
                    });
            });
        });
        describe("GET route /players no file", () => {
            before(() => {
                process.env.DATAFILENAME = 'nofile.json';
            });
            after(() => {
                process.env.DATAFILENAME = 'headtohead.json';
            });
            it("It should NOT return all the players", (done) => {
                chai.request(server)
                    .get("/players")
                    .end((err, response) => {
                        response.should.have.status(500);
                        response.text.should.be.eq("no data file");
                    done();
                    });
            });
        });
    });

    describe("GET /player/:id", () => {
        it("It should GET a player by ID", (done) => {
            const playerId = 52;
            chai.request(server)                
                .get("/player/" + playerId)
                .end((err, response) => {
                    response.should.have.status(200);
                done();
                });
        });

        it("It should NOT GET a player by wrong ID", (done) => {
            const playerId = -1;
            chai.request(server)                
                .get("/player/" + playerId)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("no player for this id");
                done();
                });
        });
    });

    describe("GET route /stats", () => {
        it("It should return all stats", (done) => {
            chai.request(server)
                .get("/stats")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.text.length.should.not.be.eq(0);
                done();
                });
        });
        describe("GET route /stats wrong file format", () => {
            before(() => {
                process.env.DATAFILENAME = 'wrongfile.json';
            });
            after(() => {
                process.env.DATAFILENAME = 'headtohead.json';
            });
            it("It should NOT return all the stats", (done) => {
                chai.request(server)
                    .get("/stats")
                    .end((err, response) => {
                        response.should.have.status(500);
                        response.text.should.be.eq("data file wrong format");
                    done();
                    });
            });
        });
        describe("GET route /stats no file", () => {
            before(() => {
                process.env.DATAFILENAME = 'nofile.json';
            });
            after(() => {
                process.env.DATAFILENAME = 'headtohead.json';
            });
            it("It should NOT return all the stats", (done) => {
                chai.request(server)
                    .get("/stats")
                    .end((err, response) => {
                        response.should.have.status(500);
                        response.text.should.be.eq("no data file");
                    done();
                    });
            });
        });
    }); 
});