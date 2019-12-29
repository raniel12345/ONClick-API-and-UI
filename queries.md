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
