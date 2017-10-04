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
       
        var userId = Meteor.userId();
        var user = Meteor.users.findOne({_id: userId});
        var email = user.emails[0].address;
        
        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');


        // Insert Wallet
        Wallet.insert({
            wallet: address,
            balance: bal,
            email: email,
            owner: this.userId,
            createdAt: new Date(),
        });
    },

    'wallet.update'(id,amount,wallet,wallet_address) {
       
        
        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');

        wallet_address = parseInt(wallet_address);
        //checking if recepient exists or not
        var user = Wallet.findOne({wallet: wallet_address});
        if(user == undefined)
            throw new Meteor.Error('Recepient not found');
        
        var current = Wallet.findOne({_id: id}).balance;
       
        var balance = current-amount;

        if(balance<0)
            throw new Meteor.Error('Insufficient Balance');

        // Update Wallet of user
        Wallet.update(id, { $set: {
            wallet,
            balance,
        } });
        
        
        console.log(typeof wallet_address);
        
        //Update Wallet of recepient
       
        var recepient_id = user._id;
        var recepient_address = user.wallet;
        var recepient_bal = user.balance;
        

        id = recepient_id;
        wallet = recepient_address;
        balance = recepient_bal + amount;
        Wallet.update(id, { $set: {
            wallet,
            balance,
        } });

    },
});