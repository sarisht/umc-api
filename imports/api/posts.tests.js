import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'meteor/practicalmeteor:chai';

import { Claims } from './claims.js';
import { Policies } from './policies.js';
import { Posts } from './posts.js';

if (Meteor.isServer) {
    describe('Posts', () => {
        describe('methods', () => {
            const userId = Random.id();
            const otherUserId = Random.id();
            let claimId;

            beforeEach(() => {
                // Reset data
                Claims.remove({});
                Policies.remove({});
                Posts.remove({});

                // Insert policy
                const insertPolicy = Meteor.server.method_handlers['policies.insert'];
                insertPolicy.apply({ userId }, ["Test", 100]);

                // Insert claim
                const insertClaim = Meteor.server.method_handlers['claims.insert'];
                insertClaim.apply({ userId }, [500]);

                // Get claim id
                claimId = Claims.findOne()._id;
            });

            it('can insert', () => {
                var message = 'This is a post.';

                // Apply method
                const insertMethod = Meteor.server.method_handlers['posts.insert'];
                insertMethod.apply({ userId }, [claimId, message]);

                // Verify count
                assert.equal(Posts.find().count(), 1);

                // Verify post
                var post = Posts.findOne();
                assert.isNotNull(post);
                assert.equal(post.claimId, claimId);
                assert.equal(post.message, message);
                assert.equal(post.userId, userId);
            });
        });
    });
}