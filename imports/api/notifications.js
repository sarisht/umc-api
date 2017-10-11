import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';



export const Notifications = new Mongo.Collection('notifications');

if (Meteor.isServer) {
    // Only publish active policies
    Meteor.publish('notifications', function policiesPublication() {
        return Notifications.find({ user: this.userId });
    });
}

Meteor.methods({
    'notifications.insert'(user_id,claim_id) {
        // Insert Notifications
        Notifications.insert({
            user: user_id,
            claim_id: claim_id,
         })
    },

    });