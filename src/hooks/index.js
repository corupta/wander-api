const adminGithubId = process.env.ADMIN_GITHUB_ID;

const isSelf = (ctx) => `${ctx.params?.user?._id}` === `${ctx?.id}` || ctx?.id === 'profile';
const isAdmin = (ctx) => `${ctx.params?.user?.githubId}`  === `${adminGithubId}`;

module.exports = {
    isSelf,
    isAdmin,
}