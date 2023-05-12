## Functions

<dl>
<dt>
    <a href="#createTask">createTask(params, callback)</a></dt>
<dt>
    <a href="#getTask">getTask(task_gid, params, callback)</a></dt>
<dt>
    <a href="#getTasks">getTasks(project_gid, params, callback)</a></dt>
<dt>
    <a href="#updateTask">updateTask(task_gid, params, callback)</a></dt>
<dt>
    <a href="#upsertTask">upsertTask(project_gid, params, callback)</a></dt>
</dl>

## createTask

createTask(params, callback) ⇒ <code>Operation</code>
Create a task.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
createTask(
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

## getTask

getTask(task_gid, params, callback) ⇒ <code>Operation</code>
Get a single task of a given project.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task_gid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTask("task_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

## getTasks

getTasks(project_gid, params, callback) ⇒ <code>Operation</code>
Get the list of tasks for a given project.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| project_gid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | Query params to include. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
getTasks("project_gid",
 {
   opt_fields: "name,notes,assignee"
 })
```

* * *

## updateTask

updateTask(task_gid, params, callback) ⇒ <code>Operation</code>
Update a specific task.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| task_gid | <code>string</code> | Globally unique identifier for the task |
| params | <code>object</code> | Body parameters |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
updateTask("task_gid",
 {
   name: 'test', "approval_status": "pending", "assignee": "12345"
 }
)
```

* * *

## upsertTask

upsertTask(project_gid, params, callback) ⇒ <code>Operation</code>
Update or create a task.

**Kind**: global function  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| project_gid | <code>string</code> | Globally unique identifier for the project |
| params | <code>object</code> | an object with an externalId and some task data. |
| callback | <code>function</code> | (Optional) callback function |

**Example**  
```js
upsertTask(
 "1201382240880",
 {
   "externalId": "name",
   "data": {
     name: 'test', "approval_status": "pending", "assignee": "12345"
   }

 }
)
```

* * *
