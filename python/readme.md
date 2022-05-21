# Unix Socket Message Format:

format:

`message_metadata_json` + `message_separator` + `message_data_json`

- **`message_separator`**: this string should be invalid json as it separates the two json components of the message. Defualt is |"|

When the python code RECIVES a message from the unix datachannel:

example message:

`{ SrcPeerId: "rov_pilot_23B1" }|"|{ action: "ping", val:1234 }`

- **`message_metadata_json`**: This is the metadata that gets passed to / from _ONLY_ the golang datachannel message relay. The browser side javascript will only recive the `message_data_json` with metadata & separator stripped, hovever the python code on the other end can and does use it and should include it in messages passed back to the go code.

```JSON
{
    "SrcPeerId": "The peer id of the browser client that sent this message (String)",
    "PeerEvent": " Whenever a peer connects or disconnects this will be 'connect' or 'disconnect' with the connected or disconnected peer set in SrcPeerId (String)",
    "Err": "The error message if there was an error with the previous go metadat action command recived on the unix socket"
}
```

- **`message_data_json`**: This string is passed straight through from the client / browser.

When the python code RECIVES a message from the unix datachannel it will contain:

```JSON
{
    "SrcPeerId": "The peer id of the browser client that sent this message (String)",
    "TargetPeerIds": ["the list of peerjs peers (by peer id) this mesage should be sent to. An empty list means broadcast mesage to all connected peers. (Array of Strings)"],
    "Action": "An action to be performed by this go code. Nothing Currently uses this",
    "Params": "When Action is  'Change_Video_Cmd': this is the video command split on arguments."
}
```

- **`message_data_json`**: This string is passed straight through from the client / browser.

### python code RECIVES a message:

message_data_json:

```JSON
{
    "cid": "The continuity id, the python code should include the same cid in any reply messages so they can be linked to the original request message by the browser (string)",
    "action": "The command / action to run (string)",
    "val": "The value associated with the action (type depends on action)
}
```

Available actions:

- ping:
  - val: unix epoch timestamp (int)
  - value will be echoed back w status "pong"
- password:
  - val: The pilot conroll password attempt (string)
  - if correct, the sending peer's id will be added to the list of authenticated peers with a status, if wrong sat

### python code SENDS a reply message (will be RECIVED by browser clients):

message_data_json:

```JSON
{
    "cid": "The same continuity id from the recived message that triggered this reply (string)",
    "status": "A short string representing the result of the action (string)",
    "val": "The value associated with the action result (type depends on action)
}
```
