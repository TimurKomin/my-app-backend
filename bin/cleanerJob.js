/* eslint-disable global-require */

(async () => {
    const cron = require("cron");
    const cleanerJobConfig = require("../jobs/cleaner.jobs").cleanerJob;
    const cleanerJob = new cron.CronJob(cleanerJobConfig);
    console.debug("cleaner job process started");
    cleanerJob.start();
})();
