import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Policies } from './policies.js';

if (Meteor.isServer) {
    function verifyActive(policyId, expected) {
        const policy = Policies.findOne(policyId);
        assert.equal(policy.active, expected);
    }

    describe('Policies', () => {
        describe('methods', () => {
            const userId = Random.id();
            let policyId;

            beforeEach(() => {
                // Remove policies
                Policies.remove({});

                // Insert policy
                const insertPolicy = Meteor.server.method_handlers['policies.insert'];
                insertPolicy.apply({ userId }, ["Test", "100"]);

                // Verify count
                assert.equal(Policies.find().count(), 1);

                // Get stock id
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