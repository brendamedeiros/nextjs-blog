const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: "root",
                mongodb_password: "kfe6XRsYn9yds$X",
                mongodb_cluster: "cluster0",
                mongodb_database: "my-site-dev",
            },
        };
    } else {
        return {
            env: {
                mongodb_username: "root",
                mongodb_password: "kfe6XRsYn9yds$X",
                mongodb_cluster: "cluster0",
                mongodb_database: "my-site",
            },
        };
    }
};
