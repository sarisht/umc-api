import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { Claims } from "./claims.js";

export const PAYOUT_MULTIPLIER = 5;

export const Policies = new Mongo.Collection('policies');

if (Meteor.isServer) {
    // Only publish active policies
    Meteor.publish('policies', function policiesPublication() {
        return Policies.find({ owner: this.userId, active: true });
    });
}

Meteor.methods({
    'policies.insert'(amount) {
        check(amount, Match.Integer);

        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');

        // Ensure user doesn't have an active policy
        const policy = Policies.findOne({ owner: this.userId, active: true })
        if (policy)
            throw new Meteor.Error('not-authorized');

        // TODO take UMC

        // Calculate policy data
        const payoutMax = amount * PAYOUT_MULTIPLIER;

        // Insert policy
        Policies.insert({
            amount,
            amountInitial: amount,
            payoutMax,
            payoutRemaining: payoutMax,
            active: true,
            owner: this.userId,
            createdAt: new Date(),
        });
    },
    'policies.deactivate'(policyId) {
        check(policyId, String);

        // Ensure user owns policy
        const policy = Policies.findOne(policyId);
        if (policy.owner !== this.userId)
            throw new Meteor.Error('not-authorized');

        // TODO charge UMC fee
        // TODO return remaining UMC

        // TODO consider moving this to claims.js
        // Deactivate outstanding claims
        Claims.update({ owner: this.userId, active: true }, { $set: {
            active: false,
            deactivatedAt: new Date(),
        }}, {multi: true});

        // Update policy
        Policies.update(policyId, { $set: {
            active: false,
            deactivatedAt: new Date(),
        }});
    },
    'policies.addFunds'(policyId, amountAdditional) {
        check(policyId, String);
        check(amountAdditional, Match.Integer);

        // Ensure user owns active policy
        const policy = Policies.findOne(policyId);
        if (policy.owner !== this.userId && policy.active)
            throw new Meteor.Error('not-authorized');

        // TODO take UMC

        // Calculate policy data
        const amount = policy.amount + amountAdditional;
        const amountInitial =  policy.amountInitial + amountAdditional;
        const payoutMax = amountInitial * PAYOUT_MULTIPLIER;
        const payoutRemaining = policy.payoutRemaining + amountAdditional * PAYOUT_MULTIPLIER;

        // Update policy
        Policies.update(policyId, { $set: {
            amount,
            amountInitial,
            payoutMax,
            payoutRemaining,
        } });
    },
});