const getDataPromise = require("../../helpers/awsHelper").getDataPromise;

const getData = (req, res) => {
    return getDataPromise()
        .then(response => {
            return res.json(JSON.parse(response.Body.toString('utf-8')));
        })
        .catch(err => {
            return res.status(500).send("Error fetching data: " + err);
        })
}

module.exports = {
    getData
};