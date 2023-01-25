import { NetlifyAPI }  from "netlify";
import core from '@actions/core';

const targetAppName = core.getInput('unique-site-name');
const repoName = core.getInput('repo-name');
const netlifyToken = core.getInput('netlify-token');
const netlifyTeam = core.getInput('netlify-team');
const branchName = core.getInput('branch-name');
const api = new NetlifyAPI(netlifyToken);

if (!targetAppName || !repoName || !netlifyToken || !netlifyTeam || !branchName) {
    throw new Error("Arg 'unique-site-name' or 'repo-name' or 'netlify-token' or 'branch-name' must not be empty") ;
}

if(!api) {
    throw new Error("Error while getting NetlifyAPI, please check 'netlify-token'");
}

const site = async () => {
    const result = await api.createSite({
        account_slug: netlifyTeam,
        body: {
            name: targetAppName,
            repo: {
                provider: "github",
                repo: repoName,
                private: true,
                branch: branchName,
            },
        } 
    });
    if(!result) {
        throw new Error("Error while getting NetlifyAPI, please check 'netlify-token'");
    }
    core.info(`Netlify site URL: ${result.url} and site-id: ${result.site_id}`)
    core.setOutput('site-id', result.site_id)
    core.setOutput('site-url', result.url)
}

site()
