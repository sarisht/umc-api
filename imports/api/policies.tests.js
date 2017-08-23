import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Claims } from "./claims.js";
import { Policies, PAYOUT_MULTIPLIER } from './policies.js';

if (Meteor.isServer) {
    function verifyActive(policyId, expected) {
        const policy = Policies.findOne(policyId);
        assert.equal(policy.active, expected);
    }

    describe('Policies', () => {
        describe('methods', () => {
            const amount = 100;
            const userId = Random.id();
            let policyId;

            beforeEach(() => {
                // Remove policies
                Claims.remove({});
                Policies.remove({});

                // Insert policy
                const insertPolicy = Meteor.server.method_handlers['policies.insert'];
                insertPolicy.apply({ userId }, [amount]);

                // Verify count
                assert.equal(Policies.find().count(), 1);

                // Verify policy
                const policy = Policies.findOne();
                assert.equal(policy.amount, amount);
                assert.equal(policy.amountInitial, amount);
                assert.equal(policy.payoutMax, amount * PAYOUT_MULTIPLIER);
                assert.equal(policy.payoutRemaining, amount * PAYOUT_MULTIPLIER);
                assert.equal(policy.active, true);
                assert.equal(policy.owner, userId);

                // Get policy id
                policyId = policy._id;
            });

            it('can deactivate', () => {
                // Ensure active
                verifyActive(policyId, true);

                // Insert claims
                const insertClaim = Meteor.server.method_handlers['claims.insert'];
                insertClaim.apply({ userId }, [amount, "Title", "Description"]);
                insertClaim.apply({ userId }, [amount, "Title", "Description"]);
                assert.equal(Claims.find({ active: true }).count(), 2);

                // Set active to false
                const setActive = Meteor.server.method_handlers['policies.deactivate'];
                setActive.apply({ userId }, [policyId, false]);
                verifyActive(policyId, false);

                // Ensure that claim is inactive
                assert.equal(Claims.find({ active: true }).count(), 0);
            });

            it('can add funds', () => {
                const amountAdditional = 150;

                // Add funds
                const addFunds = Meteor.server.method_handlers['policies.addFunds'];
                addFunds.apply({ userId }, [policyId, amountAdditional]);

                // Verify policy
                const policy = Policies.findOne(policyId);
                assert.equal(policy.amount, amount + amountAdditional);
                assert.equal(policy.amountInitial, amount + amountAdditional);
                assert.equal(policy.payoutMax, (amount + amountAdditional) * PAYOUT_MULTIPLIER);
                assert.equal(policy.payoutRemaining, (amount + amountAdditional) * PAYOUT_MULTIPLIER);
            });
        });
    });
}