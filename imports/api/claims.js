import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Policies } from './policies';

export const Claims = new Mongo.Collection('claims');

if (Meteor.isServer) {
    // Only publish active claims
    Meteor.publish('claims', function policiesPublication() {
        return Claims.find({ active: true });
    });
}

Meteor.methods({
    'claims.insert'(policyId, ask) {
        check(policyId, String);
        check(ask, Number);

        // Ensure user logged in
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // Ensure user owns active policy
        const policy = Policies.findOne(policyId);
        if (policy.owner !== this.userId || !policy.active) {
            throw new Meteor.Error('not-authorized');
        }

        // Insert claim
        Claims.insert({
            policyId,
            policyName: policy.name,
            ask,
            active: true,
            owner: this.userId,
            createdAt: new Date(),
        });
    },
    'claims.setActive'(claimId, active) {
        check(claimId, String);

        // Ensure user owns claim
        const claim = Claims.findOne(claimId);
        if (claim.owner !== this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        // Claim shouldn't be active if policy isn't
        if (active) {
            const policy = Policies.findOne(claim.policyId);
            if (!policy.active) {
                throw new Meteor.Error('not-authorized');
            }
        }

        // Update claim
        Claims.update(claimId, { $set: { active } });
    },
});