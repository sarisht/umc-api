import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

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
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

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
    'policies.setActive'(policyId, active) {
        check(policyId, String);

        // Ensure user owns policy
        const policy = Policies.findOne(policyId);
        if (policy.owner !== this.userId)
            throw new Meteor.Error('not-authorized');

        // Ensure change
        if (policy.active === active)
            throw new Meteor.Error('not-authorized');

        // TODO charge UMC fee
        // TODO return remaining UMC

        // Update policy
        Policies.update(policyId, { $set: {
            active,
            createdAt: active ? new Date() : policy.createdAt, // Reset policy create date
        } });
    },
});