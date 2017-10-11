# gcloud-instance-scheduler

[![npm-version](https://img.shields.io/npm/v/gcloud-snapshot-scheduler.svg)](https://www.npmjs.com/package/gcloud-snapshot-scheduler)

This is an App Engine in Node.js, that will create snapshots automatically.

## Usage

1. Download and unzip the latest [release](https://github.com/123erfasst/gcloud-snapshot-scheduler/releases)

2. Run `npm i` to install the dependencies.

3. Configure the Scheduling in `cron.yaml`. You can find more information about scheduling an App Engine [here](https://cloud.google.com/appengine/docs/flexible/nodejs/scheduling-jobs-with-cron-yaml).

    The configuration may look like this:
    ```yaml
    cron:
      - description: daily snapshot
        url: /create/instance-zone-name/instance-disk-name?format=diskName-YYYY-MM-DD-HH-mm&guestFlush=true
        schedule: every day 03:00
        target: gcloud-snapshot-scheduler
    ```

4. Deploy your App Engine. You can find more information about deploying your App Engine [here](https://cloud.google.com/appengine/docs/flexible/nodejs/quickstart)
