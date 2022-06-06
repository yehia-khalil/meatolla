#! /usr/bin/env node
const fs = require("fs")
const yargs = require("yargs");
const {
    hideBin
} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 --create=[request || controller] --name=[fileName]')
    .demandOption(['create', 'name'])
    .argv

const requestStub = () => {
    return fs.readFileSync(process.cwd() + `/stubs/request.js`, function (err, data) {
        return data;
    }).toString()
};

let methods = {
    create: (fileType, fileName) => {
        let rStub = requestStub();
        switch (fileType) {
            case "request":
                fs.stat(process.cwd() + `/requests/${fileName}.js`, function (err, success) {
                    if (err == null) {
                        console.log("Request already exists");
                    } else if (err.code === 'ENOENT') {
                        // file does not exist
                        fs.writeFile(process.cwd() + `/requests/${fileName}.js`, rStub, function (err) {
                            if (err) {
                                console.log(err.code)
                                return false;
                            }
                        });
                        console.log("Request created Successfully!");
                    } else {
                        console.log("Some error: ", err.code);
                    }
                })

                break;

            case "controller":
                fs.stat(process.cwd() + `/controllers/${fileName}.js`, function (err, success) {
                    if (err == null) {
                        console.log("File exists");
                    } else if (err.code === 'ENOENT') {
                        // file does not exist
                        fs.writeFile(process.cwd() + `/controllers/${fileName}.js`, "", function (err) {
                            if (err) {
                                console.log(err.code)
                                return false;
                            }
                        });
                        console.log("Controller created Successfully!");
                    } else {
                        console.log("Some error: ", err.code);
                    }
                })
                break;
            default:
                console.log("Please enter a valid file type")
        }
    },
}

methods[Object.keys(argv)[1]](argv.create, argv.name)