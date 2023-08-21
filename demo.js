const importSnapshot = {
  PROVIDER: {
    importRoles: {
      "role a": {
        uid: "role_A_uid_a",
        profileNames: [
          {
            name: "profile a",
            uid: "role_A_uid_a_profile_a"
          },
          {
            name: "profile b",  
            uid: "role_A_uid_a_profile_b"
          }
        ],
        more: {}
      },
      "role b": {
        uid: "role_A_uid_b",
        profileNames: [
          {
            name: "profile a",
            uid: "role_A_uid_b_profile_a"
          },
          {
            name: "profile b",
            uid: "role_A_uid_b_profile_b"
          }
        ],
        more: {}
      }
    },
    importProfiles: {
      "profile a": {
        uid: "A_uid_a_profile_a",
        more: {}
      },
      "profile b": {
        uid: "A_uid_a_profile_b",
        more: {}
      }
    }
  },
  CONSUMER: {
    importRoles: {
      "role a": {
        uid: "role_B_uid_a",
        profileNames: [
          {
            name: "profile a",
            uid: "role_B_uid_a_profile_a"
          },
          {
            name: "profile b",
            uid: "role_B_uid_a_profile_b"
          }
        ],
        more: {}
      },
      "role b": {
        uid: "role_B_uid_b",
        profileNames: [
          {
            name: "profile a",
            uid: "role_B_uid_b_profile_a"
          },
          {
            name: "profile b",
            uid: "role_B_uid_b_profile_b"

          }
        ],
        more: {}
      }
    },
    importProfiles: {
      "profile a": {
        uid: "B_uid_b_profile_a",
        more: {}
      },
      "profile b": {
        uid: "B_uid_b_profile_b",
        more: {}
      }
    }
  }
}

const ideal = {
  roleSnapshot: {
    'role_A_uid_a': {
      // Role a
    },
    'role_A_uid_a_profile_a': {
      // Role a Profile a
    },
    'role_A_uid_a_profile_b': {
      // Role a Profile b
    },
    'role_A_uid_b': {
      // Role b
    },
    'role_A_uid_b_profile_a': {
      // Role b Profile a
    },
    'role_A_uid_b_profile_b': {
      // Role b Profile b
    },
    'role_B_uid_a': {
      // Role a
    },
    'role_B_uid_a_profile_a': {
      // Role a Profile a
    }
  },
  profileSnapshot: {
    'A_uid_a_profile_a': {
      // Profile a
    },
    'A_uid_a_profile_b': {
      // Profile b
    },
    'B_uid_b_profile_a': {
      // Profile a
    }
  }
}

const portalKeys = Object.keys(importSnapshot);

const rolesSnapshot = portalKeys.reduce((portalAcc, portalKey) => {
  const roles = importSnapshot[portalKey]?.importRoles;
  const roleKeys = Object.keys(roles);

  const roleSnapshot = roleKeys.reduce((roleAcc, roleKey) => {
    const role = roles[roleKey];

    
    const profileNames = role.profileNames;

    const profileKeys = profileNames.map(profile => profile.uid);
    
      const profileSnapshot = profileKeys.reduce((profileAcc, profileKey) => {
        const profile = role.profileNames.find(profile => profile.uid === profileKey);
        return {
          ...profileAcc,
          [profileKey]: profile
        }
      }, {});
    

    return {
      ...roleAcc,
      ...profileSnapshot,
      [role.uid]: role
    }
  }, {});
  
  return {
    ...portalAcc,
    ...roleSnapshot
  }
}, {});

console.log(rolesSnapshot);



// console.log(largeKeys);