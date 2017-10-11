const cloud = require('google-cloud');

const createHandler = (req, res) => {
    const {zoneName, diskName} = req.params;
    const options = {
        format: req.query.format || 'instanceName-YYYY-MM-DD-HH-mm',
        guestFlush: req.query.guestFlush && req.query.guestFlush === 'true' || false
    };

    if(!req.header('X-Appengine-Cron')) {
        return res.status(400).json({
            type: 'Unauthorized',
            message: 'Only cron jobs have access'
        });
    }

    createSnapshot(zoneName, diskName, options).then(() => {
        res.status(200).send('Successfully created snapshot').end();
    });
};

const createSnapshot = (zoneName, diskName, options) => new Promise((resolve, reject) => {
    const gce = cloud.compute();
    gce.zone(zoneName)
        .disk(diskName)
        .createSnapshot(
            getName(options.format, zoneName, diskName), {
                guestFlush: options.guestFlush,
                labels: {
                    'auto-snapshot': `${zoneName}_${diskName}`
                }
            }, resolve);
});

const getName = (format, zoneName, diskName) => format
    .replace(/diskName/ig, diskName)
    .replace(/zoneName/ig, zoneName)
    .replace(/YYYY/ig, new Date().getFullYear())
    .replace(/MM/ig, pad(new Date().getMonth() + 1))
    .replace(/DD/ig, pad(new Date().getDate()))
    .replace(/HH/ig, pad(new Date().getHours()))
    .replace(/mm/ig, pad(new Date().getMinutes()))
    .replace(/ss/ig, pad(new Date().getSeconds()));

const pad = (num) => {
    let str = "" + num;
    let pad = "00";
    return pad.substring(0, pad.length - str.length) + str
};

module.exports = createHandler;