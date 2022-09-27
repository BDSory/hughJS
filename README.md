{complete} 1. deploy web interface that accepts: userEmail, fName, lName, DOB & UID {programmer assign, not known to user}. 
2. persist user info to db
3. create batch job to run 5 min after every hour that grabs all user info
4. send (post) to a different web interface.
  *nice-to-have: either just send NEW user info since last post OR color code new to distinguish from old.
*5. extra: create 3 docker containers, 1 for each service.
*6. Kubernetes deployment descriptors and deploy the containers to Kubernetes.

