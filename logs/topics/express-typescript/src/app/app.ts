import express from "express";
import type { Application } from "express";
import todoRouter from './todo/routes.js'


export function createServerApplication(): Application {
    const app = express();

    app.use(express.json())

    //#region  //*=========== ROUTES ===========
    app.use('/todos', todoRouter)
    //#endregion  //*======== ROUTES ===========

    return app;
}

// allows changing something like switch from express to coa
