import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import {SERVER_URL} from '../config/env.js';
export const createSubscription = async (req, res, next) =>{
    try {
        // Create subscription
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id
        });
        // Workflow (Upstash)
        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflow/reminder`,
            body: {
                subscriptionId: subscription.id
            }
        })
        // if user is authorized
        res.status(201).json({
            success: true,
            data: subscription
        })
    } catch (error) {
        next(error);
    }
}
export const getUserSubscriptions = async (req, res, next) => {
    try {
        // Check if logged in user is one requesting his own subscriptions
        if(req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.statusCode = 404;
            throw error;
        }
        // If it is the owner
        const subscriptions = await Subscription.find({ user: req.params.id});
        // Response
        res.status(200).json({
            success: true,
            data: subscriptions
        })
        
    } catch (error) {
        next(error);
    }
}