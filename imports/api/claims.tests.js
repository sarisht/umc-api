import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Claims, VOTE_YES, VOTE_NO, VOTE_NMI } from './claims.js';
import { Policies } from './policies.js';

if (Meteor.isServer) {
    function verifyActive(claimId, expected) {
        const claim = Claims.findOne(claimId);
        assert.equal(claim.active, expected);
    }

    function verifyVoteCounts(claimId, yesCount, noCount, nmiCount) {
        const claim = Claims.findOne(claimId);
        assert.equal(claim.voteCounts[VOTE_YES], yesCount);
        assert.equal(claim.voteCounts[VOTE_NO], noCount);
        assert.equal(claim.voteCounts[VOTE_NMI], nmiCount);
    }

    describe('Claims', () => {
        describe('methods', () => {
            const userId = Random.id();
            const otherUserId = Random.id();
            let claimId;

            beforeEach(() => {
                // Remove claims and policies
                Claims.remove({});
                Policies.remove({});

                // Insert policy
                const insertPolicy = Meteor.server.method_handlers['policies.insert'];
                insertPolicy.apply({ userId }, ["Test", 100]);
                const policyId = Policies.findOne()._id;

                // Insert claim
                const insertClaim = Meteor.server.method_handlers['claims.insert'];
                insertClaim.apply({ userId }, [policyId, 500]);

                // Verify count
                assert.equal(Claims.find().count(), 1);

                // Get claim id
                claimId = Claims.findOne()._id;
            });

            it('can vote', () => {
                // Get method
                const voteMethod = Meteor.server.method_handlers['claims.vote'];

                // Verify defaults
                verifyVoteCounts(claimId, 0, 0, 0);

                // Cast initial vote
                voteMethod.apply({ userId: otherUserId }, [claimId, VOTE_YES]);
                verifyVoteCounts(claimId, 1, 0, 0);

                // Cast duplicate vote
                voteMethod.apply({ userId: otherUserId }, [claimId, VOTE_YES]);
                verifyVoteCounts(claimId, 1, 0, 0);

                // Cast new vote
                voteMethod.apply({ userId: otherUserId }, [claimId, VOTE_NO]);
                verifyVoteCounts(claimId, 0, 1, 0);
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