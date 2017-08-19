import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

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
                policyId = Policies.findOne()._id;
            });

            it('can set active', () => {
                // Ensure active
                verifyActive(policyId, true);

                // Set active to false
                const setActive = Meteor.server.method_handlers['policies.setActive'];
                setActive.apply({ userId }, [policyId, false]);
                verifyActive(policyId, false);

                // Set active to true
                setActive.apply({ userId }, [policyId, true]);
                verifyActive(policyId, true);
            });
        });
    });
}