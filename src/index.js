import { NetlifyAPI }  from "netlify";
import core from '@actions/core';

const targetAppName = core.getInput('unique-site-name');
const repoName = core.getInput('repo-name');
const netlifyToken = core.getInput('netlify-token');
const netlifyTeam = core.getInput('netlify-team');
const branchName = core.getInput('branch-name');
const api = new NetlifyAPI(netlifyToken);

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
    core.setOutput('site-id', result.site_id)
    core.setOutput('site-url', result.url)
}

site()
