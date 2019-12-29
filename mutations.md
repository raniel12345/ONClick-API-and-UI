### For-Improvement list:

- Improve return object with success and message

# User

### Signup

```
mutation{
    signUp (username:"raniel101", email: "raniel101@onsemi.com", password:"Testing", role: ADMIN){
        success
        message
        token
    }
}

return:

{
    "data": {
        "signUp": {
            "success": true,
            "message": "Signup Successfully",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYW5pZWwxMDFAb25zZW1pLmNvbSIsInVzZXJuYW1lIjoicmFuaWVsMTAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTc3NjAyMjY2LCJleHAiOjE1Nzc2MDQwNjZ9.yc9Vux0q9nVTmQJOFPYRF3IfKq4ggJ9AFJws4RmapDU"
        }
    }
}
```

### Signin

```
mutation{
    signIn (login: "raniel101@onsemi.com", password:"Testing")
    {
        token
    }
}


return:

{
    "data": {
        "signIn": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYW5pZWwxMDFAb25zZW1pLmNvbSIsInVzZXJuYW1lIjoicmFuaWVsMTAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTc3NjIyNTc1LCJleHAiOjE1Nzc2MjQzNzV9.ur9BlHdMQjsVu8r6FbxKKvhnuLySx8_INg-4PWP18Sk"
        }
    }
}
```

### Update user password

```
mutation{
  updateUserPassword(id: 1, currentPwd: "Testing", newPwd:"Password"){
    success
    message
    token
  }
}

return:

{
  "data": {
    "updateUserPassword": {
      "success": true,
      "message": "Password Updated",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYW5pZWwxMDFAb25zZW1pLmNvbSIsInVzZXJuYW1lIjoicmFuaWVsMTAxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNTc3NjI4ODg0LCJleHAiOjE1Nzc2MzA2ODR9.50P_XoLtxVef2L3S7GntYU8rhrpV3q8SZ8clXYgb2S0"
    }
  }
}

```

### Update user role

```
mutation{
  updateUserRole(id:1, role:ADMIN){
    success
    message
    token
  }
}

return:

{
  "data": {
    "updateUserRole": {
      "success": true,
      "message": "Role Updated",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJyYW5pZWwxMDFAb25zZW1pLmNvbSIsInVzZXJuYW1lIjoicmFuaWVsMTAxIiwiaWF0IjoxNTc3NjI5MTIwLCJleHAiOjE1Nzc2MzA5MjB9.p5dTvM7jQrxKi8zAVzKJJpoFrvuaHBVcdrGAvyZvs20"
    }
  }
}
```

### Delete user

```
mutation{
  deleteUser(id: 2)
}

return:

{
  "data": {
    "deleteUser": true
  }
}
```

# Project Status

### Create Project Status

```
mutation{
    createProjectStatus(status: "NEW", description: "TEST"){
        success
        message
        projectStatus {
            status
            description
        }
    }
}

return:

{
    "data": {
        "createProjectStatus": {
            "success": true,
            "message": "Successfully created",
            "projectStatus": {
                "status": "NEW",
                "description": "TEST"
            }
        }
    }
}
```

# Project

### Create Project

```
mutation{
  createProject(input: {
      initialStatus: 1,
      title: "Project 1",
      subProject: "None", -------> will enhance it to accept project id
      description: "Project 1",
      homePage: "test"
      tags: ["project 1"],
      isPublic:true,
      modules: [FILES, GANTT]
  }){
    title,
    description
  }
}

return:


{
    "data": {
        "createProject": {
            "title": "Project ko",
            "description": "Project 1"
        }
    }
}

```

### Update Project

```
mutation{
  updateProject(input:{
    id: 2
    title:"Updated title"
    subProject:"Testing"
    description: "Update"
    homePage: "Testing Project"
    isPublic: false
  }){
    title,
    description
  }
}

return:

{
  "data": {
    "updateProject": {
      "title": "Updated title",
      "description": "Update"
    }
  }
}
```

### Add Project Module

