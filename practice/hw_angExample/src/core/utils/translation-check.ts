let deep: deepDiff.IDeepDiff = require('deep-diff');

/*
   This function compare en-us translation JSON object with other specified translation
   It use deepDiff library that return diff object like

 [
  {
    kind: 'N',
    path: [
      'name'
    ],
    rhs: 'updated object'
  },
  {
    kind: 'D',
    path: [
      'details',
      'with'
    ],
    lhs: 'elements',
  }
]

   'N' indicates new object keys that does not exist in en-us but appear in other language file (new)
   'D' indicates new object keys that exists in en-us but not in other language file (deleted)

   we check only 'N' case and throw error in expect object as item.path should not empty

   !!!This function should be used in any sub-app to check compatibility of translation files
   see in shell: src/js/home/profile/preferences/translations.spec.ts
 */
export function compareTranslations(translateEnUs, translateOther, expect: Chai.ExpectStatic) {
  let differences: deepDiff.IDiff[] = deep.diff(translateEnUs, translateOther);
  _.each(differences, (item) => {
    if (item.kind === 'N') {
      expect(item.path.join('.')).to.be.empty;
    }
  });
}
