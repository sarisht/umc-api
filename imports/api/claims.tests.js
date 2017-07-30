import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Claims } from './claims.js';
import { Policies } from './policies.js';

if (Meteor.isServer) {
    function verifyActive(claimId, expected) {
        const claim = Claims.findOne(claimId);
        assert.equal(claim.active, expected);
    }

    describe('Claims', () => {
        describe('methods', () => {
            const userId = Random.id();
            let claimId;

            beforeEach(() => {
                // Remove claims and policies
                Claims.remove({});
                Policies.remove({});

                // Insert policy
                const insertPolicy = Meteor.server.method_handlers['policies.insert'];
                insertPolicy.apply({ userId }, ["Test", "100"]);
                const policyId = Policies.findOne()._id;

                // Insert claim
                const insertClaim = Meteor.server.method_handlers['claims.insert'];
                insertClaim.apply({ userId }, [policyId, "500"]);

                // Verify count
                assert.equal(Claims.find().count(), 1);

                // Get claim id
                claimId = Claims.findOne()._id;
            });

            it('can set active', () => {
                // Ensure active
                verifyActive(claimId, true);

                // Set active to false
                const setActive = Meteor.server.method_handlers['claims.setActive'];
                setActive.apply({ userId }, [claimId, false]);
                verifyActive(claimId, false);

                // Set active to true
                setActive.apply({ userId }, [claimId, true]);
                verifyActive(claimId, true);
            });
        });
    });
}