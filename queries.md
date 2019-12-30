# User

### Get all users

```
query{
  users{
    username
    email
    role
    groups{
      title
      description
    }
    projects{
      title
      description
    }
    projectStatuses{
      status
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "users": [
      {
        "username": "raniel101",
        "email": "raniel101@onsemi.com",
        "role": "ADMIN",
        "groups": [
          {
            "title": "C# Developer",
            "description": "C# developers"
          }
        ],
        "projects": [],
        "projectStatuses": [
          {
            "status": "NEW"
          }
        ],
        "createdAt": "2019-12-29T14:13:42.546Z",
        "updatedAt": "2019-12-29T14:18:40.514Z"
      },
      {
        "username": "raniel303",
        "email": "raniel303@onsemi.com",
        "role": "ADMIN",
        "groups": [],
        "projects": [
          {
            "title": "Project 1",
            "description": "Project 1"
          }
        ],
        "projectStatuses": [],
        "createdAt": "2019-12-29T14:47:27.675Z",
        "updatedAt": "2019-12-29T14:47:27.675Z"
      }
    ]
  }
}
```

### Get user by id

```
query{
  user(id:1){
    username
    email
    role
    groups{
      title
      description
    }
    projects{
      title
      description
    }
    projectStatuses{
      status
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "user": {
      "username": "raniel101",
      "email": "raniel101@onsemi.com",
      "role": "ADMIN",
      "groups": [
        {
          "title": "C# Developer",
          "description": "C# developers"
        }
      ],
      "projects": [],
      "projectStatuses": [
        {
          "status": "NEW"
        }
      ],
      "createdAt": "2019-12-29T14:13:42.546Z",
      "updatedAt": "2019-12-29T14:18:40.514Z"
    }
  }
}

```

### Get current user's informations

```
query{
  me{
    username
    email
    role
    groups{
      title
      description
    }
    projects{
      title
      description
    }
    projectStatuses{
      status
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "me": {
      "username": "raniel303",
      "email": "raniel303@onsemi.com",
      "role": "ADMIN",
      "groups": [],
      "projects": [
        {
          "title": "Project 1",
          "description": "Project 1"
        }
      ],
      "projectStatuses": [],
      "createdAt": "2019-12-29T14:47:27.675Z",
      "updatedAt": "2019-12-29T14:47:27.675Z"
    }
  }
}
```

# Project

### Get all projects

```
query{
  projects{
    id
    title
    subProject
    description
    homePage
    tags
    isPublic
    owner{
      username
    }
    modules
    status{
      status
    }
    members{
      memberUsers{
        user{
          username
        }
      }
      memberGroups{
        group{
          title
        }
      }
    }
    issues{
      title
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projects": [
      {
        "id": "3",
        "title": "Project 1",
        "subProject": "None",
        "description": "Project 1",
        "homePage": "test",
        "tags": [
          "project 1"
        ],
        "isPublic": true,
        "owner": {
          "username": "raniel303"
        },
        "modules": [
          "GANTT"
        ],
        "status": {
          "status": "NEW"
        },
        "members": null,
        "issues": null,
        "createdAt": "2019-12-29T14:48:08.081Z",
        "updatedAt": "2019-12-29T14:51:00.562Z"
      }
    ]
  }
}
```

### Get project details

```
query{
  project(id: 3){
    id
    title
    subProject
    description
    homePage
    tags
    isPublic
    owner{
      username
    }
    modules
    status{
      status
    }
    members{
      memberUsers{
        user{
          username
        }
      }
      memberGroups{
        group{
          title
        }
      }
    }
    issues{
      title
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "project": {
      "id": "3",
      "title": "Project 1",
      "subProject": "None",
      "description": "Project 1",
      "homePage": "test",
      "tags": [
        "project 1"
      ],
      "isPublic": true,
      "owner": {
        "username": "raniel303"
      },
      "modules": [
        "GANTT"
      ],
      "status": {
        "status": "NEW"
      },
      "members": null,
      "issues": null,
      "createdAt": "2019-12-29T14:48:08.081Z",
      "updatedAt": "2019-12-29T14:51:00.562Z"
    }
  }
}
```

# Project Statuses

```
query{
  projectStatuses{
    id
    status
    description
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projectStatuses": [
      {
        "id": "2",
        "status": "NEW",
        "description": "TEST",
        "createdAt": "2019-12-30T13:48:38.853Z",
        "updatedAt": "2019-12-30T13:48:38.853Z"
      },
      {
        "id": "3",
        "status": "ON-GOING-REVIEW",
        "description": "TEST",
        "createdAt": "2019-12-30T13:48:56.887Z",
        "updatedAt": "2019-12-30T13:48:56.887Z"
      }
    ]
  }
}
```

# Group

### Get all groups

