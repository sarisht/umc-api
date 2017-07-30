import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Policies = new Mongo.Collection('policies');

if (Meteor.isServer) {
    // Only publish tasks that belong to the current user
    Meteor.publish('policies', function policiesPublication() {
        return Policies.find({
            $or: [
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'policies.insert'(name, amount) {
        check(name, String);
        check(amount, String);

        // Make sure the user is logged in before inserting a policy
        if (!Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Policies.insert({
            name,
            amount,
            createdAt: new Date(),
            owner: Meteor.userId(),
            active: true,
            // need to track policy payout
        });
    },
    'policies.remove'(policyId) {
        check(policyId, String);

        const policy = Policies.findOne(policyId);

        if (policy.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
        }

        Policies.remove(policyId);
    },
});