```
mutation{
  addProjectModule(module:ISSUE_TRACKING, projectId:2)
}

return:

{
  "data": {
    "addProjectModule": [
      "FILES",
      "GANTT",
      "ISSUE_TRACKING"
    ]
  }
}
```

### Delete project module

```
mutation{
  deleteProjectModule(module:FILES, projectId: 3)
}

return remaining modules:

{
  "data": {
    "deleteProjectModule": [
      "GANTT"
    ]
  }
}
```

### Add project tag

```
mutation{
  addProjectTag(tag:"TEST", projectId: 3)
}

return:

{
  "data": {
    "addProjectTag": [
      "project 1",
      "TEST"
    ]
  }
}

```

### Delete project tag

```
mutation{
  deleteProjectTag(tag:"TEST", projectId: 3)
}

return remaining tag:

{
  "data": {
    "deleteProjectTag": [
      "project 1"
    ]
  }
}

```

### Delete Project

```
mutation{
  deleteProject(id: 2, userId: 1){
    success
    message
    project{
      title
      description
    }
  }
}

return:

{
  "data": {
    "deleteProject": {
      "success": true,
      "message": "Deleted successfully!",
      "project": {
        "title": "Updated title",
        "description": "Update"
      }
    }
  }
}

```

# Groups

### Create User group

```
mutation{
  createGroup(input: {
    title: "Java Developers",
    description: "Developers, programmer"
  }){
    title
    description
    id
    createdAt
    updatedAt
    deletedAt
  }
}

return:

{
    "data": {
        "createGroup": {
            "title": "Java Developers",
            "description": "Developers, programmer",
            "id": "1",
            "createdAt": "2019-12-29T12:29:45.458Z",
            "updatedAt": "2019-12-29T12:29:45.458Z",
            "deletedAt": null
        }
    }
}
```

### Update Group

```
mutation{
  updateGroup(input:{
    id: 1
    title: "C# Developer"
    description: "C# developers"
  }){
    title
    description
    members{
      username
    }
  }
}

return:

{
  "data": {
    "updateGroup": {
      "title": "C# Developer",
      "description": "C# developers",
      "members": [
        {
          "username": "raniel101"
        }
      ]
    }
  }
}
```

### Add user to group

```
mutation{
  addUserToGroup(userId: 1, groupId: 1){
    title
    description
    members{
      username
    }
  }
}

return:

{
  "data": {
    "addUserToGroup": {
      "title": "Java Developers",
      "description": "Developers, programmer",
      "members": [
        {
          "username": "raniel101"
        }
      ]
    }
  }
}
```

# Project Members

### Add Project Member - User

```
mutation{
  addProjectMember(input:{
    projectId: 3,
    role:Developer
    memberId: 1
    memberType: User
  }){
    memberUsers{
      user{
        username
      }
    }
    memberGroups{
      group{
        title
        description
      }
    }
  }
}

return:

{
  "data": {
    "addProjectMember": {
      "memberUsers": [
        {
          "user": {
            "username": "raniel101"
          }
        }
      ],
      "memberGroups": []
    }
  }
}
```

### Add Project Member - Group

```
mutation{
  addProjectMember(input:{
    projectId: 3,
    role:Developer
    memberId: 1
    memberType: Group
  }){
    memberUsers{
      user{
        username
      }
    }
    memberGroups{
      group{
        title
        description
      }
    }
  }
}

return:

{
  "data": {
    "addProjectMember": {
      "memberUsers": [
        {
          "user": {
            "username": "raniel101"
          }
        }
      ],
      "memberGroups": [
        {
          "group": {
            "title": "C# Developer",
            "description": "C# developers"
          }
        }
      ]
    }
  }
}
```

# Project Features

### Add Project Feature