```
query{
  groups{
    id
    title
    description
    members{
      username
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "groups": [
      {
        "id": "1",
        "title": "C# Developer",
        "description": "C# developers",
        "members": [
          {
            "username": "raniel101"
          }
        ],
        "createdAt": "2019-12-29T15:00:05.834Z",
        "updatedAt": "2019-12-29T15:04:14.479Z"
      }
    ]
  }
}
```

### Get group by id

```
query{
  group(id:1){
    title
    description
    members{
      username
    }
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "group": {
      "title": "C# Developer",
      "description": "C# developers",
      "members": [
        {
          "username": "raniel101"
        }
      ],
      "createdAt": "2019-12-29T15:00:05.834Z",
      "updatedAt": "2019-12-29T15:04:14.479Z"
    }
  }
}
```

# Project Member

### Get all Project members by project id

```
query{
  projectMembers(projectId: 3){
    memberUsers{
      role
      user{
        username
        email
        role
      }
    }
    memberGroups{
      group{
        title
      }
      role
    }
  }
}

return:

{
  "data": {
    "projectMembers": {
      "memberUsers": [
        {
          "role": "Developer",
          "user": {
            "username": "raniel101",
            "email": "raniel101@onsemi.com",
            "role": "ADMIN"
          }
        }
      ],
      "memberGroups": [
        {
          "group": {
            "title": "C# Developer"
          },
          "role": "Developer"
        }
      ]
    }
  }
}
```

### Get project members: only users

```
query{
  projectUsersMembers (projectId: 3){
    role
      user{
        username
        email
        role
      }
  }
}

return:

{
  "data": {
    "projectUsersMembers": [
      {
        "role": "Developer",
        "user": {
          "username": "raniel101",
          "email": "raniel101@onsemi.com",
          "role": "ADMIN"
        }
      }
    ]
  }
}
```

### Get Project Members: only groups

```
query{
  projectGroupsMembers (projectId: 3){
    group{
      title
    }
    role
  }
}

return:

{
  "data": {
    "projectGroupsMembers": [
      {
        "group": {
          "title": "C# Developer"
        },
        "role": "Developer"
      }
    ]
  }
}
```

# Project Features

### Get all features

```
query{
  projectFeatures(projectId: 3){
    id
    title
    description
    priority
    status
    percentCompletion
    startDate
    dueDate
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projectFeatures": [
      {
        "id": "1",
        "title": "Updated Login page using LDAP (Active directory)",
        "description": "Updated Login page using LDAP (Active directory)",
        "priority": 1,
        "status": "New",
        "percentCompletion": 0,
        "startDate": "2020-01-10",
        "dueDate": "2020-01-12",
        "createdAt": "2019-12-29T15:17:46.410Z",
        "updatedAt": "2019-12-29T15:19:36.273Z"
      }
    ]
  }
}
```

### Get feature by id

```
query{
  projectFeature(projectId:3, featureId: 1){
    id
    title
    description
    priority
    status
    percentCompletion
    startDate
    dueDate
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projectFeature": {
      "id": "1",
      "title": "Updated Login page using LDAP (Active directory)",
      "description": "Updated Login page using LDAP (Active directory)",
      "priority": 1,
      "status": "New",
      "percentCompletion": 0,
      "startDate": "2020-01-10",
      "dueDate": "2020-01-12",
      "createdAt": "2019-12-29T15:17:46.410Z",
      "updatedAt": "2019-12-29T15:19:36.273Z"
    }
  }
}
```

# Project Issues

### Get all project issues by project id

```
query{
  projectIssues(projectId:3){
    id
    title
    description
    priority
    issueType
    status
    percentCompletion
    estimatedTime
    spentTime
    startDate
    dueDate
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projectIssues": [
      {
        "id": "2",
        "title": "Unable to login",
        "description": "unable to login using my AD account",
        "priority": 1,
        "issueType": "Error",
        "status": "New",
        "percentCompletion": 0,
        "estimatedTime": 3,
        "spentTime": 0,
        "startDate": "2020-01-02",
        "dueDate": "2020-01-02",
        "createdAt": "2019-12-30T14:30:49.973Z",
        "updatedAt": "2019-12-30T14:30:49.973Z"
      }
    ]
  }
}
```

### Get issue details by project id and issue id

```
query{
  projectIssue(projectId:3, issueId:2){
    id
    title
    description
    priority
    issueType
    status
    percentCompletion
    estimatedTime
    spentTime
    startDate
    dueDate
    createdAt
    updatedAt
  }
}

return:

{
  "data": {
    "projectIssue": {
      "id": "2",
      "title": "Unable to login",
      "description": "unable to login using my AD account",
      "priority": 1,
      "issueType": "Error",
      "status": "New",
      "percentCompletion": 0,
      "estimatedTime": 3,
      "spentTime": 0,
      "startDate": "2020-01-02",
      "dueDate": "2020-01-02",
      "createdAt": "2019-12-30T14:30:49.973Z",
      "updatedAt": "2019-12-30T14:30:49.973Z"
    }
  }
}
```
