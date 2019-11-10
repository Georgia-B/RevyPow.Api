var AWS = require('aws-sdk');
const S3 = new AWS.S3();

const bucket = process.env.BUCKET;
const dataFile = process.env.DATAFILE;
const subscriptionFile = process.env.SUBSCRIPTIONFILE;

const getDataPromise = () => S3.getObject({
    Bucket: bucket,
    Key: dataFile
}).promise();

const getSubscriptionsPromise = () => S3.getObject({
    Bucket: bucket,
    Key: subscriptionFile
}).promise();

const postSubscriptionPromise = (subscription) => {
    var params = {
        Body: JSON.stringify(subscription),
        Bucket: bucket,
        Key: subscriptionFile
    };
    return S3.putObject(params).promise();
}

module.exports = {
    getDataPromise: getDataPromise,
    getSubscriptionsPromise: getSubscriptionsPromise,
    postSubscriptionPromise: postSubscriptionPromise
}