```
mutation{
  addProjectFeature(input:{
    projectId: 3,
    title: "Login page using LDAP (Active directory)",
    description:"Login page using LDAP (Active directory)",
    priority:1,
    status:New,
	percentCompletion: 0
    startDate: "2020-01-10",
    dueDate:"2020-01-11"
  }){
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
    deletedAt
  }
}

return:

{
  "data": {
    "addProjectFeature": {
      "id": "1",
      "title": "Login page using LDAP (Active directory)",
      "description": "Login page using LDAP (Active directory)",
      "priority": 1,
      "status": "New",
      "percentCompletion": 0,
      "startDate": "2020-01-10",
      "dueDate": "2020-01-11",
      "createdAt": "2019-12-29T15:17:46.410Z",
      "updatedAt": "2019-12-29T15:17:46.410Z",
      "deletedAt": null
    }
  }
}
```

### Update Project Feature

```
mutation{
  updateProjectFeature(input:{
    projectId: 3,
    title: "Updated Login page using LDAP (Active directory)",
    description:"Updated Login page using LDAP (Active directory)",
    priority:1,
    status:New,
	percentCompletion: 0
    startDate: "2020-01-10",
    dueDate:"2020-01-12"
  }, featureId: 1){
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
    deletedAt
  }
}

return:

{
  "data": {
    "updateProjectFeature": {
      "id": "1",
      "title": "Updated Login page using LDAP (Active directory)",
      "description": "Updated Login page using LDAP (Active directory)",
      "priority": 1,
      "status": "New",
      "percentCompletion": 0,
      "startDate": "2020-01-10",
      "dueDate": "2020-01-12",
      "createdAt": "2019-12-29T15:17:46.410Z",
      "updatedAt": "2019-12-29T15:19:36.273Z",
      "deletedAt": null
    }
  }
}
```

# Project Issues

### Add project issues

```
mutation{
  addProjectIssue(input: {
    projectId:3
    title:"Unable to login"
    description: "unable to login using my AD account"
    priority: 1
    issueType:Error
    status: New
    percentCompletion: 0
    estimatedTime: 3
    spentTime: 0
    startDate: "2020-01-02"
    dueDate: "2020-01-02"
  }){
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
    deletedAt
  }
}

return:

{
  "data": {
    "addProjectIssue": {
      "id": "1",
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
      "createdAt": "2019-12-29T15:25:17.198Z",
      "updatedAt": "2019-12-29T15:25:17.198Z",
      "deletedAt": null
    }
  }
}
```

### Update Project issue

```
mutation{
  updateProjectIssue(issueId: 1, input: {
    projectId:3
    title:"Unable to login Updated"
    description: "unable to login using my AD account Updated"
    priority: 1
    issueType:Error
    status:Closed
    percentCompletion: 100
    estimatedTime: 3
    spentTime: 1
    startDate: "2020-01-02"
    dueDate: "2020-01-02"
  }){
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
    deletedAt
  }
}

return:

{
  "data": {
    "updateProjectIssue": {
      "id": "1",
      "title": "Unable to login Updated",
      "description": "unable to login using my AD account Updated",
      "priority": 1,
      "issueType": "Error",
      "status": "Closed",
      "percentCompletion": 100,
      "estimatedTime": 3,
      "spentTime": 1,
      "startDate": "2020-01-02",
      "dueDate": "2020-01-02",
      "createdAt": "2019-12-29T15:25:17.198Z",
      "updatedAt": "2019-12-29T15:27:49.453Z",
      "deletedAt": null
    }
  }
}
```

### Delete Project Issue

```
mutation{
  deleteProjectIssue(issueId: 1){
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
    deletedAt
  }
}

return:

{
  "data": {
    "deleteProjectIssue": {
      "id": "1",
      "title": "Unable to login Updated",
      "description": "unable to login using my AD account Updated",
      "priority": 1,
      "issueType": "Error",
      "status": "Closed",
      "percentCompletion": 100,
      "estimatedTime": 3,
      "spentTime": 1,
      "startDate": "2020-01-02",
      "dueDate": "2020-01-02",
      "createdAt": "2019-12-29T15:25:17.198Z",
      "updatedAt": "2019-12-29T15:27:49.453Z",
      "deletedAt": "2019-12-29T15:28:54.711Z"
    }
  }
}
```
