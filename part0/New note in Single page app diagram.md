```mermaid

sequenceDiagram
    participant browser
    participant server    

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa    
    activate server    
    Note right of browser: Payload: {"content":"new note","date":"2023-07-30T19:13:59.624Z"}
    server-->>browser: {"message":"note created"}
    deactivate server   


```
