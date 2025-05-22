

import { useACLRoleContext } from '../../acl/ACLProvider';
import ignore from 'ignore';

export const useAclSnippets = () => {
  const { allowAll, snippets } = useACLRoleContext();
  return {
    allow: (aclSnippet) => {
      if (aclSnippet) {
        const ig = ignore().add(snippets);
        const appAllowed = allowAll || ig.ignores(aclSnippet);
        return appAllowed;
      }
      return true;
    },
  };
};
