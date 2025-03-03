import { describe, expect, it } from 'vitest';

import { Message } from '../../src/message';

describe('Message class', () => {
  it('can be instantiated', () => {
    const message = new Message();
    expect(message).toBeDefined();
    expect(message.message).toMatchInlineSnapshot(`[]`);
    expect(message.sectionIntro).toMatchInlineSnapshot(`
      [
        "## Stable Backport Notice
      ",
        "
      > [!NOTE]
      > Some commits from this PR were backported to the downstream stable repository.
      ",
      ]
    `);
    expect(message.sectionDownstream).toMatchInlineSnapshot(`[]`);
  });
});
