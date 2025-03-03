export const emptyConfig = {};

export const basicConfig = {
  'lookup-interval': 14,
  downstream: [
    {
      owner: 'owner',
      repo: 'repo',
      branches: ['*-stable'],
    },
    {
      owner: 'different-owner',
      repo: 'different-repo',
      branches: ['main', '*-stable'],
      'status-title': 'systemd-stable',
    },
  ],
};
