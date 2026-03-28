I chose option A because I wanted to understand how signals work under the hood.
The variable currentListener acts as a tracking slot, and when computed or effect run its function, they are added into that slot, the signal read duting the execution sees the slot is occupied and adds it to the set of subscribers.
Real frameworks use a similar patters, but they have batching and checking for the same value
