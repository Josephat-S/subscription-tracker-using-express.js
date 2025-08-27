import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions } from "../controllers/subscription.controller.js";
// Initiate router
const subscriptionRouter = Router();
// Routes
subscriptionRouter.get('/', (req, res)=> res.send({title: 'GET all subscriptions'}));

subscriptionRouter.get('/:id', (req, res)=> res.send({title: 'GET  subscriptions details'}));

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res)=> res.send({title: 'UPDATE subscription'}));

subscriptionRouter.delete('/:id', (req, res)=> res.send({title: 'DELETE subscription'}));

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
// For cancelling users subscription
subscriptionRouter.put('/:id/cancel', (req, res)=> res.send({title: 'CANCEL subscription'}));
// Upcoming renewals
subscriptionRouter.get('/upcoming-renewals', (req, res)=> res.send({title: 'GET upcoming renewals'}));
export default subscriptionRouter;