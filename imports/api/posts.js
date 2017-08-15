import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import { Claims } from './claims.js';

export const Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
    // Only publish posts per claimId
    Meteor.publish('posts', function(claimId) {
        return Posts.find({ claimId });
    });
}

Meteor.methods({
    'posts.insert'(claimId, message) {
        check(claimId, String)
        check(message, String)

        // Ensure user
        if (!this.userId)
            throw new Meteor.Error('not-authorized');

        // Ensure active claim
        const claim = Claims.findOne(claimId);
        if (!claim || !claim.active)
            throw new Meteor.Error('not-authorized');

        // Insert claim
        Posts.insert({
            claimId,
            message,
            userId: this.userId,
            userWallet: 'cd2a3d9f938e13cd947ec05abc7fe734df8dd826',
            username: this.username,
            createdAt: new Date(),
        });
    },
});