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

    'wallet.update'(id,amount,wallet,email) {
       
        if(bal<0)
            throw new Meteor.Error('Insufficient Balance');
        // Ensure user logged in
        if (!this.userId)
            throw new Meteor.Error('not-authorized');
        
        var current = Wallet.findOne({_id: id}).balance;
      
        var balance = current-amount;
        // Update Wallet of user
        Wallet.update(id, { $set: {
            wallet,
            balance,
        } });

        console.log(id+balance+wallet);
        //Update Wallet of recepient
        var user = Wallet.findOne({email: email});
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