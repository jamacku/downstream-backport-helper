import { getInput, setFailed } from '@actions/core';

import '@total-typescript/ts-reset';

import action from './action';
import { getOctokit } from './octokit';

const octokit = getOctokit(getInput('token', { required: true }));

try {
  await action(octokit);
} catch (error) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  setFailed(message);
}

// TODO: example comment
// | commit | backport | stable | tag |
// |---|:---:|:---:|:---:|
// | https://github.com/systemd/systemd/commit/769838b4831b346ee63a851cb38a5c47c468bdfa - _core: refuse dbus activation if dbus is not running_ | https://github.com/systemd/systemd-stable/commit/769838b4831b346ee63a851cb38a5c47c468bdfa | `v255` | [`v255.6`](https://github.com/systemd/systemd-stable/releases/tag/v255.6) |
// | https://github.com/systemd/systemd/commit/769838b4831b346ee63a851cb38a5c47c468bdfa - _core: refuse dbus activation if dbus is not running_ | https://github.com/systemd/systemd-stable/commit/769838b4831b346ee63a851cb38a5c47c468bdfa | `v256` | _unreleased_ |

// ## Stable Backport Notice

// Some commits from this PR were backported to the downstream stable repository.

// ### systemd-stable

// | commit | backport | downstream | tag |
// |---|:---:|:---:|:---:|
// | https://github.com/systemd/systemd/commit/e2b812c8045b574fa164d850ef50f426ae9e1df5 - _string-util: introduce string_is_safe_ascii helper_ | https://github.com/systemd/systemd-stable/commit/0b5a3992655735e45f78a3461a1934193d28578b | [`v255-stable`](https://github.com/systemd/systemd-stable/tree/v255-stable) | [`v255.7`](https://github.com/systemd/systemd-stable/releases/tag/v255.7) |
// | https://github.com/systemd/systemd/commit/e2b812c8045b574fa164d850ef50f426ae9e1df5 - _string-util: introduce string_is_safe_ascii helper_ | https://github.com/systemd/systemd-stable/commit/0b5a3992655735e45f78a3461a1934193d28578b | [`v256-stable`](https://github.com/systemd/systemd-stable/tree/v256-stable) | `unreleased` |

// ### systemd-rhel9

// | commit | backport | downstream | tag |
// |---|:---:|:---:|:---:|
// | https://github.com/systemd/systemd/commit/e2b812c8045b574fa164d850ef50f426ae9e1df5 - _string-util: introduce string_is_safe_ascii helper_ | https://github.com/redhat-plumbers/systemd-rhel9/commit/0b5a3992655735e45f78a3461a1934193d28578b | [`rhel-9.5.0`](https://github.com/systemd/systemd-stable/tree/v256-stable) | `unreleased` |
