const getSubscriptionsPromise = require("../../helpers/awsHelper").getSubscriptionsPromise;
const postSubscriptionsPromise = require('../../helpers/awsHelper').postSubscriptionPromise;

const getSubscriptions = () => {
    return getSubscriptionsPromise()
        .then(response => {
            return JSON.parse(response.Body.toString('utf-8'));
        }).catch(err => err);
};

const createSubscription = (req, res) => {
    const subscription = req.body;
    return getSubscriptions()
        .then(subscriptions => {
            const existingSub = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
            if (existingSub !== undefined) {
                return res.status(400).send("Subscription already exists");
            }
            subscriptions.push(subscription);
            postSubscriptionsPromise(subscriptions)
                .then(response => {
                    return res.status(200).send("Create successful");
                })
                .catch(err => { throw err })
        }).catch(err => {
            return res.status(500).send("Create failed: " + err)
        });
}

const deleteSubscription = (req, res) => {
    const subscription = req.body;
    return getSubscriptions().then(subscriptions => {
        const existingSub = subscriptions.find(sub => sub.endpoint === subscription.endpoint);
        if (existingSub === undefined) {
            return res.status(400).send("Subscription doesn't exists");
        }
        const updatedSubs = subscriptions.filter(sub => sub.endpoint !== subscription.endpoint);
        postSubscriptionsPromise(updatedSubs)
            .then(response => {
                return res.status(200).send("Delete successful");
            })
            .catch(err => { throw err });
    }).catch(err => res.status(500).send("Delete failed: " + err));
}

module.exports = {
    createSubscription,
    deleteSubscription
}