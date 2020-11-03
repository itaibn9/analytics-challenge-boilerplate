///<reference path="types.ts" />

import express from "express";
import { Request, Response } from "express";
const Window = require('window');
const window = new Window();
// some useful database functions in here:
import { Event, weeklyRetentionObject } from "../../client/src/models/event";
import { ensureAuthenticated, validateMiddleware } from "./helpers";
import {
  getAllEvents,
  saveEvent,
  getEventById,
  filterEvents,
  CountUniqueSessionsByHours,
  CountUniqueSessionsByDays,
  getRetentionCohort,
  getUserById
 } from './database';
import {
  shortIdValidation,
  searchValidation,
  userFieldsValidator,
  isUserValidator,
} from "./validators";
import e from "cors";
const router = express.Router();

// Routes

interface Filter {
  sorting: string;
  type: string;
  browser: string;
  search: string;
  offset: number;
}

router.get('/all', (req: Request, res: Response) => {
  const allEvents = getAllEvents() 
  res.send(allEvents);
    
});

router.get('/all-filtered', (req: Request, res: Response) => {
  let updatedQuery: any = {};
  let searchBy: any = {};
  if(req.query.browser) updatedQuery.browser = req.query.browser;
  if(req.query.type) updatedQuery.name = req.query.type;
  if(req.query.sorting === "+date") searchBy.sorting = "+date";
  else searchBy.sorting = "-date";
  if(req.query.search) searchBy.search = req.query.search;
  if(req.query.offset) searchBy.offset = req.query.offset;
  const results = filterEvents(updatedQuery, searchBy)
  res.status(200).send(results);
});

router.get('/by-days/:offset', (req: Request, res: Response) => {
  const offset = req.params.offset;
  const results = CountUniqueSessionsByDays(+offset);
  res.send(results)
});

router.get('/by-hours/:offset', (req: Request, res: Response) => {
  const offset = req.params.offset;
  const results = CountUniqueSessionsByHours(+offset);
  res.send(results)
});

router.get('/find-user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = getUserById(userId);
  res.status(200).send({ user })
})

router.get('/today', (req: Request, res: Response) => {
  res.send('/today')
});

router.get('/week', (req: Request, res: Response) => {
  res.send('/week')
});

router.get('/retention', (req: Request, res: Response) => {
  const {dayZero} = req.query;
  const results = getRetentionCohort(+dayZero);
  res.send(results)
});
router.get('/:eventId',(req : Request, res : Response) => {
  const { eventId } = req.params;
  const event = getEventById(eventId)
  res.status(200).send(event);
});

router.post('/', (req: Request, res: Response) => {
  const newEvent = saveEvent(req.body);
  res.send(newEvent)
});

router.get('/chart/os/:time',(req: Request, res: Response) => {
  res.send('/chart/os/:time')
})

  
router.get('/chart/pageview/:time',(req: Request, res: Response) => {
  res.send('/chart/pageview/:time')
})

router.get('/chart/timeonurl/:time',(req: Request, res: Response) => {
  res.send('/chart/timeonurl/:time')
})

router.get('/chart/geolocation/:time',(req: Request, res: Response) => {
  res.send('/chart/geolocation/:time')
})


export default router;
