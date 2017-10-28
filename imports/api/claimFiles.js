import { FilesCollection } from 'meteor/ostrio:files';

export const ClaimFiles = new FilesCollection({
    collectionName: 'ClaimFiles',
    allowClientCode: true,
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in pdf formats
        if (file.size <= 10485760 && /pdf/i.test(file.extension)) {
            return true;
        } else {
            return 'Please upload pdf file, with size equal or less than 10MB';
        }
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.claimFiles.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.claimFiles.all', function () {
        return ClaimFiles.find().cursor;
    });
}