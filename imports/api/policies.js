import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Policies = new Mongo.Collection('policies');

if (Meteor.isServer) {
    // Only publish active policies
    Meteor.publish('policies', function policiesPublication() {
        return Policies.find({ active: true });
    });
}

Meteor.methods({
    'policies.insert'(name, amount) {
        check(name, String);
        check(amount, Number);

        // Ensure user logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // Insert policy
        Policies.insert({
            name,
            amount,
            active: true,
            owner: this.userId,
            createdAt: new Date(),
        });
    },
    'policies.setActive'(policyId, active) {
        check(policyId, String);

        // Ensure user owns policy
        const policy = Policies.findOne(policyId);
        if (policy.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // Update policy
        Policies.update(policyId, { $set: { active } });
    },
});