#! /usr/bin/env node
var clc = require("cli-color");
const fs = require("fs")
const yargs = require("yargs");
const capitalizeFirstLetter = require("../helpers/capitalizeFirstLetter")
const {
    hideBin
} = require('yargs/helpers')
const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 --create=[request || controller || model] --name=[fileName]')
    .demandOption(['create', 'name'])
    .argv

const requestStub = () => {
    return fs.readFileSync(process.cwd() + `/stubs/request.js`, function (err, data) {
        return data;
    }).toString()
};

const modelStub = () => {
    return fs.readFileSync(process.cwd() + `/stubs/model.js`, function (err, data) {
        return data;
    }).toString()
};

const controllerStub = () => {
    return fs.readFileSync(process.cwd() + `/stubs/controller.js`, function (err, data) {
        return data;
    }).toString()
};

let methods = {
    create: (fileType, fileName) => {
        let rStub = requestStub();
        let mStub = modelStub();
        let cStub = controllerStub();
        switch (fileType) {
            case "request":
                fs.stat(process.cwd() + `/requests/${fileName}.js`, function (err, success) {
                    if (err == null) {
                        console.log(clc.red("Request already exists"));
                    } else if (err.code === 'ENOENT') {
                        // file does not exist
                        fs.writeFile(process.cwd() + `/requests/${fileName}.js`, rStub, function (err) {
                            if (err) {
                                console.log(err.code)
                                return false;
                            }
                        });
                        console.log(clc.green("Request created Successfully!"));
                    } else {
                        console.log(clc.red("Some error: ", err.code));
                    }
                })

                break;

            case "controller":
                fs.stat(process.cwd() + `/controllers/${fileName}.js`, function (err, success) {
                    if (err == null) {
                        console.log(clc.red("Cotnroller already exists"));
                    } else if (err.code === 'ENOENT') {
                        // file does not exist
                        fs.writeFile(process.cwd() + `/controllers/${fileName}.js`, cStub, function (err) {
                            if (err) {
                                console.log(err.code)
                                return false;
                            }
                        });
                        console.log(clc.green("Controller created Successfully!"));
                    } else {
                        console.log(clc.red("Some error: ", err.code));
                    }
                })
                break;

            case "model":
                fs.stat(process.cwd() + `/models/${fileName}.js`, function (err, success) {
                    if (err == null) {
                        console.log(clc.red("Model already exists"));
                    } else if (err.code === 'ENOENT') {
                        // file does not exist
                        fs.writeFile(process.cwd() + `/models/${capitalizeFirstLetter(fileName)}.js`, mStub, function (err) {
                            if (err) {
                                console.log(err.code)
                                return false;
                            }
                        });
                        console.log(clc.green("Model created Successfully!"));
                    } else {
                        console.log(clc.red("Some error: ", err.code));
                    }
                })
                break;
            default:
                console.log(clc.red("Please enter a valid file type"));
        }
    },
}

methods[Object.keys(argv)[1]](argv.create, argv.name)