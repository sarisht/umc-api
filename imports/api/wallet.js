import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';



export const Wallet = new Mongo.Collection('wallet');

if (Meteor.isServer) {
    // Only publish active policies
    Meteor.publish('wallet', function policiesPublication() {
        return Wallet.find({ owner: this.userId });
    });
}

Meteor.methods({
    'wallet.insert'(address,bal) {
       
        console.log("damn");
        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');


        // Insert Wallet
        Wallet.insert({
            wallet: address,
            balance: bal,
            owner: this.userId,
            createdAt: new Date(),
        });
    },
    // 'wallet.deactivate'(policyId) {
    //     check(policyId, String);

    //     // Ensure user owns policy
    //     const policy = Policies.findOne(policyId);
    //     if (policy.owner !== this.userId)
    //         throw new Meteor.Error('not-authorized');

    //     // TODO charge UMC fee
    //     // TODO return remaining UMC

    //     // TODO consider moving this to claims.js
    //     // Deactivate outstanding claims
    //     Claims.update({ owner: this.userId, active: true }, { $set: {
    //         active: false,
    //         deactivatedAt: new Date(),
    //     }}, {multi: true});

    //     // Update policy
    //     Policies.update(policyId, { $set: {
    //         active: false,
    //         deactivatedAt: new Date(),
    //     }});
    // },
    // 'wallet.addFunds'(policyId, amountAdditional) {
    //     check(policyId, String);
    //     check(amountAdditional, Match.Integer);

    //     // Ensure user owns active policy
    //     const policy = Policies.findOne(policyId);
    //     if (policy.owner !== this.userId && policy.active)
    //         throw new Meteor.Error('not-authorized');

    //     // TODO take UMC

    //     // Calculate policy data
    //     const amount = policy.amount + amountAdditional;
    //     const amountInitial =  policy.amountInitial + amountAdditional;
    //     const payoutMax = amountInitial * PAYOUT_MULTIPLIER;
    //     const payoutRemaining = policy.payoutRemaining + amountAdditional * PAYOUT_MULTIPLIER;

    //     // Update policy
    //     Policies.update(policyId, { $set: {
    //         amount,
    //         amountInitial,
    //         payoutMax,
    //         payoutRemaining,
    //     } });
    // },
});