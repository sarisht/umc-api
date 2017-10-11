import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

import { Policies } from './policies.js';
import { Notifications } from './notifications.js';

export const VOTE_YES = 0;
export const VOTE_NO = 1;
export const VOTE_NMI = 2;
export const VOTE_FRAUD = 3;
export const VOTE_INAPPROPRIATE = 4;
const VOTE_TYPES_MAX = 10;

export const CATEGORIES = ['auto', 'health', 'home', 'other'];

export const Claims = new Mongo.Collection('claims');

// Return whether proposed ask + asks from outstanding claims is greater than payout remaining
export function hasInsufficientFunds(ask, outstandingClaims, policy) {
    var outstandingAskSum = 0;
    outstandingClaims.forEach(function(claim) {
        outstandingAskSum += claim.ask;
    });

    return ask + outstandingAskSum > policy.payoutRemaining;
}

if (Meteor.isServer) {
    // Only publish active claims
    Meteor.publish('claims', function() {
        return Claims.find({ active: true });
    });
}

function getRandomSubarray(arr, size) {
    size = parseInt(size);
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}



Meteor.methods({
    'claims.insert'(ask, title, description, category = 'other') {
        check(ask, Match.Integer);
        check(title, String);
        check(description, String);

        // Check input
        if (ask <= 0 || title.length === 0 || description.length === 0)
            throw new Meteor.Error('invalid-argument');

        // Check categories
        if (!CATEGORIES.includes(category))
            throw new Meteor.Error('invalid-category');

        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');

        // Ensure active policy
        const policy = Policies.findOne({ owner: this.userId, active: true });
        if (!policy)
            throw new Meteor.Error('not-authorized');

        // Ensure sufficient funds
        const outstandingClaims = Claims.find({ owner: this.userId, active: true }).fetch();
        if (hasInsufficientFunds(ask, outstandingClaims, policy))
            throw new Error('insufficient-funds');

        //Getting a random sample of users
        const users = Meteor.users.find().fetch();
        
        var potential_voters = [];
        for (i = 0; i < users.length; i++){
            if(users[i]._id!=this.userId ){
                //console.log(users[i]);
                potential_voters.push(users[i]._id);
                //notify(users[i]._id);
            }
        }
        console.log(potential_voters);
        //Getting 50% of users to vote
        var random_voters = getRandomSubarray(potential_voters, potential_voters.length*0.5);
        console.log(random_voters);
        // Insert claim
        var inserted_claim = Claims.insert({
            active: true,
            ask,
            title,
            description,
            category,
            owner: this.userId,
            votes: {}, // userId -> vote
            voteCounts: new Array(VOTE_TYPES_MAX).fill(0), // voteType -> count
            createdAt: new Date(),
            eligible_voters: random_voters,
        });

        
        console.log(inserted_claim);
        for (i = 0; i < random_voters.length; i++){
        
            //notifying random voters
            Meteor.call('notifications.insert', random_voters[i], inserted_claim);
            
        }

    },

    'claims.vote'(claimId, voteNew) {
        check(claimId, String);
        check(voteNew, Match.Integer);

        // Check possible vote values
        if (![VOTE_YES, VOTE_NO, VOTE_NMI, VOTE_FRAUD, VOTE_INAPPROPRIATE].includes(voteNew))
            throw new Meteor.Error('invalid-argument');

        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');

        // Ensure user doesn't own active claim
        const claim = Claims.findOne(claimId);
        if (claim.owner === this.userId || !claim.active)
            throw new Meteor.Error('not-authorized');

        // Get maps
        var votes = claim.votes;
        var voteCounts = claim.voteCounts;

        // Handle old vote
        if (votes[this.userId] !== undefined)
            voteCounts[votes[this.userId]]--;

        // Handle new vote
        votes[this.userId] = voteNew;
        voteCounts[voteNew]++;

        // Update claim
        Claims.update(claimId, { $set: { votes, voteCounts } });
    },

    'claims.setActive'(claimId, active) {
        check(claimId, String);

        // Ensure user owns claim
        const claim = Claims.findOne(claimId);
        if (claim.owner !== this.userId)
            throw new Meteor.Error('not-authorized');

        // Update claim
        Claims.update(claimId, { $set: { active } });
    },
});