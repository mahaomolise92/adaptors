import { expect } from 'chai';
import { execute, getDrive, getFolder, getFiles } from '../src/Adaptor.js';

import MockAgent from './mockAgent.js';
import { fixtures } from './fixtures.js';

import { setGlobalDispatcher } from 'undici';

setGlobalDispatcher(MockAgent);

describe('getDrive', () => {
  it('should get a drive by id and set it to state', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' }, undefined, state => {
        // write the drives object back to state before it gets cleaned up
        state.result = state.drives;
        return state;
      })
    )(state);

    expect(finalState.result.default).to.eql(fixtures.driveResponse);
  });

  it('should get a named drive by id and set it to state', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive({ id: 'b!YXzpkoLwR06bxC8tNdg71m_' }, 'mydrive', state => {
        // write the drives object back to state before it gets cleaned up
        state.result = state.drives;
        return state;
      })
    )(state);

    expect(finalState.result.mydrive).to.eql(fixtures.driveResponse);
  });

  it('should get the default drive for a site', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
    };

    const finalState = await execute(
      getDrive(
        { id: 'openfn.sharepoint.com', owner: 'sites' },
        undefined,
        state => {
          // write the drives object back to state before it gets cleaned up
          state.result = state.drives;
          return state;
        }
      )
    )(state);

    expect(finalState.result.default).to.eql(fixtures.driveResponse);
  });
});

describe('getFolder', () => {
  it('should get a folder by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3', {}, state => {
        state.result = state.data;
        return state;
      })
    )(state);

    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  it('should get a folder for a named drive by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFolder(
        '01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3',
        { name: 'mydrive' },
        state => {
          state.result = state.data;
          return state;
        }
      )
    )(state);

    expect(finalState.data).to.eql(fixtures.itemResponse);
  });

  // TODO get folder at path
  // TODO throw a helpful error if drive is not defined
  // TODO error handling if drive id invalid
  // TODO test references, composestate
});

describe('getFiles', () => {
  it('should get a file by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        default: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFiles('01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3', {}, state => {
        state.result = state.data;
        return state;
      })
    )(state);

    console.log(finalState);

    expect(finalState.data).to.eql(fixtures.itemContent);
  });

  it('should get a file for a named drive by id', async () => {
    const state = {
      configuration: {
        accessToken: fixtures.accessToken,
      },
      drives: {
        mydrive: {
          id: 'b!YXzpkoLwR06bxC8tNdg71m_',
        },
      },
    };

    const finalState = await execute(
      getFiles(
        '01LUM6XOCKDTZKQC7AVZF2VMHE2I3O6OY3',
        { name: 'mydrive' },
        state => {
          state.result = state.data;
          return state;
        }
      )
    )(state);

    expect(finalState.data).to.eql(fixtures.itemContent);
  });

  // TODO get a file metadata ({ metadata: true }) shoudl return itemWithDownloadUrl
});
